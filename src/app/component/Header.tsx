import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function Header() {
  const { user } = useAuth();
  const router = useRouter();

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
      </Toolbar>
    </AppBar>
  );
}

export default Header;
