import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Class from '@/types/Class';
import AddClassButton from '@/components/AddClassButton';
import Link from 'next/link';
import Modal from '@/components/Modal';
import { gql, useMutation } from '@apollo/client';
import client from '@/lib/ApolloClient';

const GET_ALL_CLASSES = gql`
    query GetAllClasses {
        getAllClasses {
            id
            name
            students {
                id
                name
            }
        }
    }
`;
const DELETE_CLASS = gql`
    mutation DeleteClass($id: Int!) {
        deleteClass(id: $id) {
            name
        }
    }
`;

interface ListProps {
  data: Class[];
}

const List = ({ data }: ListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClasses, setFilteredClasses] = useState(data);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteClass] = useMutation(DELETE_CLASS);
  const handleDelete = async (id: number) => {
    try {
      await deleteClass({ variables: { id } });
      setFilteredClasses(filteredClasses.filter((classData) => classData.id !== id));
    } catch (error: any) {
      setIsModalOpen(true);
      setError(error?.message);
      console.error('Failed to delete class:', error);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredClasses(
      data.filter(
        (classData) =>
          classData.name.toLowerCase().includes(value),
      ),
    );
  };

  return (
    <div>
      <AddClassButton />
      <br></br>
      <input
        type="text"
        placeholder="Search by class name"
        value={searchTerm}
        onChange={handleSearch}
        className="my-4 border border-black rounded p-2 w-fit"
      />
      <table className="table-auto border-collapse border-4 border-black">
        <thead>
        <tr>
          <th className="border-black border-4">Class Name</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {filteredClasses.map((classData: Class) => (
          <tr key={classData.id}>
            <td className="border-black border-4">{classData.name}</td>
            <td className="border-black border-4"><Link href={`/class/detail/${classData.id}`}>
              <button>Detail</button>
            </Link></td>
            <td className="border-black border-4">
              <button onClick={() => handleDelete(classData.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={error} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: GET_ALL_CLASSES,
  });
  return {
    props: {
      data: data.getAllClasses,
    },
  };
};

export default List;