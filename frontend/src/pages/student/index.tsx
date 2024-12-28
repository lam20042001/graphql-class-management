import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Student from '@/types/Student';
import AddStudentButton from '@/components/AddStudentButton';
import Link from 'next/link';
import client from '@/lib/ApolloClient';
import { gql, useMutation } from '@apollo/client';

const GET_ALL_STUDENTS = gql`
    query GetAllStudents {
        getAllStudents {
            id
            name
            class {
                name
            }
        }
    }
`;
const DELETE_STUDENT = gql`
    mutation DeleteStudent($id: Int!) {
        deleteStudent(id: $id) {
            name
        }
    }`;

interface ListProps {
  data: Student[];
}

const List = ({ data }: ListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(data);
  const [deleteStudent] = useMutation(DELETE_STUDENT);
  const handleDelete = async (id: number) => {
    try {
      await deleteStudent({ variables: { id } });
      setFilteredStudents(filteredStudents.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredStudents(
      data.filter(
        (student) =>
          student.name.toLowerCase().includes(value) || student.class.name?.toLowerCase().includes(value),
      ),
    );
  };

  return (
    <div>
      <AddStudentButton />
      <br></br>
      <input
        type="text"
        placeholder="Search by student name or class name"
        value={searchTerm}
        onChange={handleSearch}
        className="my-4 border border-black rounded p-2 w-fit"
      />
      <table className="table-auto border-collapse border-4 border-black">
        <thead>
        <tr>
          <th className="border-black border-4">Student Name</th>
          <th className="border-black border-4">Class Name</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {filteredStudents.map((student) => (
          <tr key={student.id}>
            <td className="border-black border-4">{student.name}</td>
            <td className="border-black border-4">{student.class.name}</td>
            <td className="border-black border-4"><Link href={`/student/detail/${student.id}`}>
              <button>Detail</button>
            </Link></td>
            <td className="border-black border-4">
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: GET_ALL_STUDENTS,
  });
  return {
    props: {
      data: data.getAllStudents,
    },
  };
};

export default List;