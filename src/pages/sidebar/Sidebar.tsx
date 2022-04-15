import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Collapse } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Fade from "@mui/material/Fade";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useAppSelector } from "../../store/hooks";
import { startCase } from "lodash";

const drawerWidth = 230;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden",
  backgroundColor: "#f7f3f2"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "5vh",
  marginLeft: "7px",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

function StatefulListItem(props: {
  open: boolean;
  children: JSX.Element | Array<JSX.Element>;
  onClick: () => void;
}): JSX.Element {
  const { open, children, onClick } = props;
  let icon = <ExpandMore />;
  if (open) icon = <ExpandLess />;
  return (
    <ListItem button onClick={onClick}>
      {children}
      {icon}
    </ListItem>
  );
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginBottom: "32px",

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginBottom: "32px",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logo = open ? (
    <img
      src="/logo2.png"
      alt=""
      height={40}
      width={150}
      style={{ marginTop: "16px" }}
    />
  ) : (
    ""
  );

  const handleClickMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const username = useAppSelector((state) => state.user.username);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} color="primary" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "32px",
              ...(open && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h5" sx={{ mr: "16px" }}>
                {startCase(username)}
              </Typography>
              <Box
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#e8edea"
                }}
                onClick={(e) => {
                  handleClickMenu(e);
                }}
              >
                <AccountCircleOutlinedIcon
                  style={{
                    height: "40px",
                    width: "40px"
                  }}
                />
                <Menu
                  id="long-menu"
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "fade-button"
                  }}
                  anchorEl={anchorEl}
                  open={openMenu}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h4" sx={{ textAlign: "left", width: "100%" }}>
            {logo}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem button onClick={() => navigate("/dashboard")}>
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate("/calendar")}>
            <ListItemIcon>
              <CalendarTodayIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button onClick={() => navigate("/companies")}>
            <ListItemIcon>
              <BusinessIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Companies" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
