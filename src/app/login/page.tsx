"use client";

import { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button, Container, TextField, Typography } from "@mui/material";
import "@/app/globals.css";

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
        Login
      </Typography>
      {error && (
        <Typography color="error" className="tw-mb-4">
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        fullWidth
        className="tw-mb-5"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="small"
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        className="tw-mb-5"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size="small"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="tw-bg-green-700"
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
}
