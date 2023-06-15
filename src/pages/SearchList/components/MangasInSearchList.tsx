import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router";
import { tokens } from "../../../theme";
import ButtonForAddOrRemoveInCollection from "./ButtonForAddOrRemoveInCollection";
/**
 * Composant qui gere l'affichage dans la liste de resultat trouvé apres une recherche dans la barre de recherche ou par categorie.
 * @param props un manga
 * @returns
 */
export const MangasInSearchList = (props: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={8} sx={{ display: "contents" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          m: "auto"
        }}
      >
        <Card
         sx={{ maxWidth: 300, m: 1, cursor: 'pointer' }}
         onClick={(e) => {
          if (props.from == "editionVolumeList") {
            navigate(
              `/${props.slugCollection}/${props.slugEdition}/${props.mangas.number}`
            );
          } else {
            navigate(`/collection/${props.mangas.slug}`);
          }
        }}
         >
          <CardMedia
            component="img"
            height="300"
            width="300"
            image={props.mangas.image}
            title={props.mangas.title}
          />
          <CardContent sx={{height: "50px", backgroundColor: colors.primary[700]}}>
            <Typography gutterBottom variant="h5" textAlign={"center"}>
              {props.from == "editionVolumeList"
                ? "Tome " + props.mangas.number
                : props.mangas.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {props.from == "editionVolumeList" ? (
                <ButtonForAddOrRemoveInCollection
                  from={props.from}
                  mangas={props.mangas}
                  slugEdition={props.slugEdition}
                  slugCollection={props.slugCollection}
                ></ButtonForAddOrRemoveInCollection>
              ) : null}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default MangasInSearchList;
