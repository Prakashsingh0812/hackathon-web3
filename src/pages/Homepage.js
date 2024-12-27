import React from 'react';
import Link from "next/link";

const Home = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-cyan-400 leading-none pointer-events-none select-none">WELCOME</h1>
          <Link  href="/dashboard">
          <button className="mt-6 mx-auto w-44 h-14 border-2 border-cyan-400 rounded-md bg-transparent text-lg font-semibold tracking-wider text-black uppercase transition duration-400 hover:bg-cyan-400 hover:text-gray-800">
            Enter
          </button>
          
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
