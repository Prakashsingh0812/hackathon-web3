import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Link from "next/link";
import Footer from "./Footer";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);

  // Redirect to login if session is not available
  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    
    <div className="font-heebo bg-gray-200 min-h-screen">
        <Navbar/>
      
      <main className="text-center p-10">
        <h1 className="text-4xl font-black leading-tight">
        Hack the Future<br /> Build Something Amazing<span className="text-blue-600 text-5xl">.</span>
        </h1>
        <h2 className="text-gray-700 mt-10 text-lg px-20">
        The spark ignites here. Our hackathon is where ideas collide and dreams take flight. Join the challenge, push your limits, and create something extraordinary. The future starts now.
        </h2>
        <Link href="/hackathons">
        <button className="mt-8 bg-blue-600 text-white py-3 px-8 text-lg rounded-lg hover:bg-blue-700">
          get started
        </button>
        
        </Link>
        

        <div className="mt-32">
          <h1 className="text-3xl font-bold mb-10">Solve Real-World Challenges: Develop Innovative Solutions for Government Ministries</h1>

          <div className="flex space-x-6 justify-center">
            {/* Box 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-1/3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white via-blue-500 to-black mx-auto"></div>
              <h3 className="text-xl font-bold mt-4">Innovative Solutions</h3>
              <p className="text-gray-700 mt-2">
              Get innovative solutions to your problems in cost effective ways Opportunity to be a part of Nation Building Opportunity to brand your company.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-1/3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white via-red-500 to-blue-500 mx-auto"></div>
              <h3 className="text-xl font-bold mt-4">Recognition and visibility</h3>
              <p className="text-gray-700 mt-2">
              Nationally Recognition and visibility for your company across all premier institutions in India
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-1/3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white via-green-500 to-blue-500 mx-auto"></div>
              <h3 className="text-xl font-bold mt-4">Out-of-the-box solutions</h3>
              <p className="text-gray-700 mt-2">
              Talented youngsters from all over the country offer out-of-the-box solutions to your problems
              </p>
            </div>
          </div>

          <a
          href="#"
          className="block mt-16 bg-blue-600 text-white py-12 w-1/3 text-lg rounded-t-full mx-auto hover:bg-blue-700"
          onClick={() => setShowVideo(true)}
        >
          jump in
          <i className="material-icons ml-2">arrow_downward</i>
        </a>

        {showVideo && (
          <div className="flex mt-10">
            <div className="w-1/2">
              <ReactPlayer 
                url="https://youtu.be/bWoqeAmTark?si=5NjuGpw2XuvvREQg" 
                width="100%" 
                height="318px" 
              /> 
            </div>
            <div className="w-1/2">
              {/* Your side image here */}
              <img 
                src="https://i.pinimg.com/originals/58/e9/09/58e909a766f53f5b95617c852667d460.jpg" 
                alt="Side Image" 
                className="w-full h-80" 
              />
            </div>
          </div>
        )}
        </div>
      </main>
      <Footer/>

      
    </div>
  );
};

export default Dashboard;
