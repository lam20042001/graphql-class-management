import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import Class from '@/types/Class';
import Modal from '@/components/Modal';
import { gql, useMutation } from '@apollo/client';
import client from '@/lib/ApolloClient';

const GET_ALL_CLASSES = gql`
    query GetAllClasses {
        getAllClasses {
            id
        }
    }
`;
const UPDATE_CLASS = gql`
    mutation UpdateClass($input: UpdateClassInput!) {
        updateClass(input: $input) {
            id
            name
        }
    }
`;
const GET_CLASS_BY_ID = gql`
    query GetClassById($id: Int!) {
        getClassById(id: $id) {
            id
            name
            students {
                name
            }
        }
    }
`;

interface ClassDetailProps {
  classData: Class;
}

const ClassDetail = ({ classData }: ClassDetailProps) => {
  const [name, setName] = useState(classData.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [updateClass] = useMutation(UPDATE_CLASS);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateClass({ variables: { input: { id: classData.id, name } } });
    } catch (error: any) {
      setIsModalOpen(true);
      setError(error.response.data.devMessage);
      setName(classData.name);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Class Detail</h1>
      <p className="mb-2"><strong>ID:</strong> {classData.id}</p>
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update
        </button>
      </form>
      {classData.students && classData.students.length > 0 ? (
        <table className="table-auto border-black mt-4">
          <thead>
          <tr>
            <th className="border-black border-2">Student Name</th>
          </tr>
          </thead>
          <tbody>
          {classData.students.map((student) => (
            <tr key={student.id}>
              <td className="border-black border-2">{student.name}</td>
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-red-500">No students found in this class</p>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={error}></Modal>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_ALL_CLASSES,
  });

  const paths = data.getAllClasses.map((classData: Class) => ({
    params: { id: classData.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const { data } = await client.query({
    query: GET_CLASS_BY_ID,
    variables: { id: parseInt(id as string) },
  });
  return {
    props: {
      classData: data.getClassById,
    },
    revalidate: 10,
  };
};

export default ClassDetail;