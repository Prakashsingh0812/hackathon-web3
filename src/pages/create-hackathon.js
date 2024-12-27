// pages/createHackathon.js
import { useState,useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const CreateHackathon = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [creationSuccess, setCreationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = 'USER_ID'; // Retrieve from Firebase Auth session

    const res = await fetch('/api/hackathons', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        startDate,
        endDate,
        userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (data.success) {
        setCreationSuccess(true);
      alert('Hackathon created successfully');
    } else {
      alert('Error creating hackathon');
    }
  };

  useEffect(() => {
    if (creationSuccess) {
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setCreationSuccess(false); // Reset success flag after reset
    }
  }, [creationSuccess]);

  return (
    <div className="container mx-auto px-4 py-4">
    
      <h1 className="text-3xl font-bold mb-8">Create Hackathon</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <Navbar/>
        <div className="col-span-full">
          <label htmlFor="title" className="block text-sm font-medium text-blue-600">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Hackathon Title"
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-full">
          <label htmlFor="description" className="block text-sm font-medium text-blue-600">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your Hackathon"
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-40"
          />
        </div>
        <div className="col-span-full md:grid md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="startDate" className="text-sm font-medium text-blue-600">
              Start Date
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="endDate" className="text-sm font-medium text-blue-600">
              End Date
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="col-span-full text-right">
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Create Hackathon
          </button>
        </div>
        <Footer/>
      </form>
    </div>
  );
};

export default CreateHackathon;
