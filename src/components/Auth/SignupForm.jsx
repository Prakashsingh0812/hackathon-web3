"use client";

import React from "react";
import styles from "./Auth.module.css"; // Import CSS module

const SignupForm = () => {
  // Handle signup (you may need a function to manage actual signup logic later)
  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup logic here");
  };

  return (
    <div className={styles.box}>
      <span className={styles.borderLine}></span>
      <form onSubmit={handleSignup}> {/* Bind handleSignup to form submission */}
        <h2>Sign up</h2>
        <div className={styles.inputBox}>
          <input type="text" required />
          <span>Username</span>
          <i></i>
        </div>
        <div className={styles.inputBox}>
          <input type="email" required />
          <span>Email</span>
          <i></i>
        </div>
        <div className={styles.inputBox}>
          <input type="password" required />
          <span>Password</span>
          <i></i>
        </div>
        <div className={styles.links}>
          <a href="/login">Login</a>
        </div>
        <input type="submit" className={styles.submit} value="Sign Up" />
      </form>
    </div>
  );
};

export default SignupForm;
