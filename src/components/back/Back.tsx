import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
/**
 * Composant de l'objet retour
 * @param {*} props
 * @returns
 */
export const Back = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  if (currentUrl != "/homepage" && currentUrl != "/") {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <>
        <Box sx={{ display: "flex", mt: 1, mb: 1 }}>
          <Button
            onClick={handleGoBack}
            variant="text"
            startIcon={<ArrowBackIcon style={{color: colors.primary[100]}} />}
          >
            <Typography
            fontWeight={700}
              sx={{
                color: colors.orange[500],
              }}
            >
              Retour
            </Typography>
          </Button>
        </Box>
      </>
    );
  } else {
    return <></>;
  }
};

export default Back;
