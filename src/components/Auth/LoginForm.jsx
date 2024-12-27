"use client";

import React from "react";
import { signIn } from "next-auth/react"; // Import signIn from next-auth/react
import styles from './Auth.module.css' // Import CSS module

const LoginForm = () => {
  // Function to handle Google login
  const handleLogin = (e) => {
    e.preventDefault();
    signIn("google", { callbackUrl: "/dashboard" }); // Redirect to dashboard after successful login
  };

  return (
    <div className={styles.box}>
      <span className={styles.borderLine}></span>
      <form onSubmit={handleLogin}> {/* Bind handleLogin to form submission */}
        <h2>Sign in</h2>
        <div className={styles.inputBox}>
          <input type="text" required />
          <span>Username</span>
          <i></i>
        </div>
        <div className={styles.inputBox}>
          <input type="password" required />
          <span>Password</span>
          <i></i>
        </div>
        <div className={styles.links}>
          <a href="#">Forgot Password</a>
          <a href="/signup">Signup</a>
        </div>
        <input type="submit" className={styles.submit} value="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
