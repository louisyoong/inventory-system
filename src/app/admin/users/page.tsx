"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import "@/app/globals.css";

type UserData = {
  id: string;
  email: string;
  role: string;
};

export default function UserManagementPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login"); // Redirect only after authentication check is complete
      } else {
        fetchUserData(user.uid);
      }
    }
  }, [user, loading, router]);

  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUserData({ id: userDoc.id, ...userDoc.data() } as UserData);
      } else {
        setError("User not found.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to load user data.");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h5" className="mb-4 text-gray-800 text-bold mt-5">
        User Profile
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {userData && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{userData.id}</TableCell>
                <TableCell>{userData.email}</TableCell>
                <TableCell>{userData.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
