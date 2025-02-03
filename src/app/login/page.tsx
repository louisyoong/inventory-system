"use client";

import { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button, Container, TextField, Typography, Link } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/inventory"); // Redirect to inventory after login
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs" className="mt-10">
      <Typography variant="h4" className="text-center mb-4">
        Login
      </Typography>
      {error && (
        <Typography color="error" className="mb-4">
          {error}
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
        className="mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
}
