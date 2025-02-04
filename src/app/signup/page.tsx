"use client";

import { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button, Container, TextField, Typography } from "@mui/material";
import "@/app/globals.css";

const db = getFirestore(); // Initialize Firestore

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    try {
      setError(""); // Clear previous errors
      setSuccess(""); // Clear success messages

      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role: "user", // Default role
      });

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 3000); // Redirect after 3 seconds
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <Container maxWidth="xs" className="tw-mt-10">
      <Typography variant="h4" className="tw-text-center tw-mb-4">
        Sign Up
      </Typography>
      {error && (
        <Typography color="error" className="tw-mb-4">
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="primary" className="tw-mb-4">
          {success}
        </Typography>
      )}
      <TextField
        label="Email"
        fullWidth
        className="mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        className="tw-mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignup}
      >
        Sign Up
      </Button>
    </Container>
  );
}
