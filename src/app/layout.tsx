"use client";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utils/emotionCache";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

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
            <AppBar position="static" className="bg-yellow-500">
              <Toolbar className="flex items-center font-bold justify-between w-100">
                {/* Title aligned to the left */}
                <Typography
                  variant="h6"
                  className="flex-grow text-left text-gray-800"
                >
                  Neighbourmart Inventory System
                </Typography>

                {/* Menu aligned to the right */}
                <div className="flex justify-end p-2">
                  <AuthMenu />
                </div>
              </Toolbar>
            </AppBar>
            <Container className="p-4">{children}</Container>
          </AuthProvider>
        </CacheProvider>
      </body>
    </html>
  );
}

// Component to show menu only after login
function AuthMenu() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login"); // Redirect to login page after logout
  };

  if (!user) return null; // Hide menu if user is not logged in

  return (
    <div className="flex items-center space-x-4 text-gray-700">
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
  );
}
