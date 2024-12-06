

import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/store';
import { createApplication } from '@/redux/applicationReducer';

type CreateApplicationProps = {
  projectId?: string | null;
};

const CreateApplication: React.FC<CreateApplicationProps> = ({ projectId }) => {


  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    projectId: projectId || '',
    phone: '',
    address: '',
    age: '',
    skills: '',
    motivation: '',
    experience: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const applicationData = {
      ...formData,
      age: parseInt(formData.age, 10),
      skills: formData.skills.split(',').map((skill) => skill.trim()),
      projectId,
    };

    try {
      await dispatch(createApplication(applicationData)).unwrap();
      alert('Application submitted successfully!');
      setFormData({
        userName: '',
        userEmail: '',
        projectId: projectId || '',
        phone: '',
        address: '',
        age: '',
        skills: '',
        motivation: '',
        experience: '',
      });
    } catch (error) {
      alert(`Error submitting application: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md w-full">
      <h2 className="text-xl font-bold mb-4">Apply for Project</h2>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Motivation</label>
        <textarea
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Experience</label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Submit Application
      </button>
    </form>
  );
};

export default CreateApplication;
