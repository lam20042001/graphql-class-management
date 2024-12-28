import { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal';
import { gql, useMutation } from '@apollo/client';

const ADD_STUDENT = gql`
    mutation AddStudent($name: String!, $className: String!) {
        createStudent(name: $name, className: $className) {
            id
            name
        }
    }
`;
const AddStudentForm = () => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [addStudent] = useMutation(ADD_STUDENT);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addStudent({ variables: { name, className } });
      router.push('/student');
    } catch (error: any) {
      setIsModalOpen(true);
      setError(error.message);
      console.error('Failed to add student:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            className="w-96 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Class Name:
          <input
            className="w-96 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={error}></Modal>
    </div>
  );
};

export default AddStudentForm;