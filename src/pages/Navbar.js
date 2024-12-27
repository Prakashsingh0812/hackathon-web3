// components/Navbar.js
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" }); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center"> <img className="w-8 h-8 text-white mr-3" src="https://tse4.mm.bing.net/th?id=OIG1.XQ0IG8uvkMDkRrX2KblO&pid=ImgGn" alt="Logo" /> <span className="text-xl font-semibold">Hackathon hub</span> </div>
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-white hover:text-blue-400">Home</Link>
        <Link href="/dashboard" className="text-white hover:text-blue-400">Dashboard</Link>
        <Link href="/hackathons" className="text-white hover:text-blue-400">Hackathons</Link>
        <Link href="/create-hackathon" className="text-white hover:text-blue-400">Create Hackathon</Link>

        {session ? (
          <div className="flex items-center space-x-2">
            <span className="text-white">Hello, {session.user.name}</span>
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-white hover:text-blue-400">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
