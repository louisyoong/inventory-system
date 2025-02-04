"use client";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utils/emotionCache";
import { CssBaseline, Container } from "@mui/material";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/app/globals.css";
import Header from "./component/Header";
import { usePathname } from "next/navigation";

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
            <AuthHeaderWrapper />
            <Container className="p-4">{children}</Container>
          </AuthProvider>
        </CacheProvider>
      </body>
    </html>
  );
}

// Wrapper to conditionally render the Header
function AuthHeaderWrapper() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return null; // Wait until loading is complete
  if (pathname === "/login") return null; // Hide Header on the /login page
  if (!user) return null; // Hide Header if the user is not logged in

  return <Header />;
}
