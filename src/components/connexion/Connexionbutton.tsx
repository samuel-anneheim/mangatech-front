import { Box, IconButton, Typography } from "@mui/material";
import { SvgLogo } from "../icons/SvgLogo";
import LoginIcon from "../../assets/login.svg";

type Props = {
  handleConnexion: () => void;
};

const ConnexionButton = ({ handleConnexion }: Props) => {
  return (
    <IconButton onClick={handleConnexion}>
      <Box
        display={{ xs: "none", md: "flex" }}
        justifyContent={"space-around"}
        alignItems={"center"}
        width={"120px"}
      >
        <SvgLogo name={LoginIcon} />
        <Typography fontSize="small">Se connecter</Typography>
      </Box>
      <Box
        display={{ xs: "flex", md: "none" }}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <SvgLogo name={LoginIcon} />
      </Box>
    </IconButton>
  );
};

export default ConnexionButton;
