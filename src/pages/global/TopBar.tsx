import {
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";

import LigthModeOutlineIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlineIcon from "@mui/icons-material/DarkModeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useProSidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import SearchBar from "../../components/SearchBar";
import ConnexionButton from "../../components/connexion/Connexionbutton";
import LogoutButton from "../../components/connexion/LogoutButton";


const Topbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken } = useProSidebar();

  const { isLoggedIn, logout } = useContext(UserContext);
  const [partialSearch, setPartialSearch] = useState<string>("");

  const handleConnexion = () => {
    navigate("/login");
  };

  const handleInputSearchSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/list/${partialSearch}`);
  };

  const handleChangeMode = () => {
    localStorage.setItem("mode", theme.palette.mode === "dark" ? "light" : "dark");
    colorMode.toggleColorMode();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems={"center"}
      p={2}
      sx={{ flexGrow: 1 }}
    >
      <Box display="flex" alignItems={"center"}>
        {broken && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>

      <Box display="flex" height={35} alignItems={"center"}>
        <SearchBar
          partialSearch={partialSearch}
          setPartialSearch={setPartialSearch}
          handleInputSearchSubmit={handleInputSearchSubmit}
        />
        <IconButton onClick={handleChangeMode}>
          {theme.palette.mode === "dark" ? (
            <LigthModeOutlineIcon />
          ) : (
            <DarkModeOutlineIcon />
          )}
        </IconButton>
        {isLoggedIn ? (
          <Box sx={{ flexGrow: 0 }}>
            <LogoutButton handleLogout={logout}/>
          </Box>
        ) : (
          <Box>
            <ConnexionButton handleConnexion={handleConnexion} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
