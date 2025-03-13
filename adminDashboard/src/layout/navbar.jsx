import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import BASE_URL from "../config";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "../utils/features/userReducer";

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const dispatch = useDispatch();
  const admin = useSelector((store) => store?.admin);
  const fetchUser = async () => {
    if (admin) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/admin/profile/view", {
        withCredentials: true,
      });
      dispatch(addAdmin(res?.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);
  const handleChange = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value, // Directly assign the value without putting it in an array
    }));
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLoginClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {["Category", "Product", "Banner", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const handleLoginSubmit = async () => {
    try {
      if (!user.email || !user.password) {
        console.log("Please fill in all fields");
        return;
      }

      const res = await axios.post(
        BASE_URL + "/admin/login",
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      );

      console.log(res?.data);

      dispatch(addAdmin(res?.data));

      setDialogOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            {!admin ? (
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
            ) : (
              <Button color="inherit">{admin?.name}</Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      {/* Drawer */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {/* Adding margin-top to prevent content being hidden behind the AppBar */}
      <Box sx={{ marginTop: "64px" }}>
        <Outlet />
      </Box>

      {/* Login Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={user?.email}
            onChange={(e) => handleChange("email", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={user?.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoginSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NavBar;
