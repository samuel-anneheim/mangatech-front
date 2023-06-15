import { Box, Typography } from "@mui/material";

const LoadingElement = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        noWrap
        sx={{
          mr: 2,
          fontWeight: 700,
          letterSpacing: ".1rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Chargements en cours...
      </Typography>
    </Box>
  );
};

export default LoadingElement;