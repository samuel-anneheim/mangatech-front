import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useCollectionDetails } from "../../hooks/useCollectionDetails";
import Volume from "../../components/Volume/Volume";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

export const CollectionDetails = (props: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let { slug } = useParams();
  const { collectionDetails, isLoading } = useCollectionDetails(slug);
  let [resultFound, setResultFound] = React.useState(false);

  /**
   * Methode déclanché a la création du composant.
   */
  useEffect(() => {
    if (Object.keys(collectionDetails).length == 0) {
      setResultFound(false);
    } else {
      setResultFound(true);
    }
  }, [collectionDetails]);

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

  if (!resultFound) {
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
    <Box sx={{ m: 2 }}>
      <Typography
        variant="h1"
        fontWeight={"bold"}
        noWrap
        sx={{
          display: "flex",
          justifyContent: "center",
          color: colors.orange[500],
          textDecoration: "none",
        }}
      >
        {collectionDetails.title}
      </Typography>
      <Box sx={{ display: "flex" }}>
        {collectionDetails.tags.map((tag: any, i: number) => {
          return <Chip sx={{ mr: 1 }} key={i} label={tag.name} />;
        })}
      </Box>
      <Divider sx={{ mt: 1 }} textAlign="left">
        <Typography
          fontWeight={"bold"}
          noWrap
          sx={{
            display: "flex",
            color: colors.orange[500],
          }}
        >
          Auteur
        </Typography>
      </Divider>
      <Typography
        fontWeight={"bold"}
        noWrap
        sx={{
          display: "flex",
          textDecoration: "underline",
        }}
      >
        <Link to={`/authors/${collectionDetails.author.slug}`} style={{textDecoration: "inherit",  color: colors.primary[200]}}>

        {collectionDetails.author.surname} {collectionDetails.author.name}
        </Link>
      </Typography>
      <Divider textAlign="left">
        <Typography
          noWrap
          fontWeight={"bold"}
          sx={{
            display: "flex",
            color: colors.orange[500],
            textDecoration: "none",
          }}
        >
          Editeur
        </Typography>
      </Divider>
      <Typography
        fontWeight={"bold"}
        noWrap
        sx={{
          display: "flex",
          textDecoration: "underline",
        }}
      >
        <Link to={`/editors/${collectionDetails.editor.slug}`} style={{textDecoration: "inherit",  color: colors.primary[200]}}>
        {collectionDetails.editor.name}
        </Link>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {collectionDetails.editions.map((edition: any, i: number) => (
          <Box key={i}>
            <Divider textAlign="left">
              <Typography
                noWrap
                sx={{
                  display: "flex",
                  color: colors.orange[500],
                  textDecoration: "none",
                }}
              >
                Edition: {edition.name}
              </Typography>
            </Divider>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                noWrap
                sx={{
                  display: "flex",
                  color: colors.primary[200]
                }}
              >
                {edition.volumesCount > 1
                  ? edition.volumesCount + " Tomes"
                  : edition.volumesCount + " Tome"}
              </Typography>

              <Typography>
                <Link to={`/${slug}/${edition.slug}`}>
                  <Button
                    style={{
                      backgroundColor: colors.orange[500],
                    }}
                  >
                    Voir plus
                  </Button>
                </Link>
              </Typography>
            </Box>
            <Grid item xs={12} md={4} sx={{ display: "contents" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: { sm: "space-between", md: "flex-start" },
                }}
              >
                {edition.volumes
                  .sort((a: any, b: any) => a.number - b.number)
                  .map((mangas: any, i: number) => (
                    <Volume
                      key={i}
                      mangas={mangas}
                      edition={edition}
                      collection={collectionDetails}
                    />
                  ))}
              </Box>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CollectionDetails;
