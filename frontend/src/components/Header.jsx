import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ background: "#000" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          ⚡ AI Idea Generator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
