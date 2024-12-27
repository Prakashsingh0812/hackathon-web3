import { useSession, SessionProvider } from "next-auth/react";  // Import useSession and SessionProvider
import { useEffect } from "react";
import { useRouter } from "next/router";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { data: session, status } = useSession(); // Use NextAuth's useSession
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait until session is resolved

    if (session) {
      // User is authenticated
      console.log("User is authenticated:", session.user);
      
      // Redirect to home if they are on login or signup page
      if (router.pathname === "/login" || router.pathname === "/signup") {
        router.push("/");
      }
    } else {
      // User is not authenticated
      console.log("User is not authenticated");
      
      // Redirect to login if they are not on login or signup page
      if (router.pathname !== "/login" && router.pathname !== "/signup") {
        router.push("/login");
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>; // Show loading spinner until session is resolved
  }

  return <Component {...pageProps} />;
}

export default function App(props) {
  return (
    <SessionProvider session={props.pageProps.session}> {/* Wrap the app with SessionProvider */}
      <MyApp {...props} />
    </SessionProvider>
  );
}
