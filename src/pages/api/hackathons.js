// pages/api/hackathons.js
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, startDate, endDate, userId } = req.body;

    try {
      const newHackathon = {
        title,
        description,
        startDate: Timestamp.fromDate(new Date(startDate)),
        endDate: Timestamp.fromDate(new Date(endDate)),
        createdBy: userId, // Store the user ID
        participants: [], // Empty participants array initially
      };

      // Add new hackathon to Firestore
      const docRef = await addDoc(collection(db, 'hackathons'), newHackathon);
      res.status(201).json({ success: true, id: docRef.id });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
