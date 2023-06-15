import React, { useEffect } from 'react'
import SearchListRepository from '../api/services/SearchListRepository'

/**
 * Hook personnalisé pour la recherche des collections.
 * @param targetPage page cible
 * @param searchValue valeur rechercher
 * @param limit limite d'affichage par page
 * @param searchType le type de recherche (recherche par categorie , filtre ou recherche par la barre de recherche)
 * @param filterCategoryValue Le filtre par category
 * @returns les hooks mangasList, isLoading, error, totalPages, filterCategoryValue,categoriesFound 
 */
export const useSearchManga = (targetPage: number, searchValue: string = "", limit: number, searchType: string, filterCategoryValue: string[]) => {
    //State du Chargement de la page de resultat de recherche
    const [isLoading, setIsLoagind] = React.useState(true);
    //State de la liste des mangas renvoyé par l'API
    const [mangasList, setMangasList] = React.useState([]);
    //State du Chargement de la page de resultat de recherche
    const [error, setError] = React.useState('');
    //State pour savoir le nombre de pages total
    let [totalPages, setTotalPages] = React.useState(1);
    //State qui defini le nomnbre de résultats trouvés
    let [countResultsFound, setCountResultsFound] = React.useState(1);
     //State pour savoir le nombre de pages total
     let [categoriesFound, setCategoriesFound] = React.useState([]);

    useEffect(() => {
        if (filterCategoryValue.length > 0) {
            searchType = "filter"
            serviceCallForCollection(targetPage, searchValue, limit, searchType, setMangasList, setTotalPages, setIsLoagind, setError, filterCategoryValue,setCategoriesFound,setCountResultsFound);
        }
        else{
            serviceCallForCollection(targetPage, searchValue, limit, searchType, setMangasList, setTotalPages, setIsLoagind, setError, [],setCategoriesFound,setCountResultsFound);
        }
       
       
    }, [searchValue, targetPage,filterCategoryValue])

   
    return { mangasList, isLoading, error, totalPages, filterCategoryValue,categoriesFound,countResultsFound }
}
//Envoie des information au service et récupération des collections par rapport au data envoyé.
function serviceCallForCollection(targetPage: number, searchValue: string, limit: number, searchType: string, setMangasList: React.Dispatch<React.SetStateAction<never[]>>, setTotalPages: React.Dispatch<React.SetStateAction<number>>, setIsLoagind: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string>>, filterCategoryValue: string[],setCategoriesFound: React.Dispatch<React.SetStateAction<never[]>>,setCountResultsFound: React.Dispatch<React.SetStateAction<number>>) {
    SearchListRepository.getData(targetPage, searchValue, limit, searchType, filterCategoryValue)
        .then((res) => {
            setMangasList(res || []);
            if (res.length > 0) {
                setTotalPages(res[0].totalPages);
                setCountResultsFound(res[0].count)
                if (searchType != "filter" && searchType != "category") {
                    setCategoriesFound(res[0].categoriesFound)
                }
            
            }
            setIsLoagind(false);

        })
        .catch((err) => {
            setError(err);
        });
}

