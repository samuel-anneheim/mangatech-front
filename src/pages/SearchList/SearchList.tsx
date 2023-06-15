import React, { useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import MangasInSearchList from "./components/MangasInSearchList";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { useSearchManga } from "../../hooks/UseSearchManga";

/**
 * Composant qui gere l'affichage des resultat trouvé sur a un recherche dans la barre de recherche ou par categorie
 * @returns
 */
export const SearchList = () => {
  //State pour savoir le nombre de pages total
  let [targetPage, setTargetPage] = React.useState(1);
  //State pour savoir si des résultats on été trouvés.
  let [resultFound, setResultFound] = React.useState(false);
  //State valeur du filtre par categorie.
  let [filterCategoryValue, setFilterCategoryValue] = React.useState<string[]>(
    []
  );
  //Information renseigné dans la barre de recherche
  let { search } = useParams();
  //récupération de l'URL pour savoir si c'est une recherche par category
  const searchType = window.location.href.split("/");

  //Limite d'affichage par page
  const limit = 25;

  //import du hook pour la recherche.
  const {
    mangasList,
    totalPages,
    isLoading,
    categoriesFound,
    countResultsFound,
  } = useSearchManga(
    targetPage,
    search,
    limit,
    searchType[4],
    filterCategoryValue
  );

  /**
   * Methode déclanché a la création du composant.
   */
  useEffect(() => {
    if (Object.keys(mangasList).length == 0) {
      setResultFound(false);
    } else {
      setResultFound(true);
    }
  }, [mangasList]);

  //Hook qui premet au changement d'une valeure de recherche de reset la page cible a 1
  useEffect(() => {
    setTargetPage(1);
    setFilterCategoryValue([]);
  }, [search]);

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
  /**
   * Gestion du filtre par categories avec les checkbox
   * @param event evenement
   * @param value page cible
   */
  const handleFilterSubmit = (e: any) => {
    let newFilterCategoryTab = [...filterCategoryValue];
    setTargetPage(1);
    if (e.target.checked) {
      if (!newFilterCategoryTab.includes(e.target.value)) {
        newFilterCategoryTab.push(e.target.value);
        setFilterCategoryValue([...newFilterCategoryTab]);
      }
    } else {
      if (newFilterCategoryTab.includes(e.target.value)) {
        newFilterCategoryTab = newFilterCategoryTab.filter(
          (value) => value != e.target.value
        );
        setFilterCategoryValue([...newFilterCategoryTab]);
      }
    }
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
            m:1,
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
  //Si le chargement des mangas n'a pas trouvé de resultats affichage conditionel.
  if (!resultFound) {
    return (
      <>
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            m:1,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Aucun résultats trouvés suite a votre recherche
        </Typography>
      </>
    );
  }
  return (
    <Box sx={{display:{xs:"block",md:"flex"}}}>
      <Box>
        {searchType[4] != "category" ? (
          <FormGroup
            sx={{ display: { xs: "block", md: "flex" }, mt: {xs:2,md:5}, m:1, }}
          >
            <FormLabel component="legend">Categories</FormLabel>
            {categoriesFound.map((category: any, i: number) => (
              <FormControlLabel
                control={
                  <Checkbox
                    value={category.name}
                    onClick={(e) => handleFilterSubmit(e)}
                  />
                }
                label={category.name}
                key={i}
              />
            ))}
          </FormGroup>
        ) : null}
      </Box>
      <Grid container>
        <Typography
          variant="h6"
          noWrap
          sx={{
            m:1,
            display: "flex",
            flexWrap: "wrap",
            mr: 2,          
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Résultats pour la recherche : "
          {search == "All" ? "Toutes les collections" : search}" (
          <Typography
            component={"span"}
            variant="h6"
            noWrap
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {countResultsFound > 1
              ? countResultsFound + " résultats"
              : countResultsFound + " résultat"}
          </Typography>
          )
        </Typography>

        {/* Card Collection */}
        <Grid container >
          {mangasList.map((mangas: any, i: number) => (
            <MangasInSearchList key={i} mangas={mangas} />
          ))}
        </Grid>

        {/* Pagination */}
        <Stack sx={{width:"100%", alignItems: "center"}}>
          <Pagination
            count={totalPages}
            sx={{ mt: 3,m:1 }}
            color="primary"
            variant="outlined"
            showFirstButton
            showLastButton
            shape="rounded"
            onChange={handleChange}
            page={targetPage}
          />
        </Stack>        
      </Grid>
    </Box>
  );
};

export default SearchList;
