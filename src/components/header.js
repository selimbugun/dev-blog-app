"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CodeIcon from "@mui/icons-material/Code";
import Link from "next/link";
import GetUserClient from "@/utils/getUserClient";

function Header() {
  const user = GetUserClient();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleGoToProfile = () => {
    setAnchorElUser(null);
    window.location.href = "/profile";
  };

  const handleLogout = async () => {
    setAnchorElUser(null);
    const res = await fetch("/api/account/logout", {
      method: "POST",
    });
    if (res.ok) {
      window.location.href = "/login";
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#D9EAFD", my: 2, borderRadius: "25px" }}
    >
      <Toolbar disableGutters>
        <CodeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          DevBlog
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography
                component={Link}
                href="/"
                sx={{ textAlign: "center" }}
              >
                Home
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography
                component={Link}
                href="/blog"
                sx={{ textAlign: "center" }}
              >
                Blog
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography
                component={Link}
                href="/about"
                sx={{ textAlign: "center" }}
              >
                About
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
        <CodeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          DevBlog
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          <Button
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: "inherit",
              display: "block",
            }}
            component={Link}
            href="/"
          >
            Home
          </Button>
          <Button
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: "inherit",
              display: "block",
            }}
            component={Link}
            href="/blog"
          >
            Blog
          </Button>
          <Button
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: "inherit",
              display: "block",
            }}
            component={Link}
            href="/about"
          >
            About
          </Button>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {!user && (
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  sx={{ textAlign: "center" }}
                  component={Link}
                  href="/login"
                >
                  Giriş Yap
                </Typography>
              </MenuItem>
            )}
            {!user && (
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  sx={{ textAlign: "center" }}
                  component={Link}
                  href="/register"
                >
                  Kayıt Ol
                </Typography>
              </MenuItem>
            )}
            {user && (
              <MenuItem onClick={handleGoToProfile}>
                <Typography sx={{ textAlign: "center" }}>Profil</Typography>
              </MenuItem>
            )}
            {user && (
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: "center" }}>Çıkış Yap</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  );
}
export default Header;
