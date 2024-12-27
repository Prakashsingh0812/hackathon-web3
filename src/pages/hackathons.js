import { db } from '../lib/firebase';
import { useRouter } from "next/router";
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Hackathons = () => {
    const router = useRouter();
    const [hackathons, setHackathons] = useState([]);
    const [registeredHackathons, setRegisteredHackathons] = useState([]);
    const [userId, setUserId] = useState('exampleUserId'); // Example userId, replace with actual user ID

    const fetchHackathons = async () => {
        const q = collection(db, 'hackathons');
        const querySnapshot = await getDocs(q);
        const hackathonList = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                description: data.description,
                startDate: data.startDate, // Firebase Timestamp
                endDate: data.endDate,     // Firebase Timestamp
            };
        });
        setHackathons(hackathonList);
    };

    const fetchRegistrations = async () => {
        const q = query(collection(db, 'registrations'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const registeredHackathonIds = querySnapshot.docs.map(doc => doc.data().hackathonId);
        setRegisteredHackathons(registeredHackathonIds);
    };

    useEffect(() => {
        fetchHackathons();
        fetchRegistrations();
    }, []);

    const handleLearnMore = (hackathonId) => {
        router.push(`/hackathons/${hackathonId}`); // Redirect to detailed page
    };

    const handleRegister = async (hackathonId) => {
        try {
            await addDoc(collection(db, 'registrations'), {
                userId: userId, // Replace with actual user ID
                hackathonId: hackathonId,
                registrationDate: new Date(),
            });
            setRegisteredHackathons([...registeredHackathons, hackathonId]);
            alert('Successfully registered for the hackathon!');
        } catch (error) {
            console.error('Error registering for hackathon: ', error);
            alert('Failed to register for the hackathon. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-red-900 to-indigo-800 py-12 px-6">
            <Navbar/>
            <h1 className="text-4xl font-bold text-white mb-8 text-center mt-6">Upcoming Hackathons</h1>
            {hackathons.map((hackathon) => (
                <div key={hackathon.id} className="flex bg-white p-6 rounded-lg shadow-lg mb-8 max-w-3xl mx-auto">
                    <div className="flex-none">
                        <img
                            src="https://tse1.mm.bing.net/th?id=OIP.SiVeFrZjOhdaQmcd5NI-CQHaEK&pid=Api&rs=1&c=1&qlt=95&w=181&h=101" // Add a relevant image URL for hackathons
                            alt="Hackathon"
                            className="w-40 h-40 rounded-lg object-cover"
                        />
                    </div>
                    <div className="ml-6 flex flex-col justify-between">
                        <h2 className="text-2xl font-semibold text-gray-800">{hackathon.title}</h2>
                        <p className="mt-4 text-gray-600">{hackathon.description}</p>
                        <p className="mt-4 text-sm text-gray-500">
                            Start: {hackathon.startDate?.toDate()?.toString() || 'Invalid start date'}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            End: {hackathon.endDate?.toDate()?.toString() || 'Invalid end date'}
                        </p>
                        <div className="mt-4 flex space-x-4 align:center">
                            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={() => handleLearnMore(hackathon.id)}
                            >
                                Learn More
                            </button>
                            <button
                                className={`py-2 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 ${registeredHackathons.includes(hackathon.id) ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                onClick={() => !registeredHackathons.includes(hackathon.id) && handleRegister(hackathon.id)}
                                disabled={registeredHackathons.includes(hackathon.id)}
                            >
                                {registeredHackathons.includes(hackathon.id) ? 'Registered' : 'Register'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <Footer/>
        </div>
    );
};

export default Hackathons;
