import { Link } from "react-router-dom";
import { Box } from "@mui/material";

/**
 * Composant de page not found
 * @param {*} props
 * @returns
 */
export const Page404 = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Link to="/homepage">
        <img
          style={{ marginTop: "20vH", width: "100%"}}
          src={"../../../assets/img/404.png"}
          alt="page not found"
        ></img>
      </Link>
    </Box>
  );
};

export default Page404;
