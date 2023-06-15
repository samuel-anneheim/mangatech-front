import React, { useEffect } from "react";
import {
  Card,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router";
/**
 * Composant qui gere l'affichage d'un manga dans le caroussel
 * @param props un manga
 * @returns 
 */
export const Mangas = (props: any) => {
  useEffect(() => {});
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",  
        ml: 0.5,
        mr: 0.5,
        width: { xs: 20, md: 150 },
        height: { xs: 100, md: 250 },
      }}
      onClick={(e) => {
        navigate(`/collection/${props.mangas.slug}`);
      }}
    >
      <CardMedia
        sx={{
          height:"100%"
        }}
        image={props.mangas.image}
        title= {props.mangas.title}
      />
    </Card>
  );
};

export default Mangas;
