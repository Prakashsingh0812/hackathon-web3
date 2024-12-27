import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useState, useEffect } from 'react';

const HackathonDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [hackathon, setHackathon] = useState(null);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const docRef = doc(db, 'hackathons', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHackathon({ id: docSnap.id, ...docSnap.data() }); 
        } else {
          console.error('Hackathon not found'); 
        }
      } catch (error) {
        console.error('Error fetching hackathon:', error);
      }
    };

    if (id) {
      fetchHackathon();
    }
  }, [id]);

  if (!hackathon) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="container mx-auto px-4 py-8 bg-gray-100 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden" // Glassmorphism styles
    >
      <h1 className="text-3xl font-bold mb-4">{hackathon.title}</h1>
      <p className="text-lg mb-4 break-words">{hackathon.description}</p>
      <div className="flex space-x-4">
        <p className="text-gray-600">
          Start Date: {hackathon.startDate?.toDate()?.toString() || 'Invalid start date'}
        </p>
        <p className="text-gray-600">
          End Date: {hackathon.endDate?.toDate()?.toString() || 'Invalid end date'}
        </p>
      </div>
      <p className="mt-4 text-gray-500">
        Created By: {hackathon.createdBy || 'Unknown'}
      </p>
      {/* Add more details or features here */}
    </div>
  );
};

export default HackathonDetails;