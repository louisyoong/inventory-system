import { Typography, Button } from "@mui/material";
import Link from "next/link";
import "@/app/globals.css";

export default function Home() {
  return (
    <div className="text-center mt-10">
      <Typography variant="h4" className="mb-4">
        Welcome to Neighbourmart System
      </Typography>
      <Link href="/login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Link>
    </div>
  );
}
