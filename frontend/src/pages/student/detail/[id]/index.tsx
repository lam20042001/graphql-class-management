import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import Student from '@/types/Student';
import Modal from '@/components/Modal';
import client from '@/lib/ApolloClient';
import { gql, useMutation } from '@apollo/client';

const GET_ALL_STUDENTS = gql`
    query GetAllStudents {
        getAllStudents {
            id
        }
    }
`;
const UPDATE_STUDENT = gql`
    mutation UpdateStudent($id: Int!, $name: String!, $className: String!) {
        updateStudent(id: $id, name: $name, className: $className) {
            id
            name
        }
    }
`;
const GET_STUDENT_BY_ID = gql`
    query GetStudentById($id: Int!) {
        getStudentById(id: $id) {
            id
            name
            class {
                name
            }
        }
    }
`;

interface StudentDetailProps {
  student: Student;
}

const StudentDetail = ({ student }: StudentDetailProps) => {
  const [name, setName] = useState(student.name);
  const [className, setClassName] = useState(student.class.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [updateStudent] = useMutation(UPDATE_STUDENT);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateStudent({ variables: { id: student.id, name, className } });
    } catch (error: any) {
      setIsModalOpen(true);
      setError(error.message);
      setName(student.name);
      setClassName(student.class.name);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Student Detail</h1>
      <p><strong>ID:</strong> {student.id}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Class Name:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update
        </button>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={error}></Modal>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_ALL_STUDENTS,
  });

  const paths = data.getAllStudents.map((student: Student) => ({
    params: { id: student.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const { data } = await client.query({
    query: GET_STUDENT_BY_ID,
    variables: { id: parseInt(id as string) },
  });

  return {
    props: {
      student: data.getStudentById,
    },
    revalidate: 10,
  };
};

export default StudentDetail;