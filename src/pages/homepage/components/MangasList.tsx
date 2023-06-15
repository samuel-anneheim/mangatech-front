import { Button, Box } from "@mui/material";
import Mangas from "./Mangas";
/**
 * Composant qui gere l'affichage de la liste des mangas pour le carrousel
 * @param props liste des mangas
 * @returns 
 */
export const MangasList = (props: any) => {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "flex" },
        justifyContent: "flex-start",
        alignItems: "center",
        ml: { xs: 7, md: 9 },
       
      }}
    >
      {props.items.map((mangas: any, i: number) => (
        <Mangas key={i} mangas={mangas} />
      ))}
      <Button className="CheckButton"></Button>
    </Box>
  );
};

export default MangasList;
