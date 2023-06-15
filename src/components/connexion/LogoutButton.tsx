import { Box, IconButton, Typography } from "@mui/material";
import { SvgLogo } from "../icons/SvgLogo";
import LogoutIcon from "../../assets/logout.svg";

type Props = {
  handleLogout: () => void;
};

const LogoutButton = ({ handleLogout }: Props) => {
  return (
    <IconButton onClick={handleLogout}>
      <Box
        display={{ xs: "none", md: "flex" }}
        justifyContent={"space-around"}
        alignItems={"center"}
        width={"120px"}
      >
        <SvgLogo name={LogoutIcon} />
        <Typography fontSize="small">Déconnexion</Typography>
      </Box>
      <Box
        display={{ xs: "flex", md: "none" }}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <SvgLogo name={LogoutIcon} />
      </Box>
    </IconButton>
  );
};

export default LogoutButton;
