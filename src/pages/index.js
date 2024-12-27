import { useSession, signOut } from "next-auth/react";  // Import signOut from next-auth/react
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Homepage from "./Homepage";
import Navbar from "./Navbar";

export default function Home() {
  const { data: session, status } = useSession();  // Fetch session and status from NextAuth
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Checking session...');
    console.log('Session status:', status);
    console.log('Session data:', session);

    if (status === "loading") return;  // Wait until session status is resolved

    if (session) {
      console.log("User is authenticated:", session.user); // User is authenticated
      if (router.pathname === "/login" || router.pathname === "/signup") {
        router.push("/");  // Redirect to home page if user is logged in
      }
    } else {
      console.log("User is not authenticated");  // User is not authenticated
      if (router.pathname !== "/login" && router.pathname !== "/signup") {
        router.push("/login");  // Redirect to login page if user is not logged in
      }
    }

    setLoading(false);  // Once the check is complete, update loading state
  }, [session, status, router]);

  // If still loading, show a loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle logout
  const handleLogout = () => {
    signOut({ callbackUrl: '/login' }); // Call signOut to log the user out and redirect to login
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1484758991/photo/hackathon-concept-the-meeting-at-the-white-office-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=mmdbXi7aH3wmRXnis41knz6NUYU_krv-Dgk9jslFrNA=')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
     <div className="absolute inset-0 bg-gray-900 bg-opacity-75"> 
      <Navbar /> 
     <div className="flex flex-col items-center justify-center min-h-screen"> 
      <Homepage /> 
      </div> 
      </div> 
      </div>
      
    );
}
