import { useContext } from "react";
import {
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import { useVolumeDetails } from "../../../hooks/useVolumeDetails";
import { UserContext } from "../../../context/userContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
/**
 * Composant qui gere l'affichage dans la liste de resultat trouvé apres une recherche dans la barre de recherche ou par categorie.
 * @param props un manga
 * @returns
 */
export const ButtonForAddOrRemoveInCollection = (props: any) => {
  const { isLoggedIn, user } = useContext(UserContext);
  
  //id de l'utilisateur s'il est connecté. sinon undefined
  let userId = undefined;
  if (user) {
    userId = user.id;
  }

  //Import du hook
  const { deleteVolumeInUserLibrary, addVolumeInUserLibrary, volume } =
    useVolumeDetails(
      props.slugCollection,
      props.slugEdition,
      props.mangas.number,
      isLoggedIn? isLoggedIn : false,
    );
  return (
    <Box>
            {props.from == "editionVolumeList" &&
            isLoggedIn &&
            volume.volumeInLibrary == false ? (
              <Tooltip title="Ajouter à ma collection">
                <Button
                  variant="text"
                  color="error"
                  startIcon={<AddIcon />}
                  size="large"
                  onClick={(e) => {
                    addVolumeInUserLibrary();
                  }}
                ></Button>
              </Tooltip>
            ) : null}
            {props.from == "editionVolumeList" &&
            isLoggedIn &&
            volume.volumeInLibrary != false ? (
              <Tooltip title="Supprimer de ma collection">
                <Button
                  variant="text"
                  color="error"
                  startIcon={<RemoveIcon />}
                  size="large"
                  onClick={(e) => {
                    deleteVolumeInUserLibrary();
                  }}
                ></Button>
              </Tooltip>
            ) : null}
          </Box>     
  );
};

export default ButtonForAddOrRemoveInCollection;
