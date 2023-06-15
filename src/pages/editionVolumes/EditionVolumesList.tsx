import {
  Box,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { useEditionVolumesList } from "../../hooks/useEditionVolumesList";
import Volume from "../../components/Volume/Volume";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";

/**
 * Composant qui gere l'affichage des volumes dans une edition choisie
 * @param props un manga
 * @returns
 */
export const EditionVolumeList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Information renseigné dans la barre de recherche
  let { slugEdition, slugCollection } = useParams();
  //State pour savoir le nombre de pages total
  let [targetPage, setTargetPage] = React.useState(1);
  //limit de resultats par page
  const limit = 50;
  //Import du hook
  const { volumeList, isLoading, totalPages, collection, edition, error } =
    useEditionVolumesList(slugCollection, slugEdition, targetPage, limit);

  /**
   * Gestion de la pagination
   * @param event evenement
   * @param value page cible
   */
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    targetPage: number
  ) => {
    setTargetPage(targetPage);
  };
  //Si le chargement des mangas n'est pas terminé affichage conditionel.
  if (isLoading) {
    return (
      <>
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Chargements en cours...
        </Typography>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          Aucun résultats trouvés suite a votre recherche
        </Typography>
      </>
    );
  }

  return (
    <Box m={2}>
      <Typography variant="h1" noWrap color={colors.orange[500]}>
        Edition: {edition.name}
      </Typography>
      <Divider sx={{ mt: 1 }} textAlign="left">
        <Typography fontWeight={"bold"} color={colors.orange[500]}>
          Collection
        </Typography>
      </Divider>
      <Typography
        fontWeight={"bold"}
        sx={{
          textDecoration: "underline",
        }}
      >
        <Link
          to={`/collection/${collection.slug}`}
          style={{ textDecoration: "inherit", color: colors.primary[200] }}
        >
          {collection.title}
        </Link>
      </Typography>
      <Divider sx={{ mt: 1 }} textAlign="left">
        <Typography fontWeight={"bold"} color={colors.orange[500]}>
          Editeur
        </Typography>
      </Divider>
      <Typography
        fontWeight={"bold"}
        sx={{
          textDecoration: "underline",
        }}
      >
        <Link
          to={`/editors/${collection.editor.slug}`}
          style={{ textDecoration: "inherit", color: colors.primary[200] }}
        >
          {collection.editor.name}
        </Link>
      </Typography>
      <Divider sx={{ mt: 2 }} textAlign="left">
        <Typography color={colors.orange[500]} fontWeight={"bold"}>
          {volumeList[0].count > 1
            ? volumeList[0].count + " Tomes"
            : volumeList[0].count + " Tome"}
        </Typography>
      </Divider>
      <Box sx={{ width: "100%", mt: 1 }}>
        <Grid item xs={12} md={4} sx={{ display: "contents" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: { sm: "space-between", md: "flex-start" },
            }}
          >
            {volumeList.map((mangas: any, i: number) => (
              <Volume
              key={i}
              edition={edition}
              collection={collection}
                mangas={mangas}
              />
            ))}
          </Box>
        </Grid>
        <Stack alignItems="center">
          <Pagination
            count={totalPages}
            sx={{ mt: 3, mb: 3 }}
            color="primary"
            variant="outlined"
            showFirstButton
            showLastButton
            shape="rounded"
            onChange={handleChange}
            page={targetPage}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default EditionVolumeList;
