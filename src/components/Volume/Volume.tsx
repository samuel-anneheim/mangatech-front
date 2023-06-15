import React, { useEffect } from "react";
import {
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Grid,
  useTheme,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";
import { tokens } from "../../theme";
/**
 * Composant qui gere l'affichage dans la liste de resultat trouvé apres une recherche dans la barre de recherche ou par categorie.
 * @param props un manga
 * @returns
 */
export const Volume = (props: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: { xs: 140, md: 190 },
        maxHeight: { xs: 250, md: 350 },
        width: { xs: 140, md: 190 },
        mt: 2,
        ml: 3,
        backgroundColor: colors.primary[700],
      }}
      onClick={() =>{
        navigate(
          `/${props.collection.slug}/${props.edition.slug}/${props.mangas.number}`
        );
      }
      }
    >
      <CardActionArea>
        <CardMedia
          sx={{
            maxHeight: { xs: 200, md: 300 },
            height: { xs: 200, md: 300 },
          }}
          component="img"
          image={props.mangas.image}
          title={props.mangas.title}
        />
        <CardContent
          style={{
            maxHeight: 30,
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography gutterBottom noWrap color={{color: colors.primary[200]}}>
            {props.mangas.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Volume;
