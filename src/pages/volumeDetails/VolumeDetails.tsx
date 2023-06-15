import React, { useContext, useEffect } from "react";
import {
  Button,
  Typography,
  Grid,
  Divider,
  Box,
  Link,
  Switch,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useParams } from "react-router-dom";
import { useVolumeDetails } from "../../hooks/useVolumeDetails";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Remove";
import { UserContext } from "../../context/userContext";
import jwtDecode from "jwt-decode";
import LoadingElement from "../../components/LoadingElement";

/**
 * Composant qui gere l'affichage du details d'un volume
 * @param props un manga
 * @returns
 */
export const VolumeDetails = (props: any) => {
  const { isLoggedIn} = useContext(UserContext);

  //Information renseigné dans la barre de recherche
  let { slugEdition, number, slugCollection } = useParams();

  const navigate = useNavigate();

  //Import du hook
  const {
    volume,
    isLoading,
    addVolumeInUserLibrary,
    deleteVolumeInUserLibrary,
    addVolumeInUserWishList,
    deleteVolumeInUserWishList,
    changeIsReadStatus,
  } = useVolumeDetails(slugCollection, slugEdition, number, isLoggedIn ? isLoggedIn : false);
  
  //Si le chargement des mangas n'est pas terminé affichage conditionel.
  if (isLoading) {
    return (
      <LoadingElement />
    );
  }
  return (
    <Grid container p={2}>
      <Grid item xs={12} md={4} sm={8} sx={{ mt: 1 }}>
        <Box
          sx={{
            background: `url(${volume.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            filter: "blur(25px)",
            zIndex: -10,
            width: { xs: "90%", md: "450px" },
            height: { xs: "80%", md: "70vh" },
            position: "absolute",
            m: { xs: 2, md: 5 },
          }}
        ></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="text"
            color="inherit"
            startIcon={<ArrowBackIosNewIcon />}
            disabled={volume.number > 1 ? false : true}
            onClick={(e) => {
              navigate(
                `/${volume.edition.collection.slug}/${volume.edition.slug}/${
                  Number(number) - 1
                }`
              );
            }}
          >
            <Typography
              sx={{
                fontWeight: 1000,
              }}
            >
              Tome précédent
            </Typography>
          </Button>

          <Button
            variant="text"
            color="inherit"
            endIcon={<ArrowForwardIosIcon />}
            disabled={volume.number == volume.volumesCount ? true : false}
            onClick={(e) => {
              navigate(
                `/${volume.edition.collection.slug}/${volume.edition.slug}/${
                  Number(number) + 1
                }`
              );
            }}
          >
            <Typography
              sx={{
                fontWeight: 1000,
              }}
            >
              Tome suivant
            </Typography>
          </Button>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={3}>
          <Box
            component="img"
            src={volume.image}
            alt={volume.title}
            sx={{
              maxWidth: "300px",
              width: 300,
            }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={7} sm={12} sx={{ mt: 4, ml: { md: 12 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Link
            href="#"
            underline="hover"
            color="#f39200"
            onClick={(e) => {
              e.preventDefault();
              navigate(
                `/collection/${volume.edition.collection.slug}
            `
              );
            }}
          >
            <Typography
              variant="h1"
              fontWeight={"bold"}
              noWrap
              sx={{
                color: "#f39200",
              }}
            >
              {volume.edition.collection.title}
            </Typography>
          </Link>
          {volume.volumeInLibrary ? (
            <Box>
              <Switch
                color="warning"
                checked={volume.volumeIsRead}
                onChange={(e) => {
                  changeIsReadStatus();
                }}
              />
              {!volume.volumeIsRead ? (
                <Typography variant="h6" component={"span"} noWrap>
                  Non lu
                </Typography>
              ) : (
                <Typography variant="h6" component={"span"} noWrap>
                  Lu &emsp;
                </Typography>
              )}
            </Box>
          ) : null}
        </Box>
        <Typography
          variant="h4"
          noWrap
          sx={{
            textDecoration: "none",
            display: "flex",
          }}
        >
          Tome {volume.number}
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: {xs: 'column', md:'row'}, justifyContent: "space-around", alignItems:"center", mt: 2, mb: 2 }}
        >
          {volume.volumeInLibrary == false ? (
            <Button
              variant="outlined"
              color="error"
              startIcon={<AddIcon />}
              size="small"
              onClick={(e) => {
                if (isLoggedIn) {
                  addVolumeInUserLibrary();
                } else {
                  navigate("/login");
                }
              }}
            >
              <Typography
                sx={{

                }}
              >
                Ajouter a ma collection
              </Typography>
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="error"
              startIcon={<RemoveIcon />}
              onClick={(e) => {
                deleteVolumeInUserLibrary();
              }}
            >
              <Typography
              >
                Supprimer de ma collection
              </Typography>
            </Button>
          )}

          <Box>
            {!volume.volumeInWishList ? (
              <Button
                variant="outlined"
                color="success"
                startIcon={<FavoriteIcon />}
                size="small"
                onClick={(e) => {
                  if (isLoggedIn) {
                    addVolumeInUserWishList();
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Ajouter a ma liste de souhaits
                </Typography>
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="success"
                startIcon={<RemoveIcon />}
                size="small"
                onClick={(e) => {
                  deleteVolumeInUserWishList();
                }}
              >
                <Typography
                >
                  Supprimer de ma liste de souhaits
                </Typography>
              </Button>
            )}
          </Box>
        </Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mr: { xs: 5, md: 15 },
          }}
        >
          Suivis par{" "}
          {volume.followNumber > 1
            ? volume.followNumber + " personnes"
            : volume.followNumber + " personne"}
        </Typography>
        <Divider sx={{ mt: 6 }} textAlign="left">
          <Typography
            variant="h5"
            sx={{
              mt: 1,
              display: "flex",
              color: "#f39200",
              textDecoration: "none",
            }}
          >
            Resumé
          </Typography>
        </Divider>
        <Typography
          variant="h6"
          noWrap
          sx={{
            textDecoration: "none",
            display: "flex",
            mt: 3,
          }}
        >
          <Box component="span" sx={{ mr: 1, fontWeight: 700 }}>
            {volume.title}
          </Box>
        </Typography>
        <Typography
          sx={{
            textDecoration: "none",
            display: "flex",
          }}
        >
          {volume.resume}
        </Typography>
        <Divider sx={{ mt: 6 }} textAlign="left">
          <Typography
            variant="h5"
            noWrap
            sx={{
              mt: 1,
              display: "flex",
              color: "#f39200",
              textDecoration: "none",
            }}
          >
            Details
          </Typography>
        </Divider>
        <Typography
          noWrap
          sx={{
            textDecoration: "none",
            display: "flex",
            mt: 3,
          }}
        >
          <Box component="span" sx={{ mr: 1, fontWeight: 700 }}>
            Date de sortie :
          </Box>
          {volume.releaseDate}
        </Typography>
        <Typography
          noWrap
          sx={{
            textDecoration: "none",
            display: "flex",
          }}
        >
          <Box component="span" sx={{ mr: 1, fontWeight: 700 }}>
            Auteur :
          </Box>
          {volume.edition.collection.author.name}
        </Typography>
        <Typography
          noWrap
          sx={{
            textDecoration: "none",
            display: "flex",
          }}
        >
          <Box component="span" sx={{ mr: 1, fontWeight: 700 }}>
            Prix :
          </Box>
          {volume.price} €
        </Typography>
      </Grid>
    </Grid>
  );
};

export default VolumeDetails;
