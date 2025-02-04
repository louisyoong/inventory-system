"use client";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utils/emotionCache";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Link from "next/link";
import "@/app/globals.css";
import { useRouter } from "next/navigation";

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CacheProvider value={clientSideEmotionCache}>
          <CssBaseline />
          <AuthProvider>
            <Header />
            <Container className="p-4">{children}</Container>
          </AuthProvider>
        </CacheProvider>
      </body>
    </html>
  );
}

// Header component
function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return null; // Don't render the header until loading is complete

  const handleLogout = () => {
    router.push("/login"); // Redirect to the login page
  };

  return (
    <AppBar position="static" className="tw-bg-green-700">
      <Toolbar className="tw-flex tw-items-center tw-font-bold tw-justify-between tw-w-100">
        <Typography
          variant="h6"
          className="tw-flex-grow tw-text-left tw-text-gray-800"
        >
          Neighbourmart Inventory System
        </Typography>
        {user && (
          <div className="tw-flex tw-justify-end">
            <Link href="/inventory">
              <Button color="inherit">Inventory</Button>
            </Link>
            <Link href="/admin/users">
              <Button color="inherit">User Management</Button>
            </Link>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
