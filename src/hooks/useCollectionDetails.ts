import React, { useEffect } from 'react'
import SearchListRepository from '../api/services/SearchListRepository'


/**
 * Hook personnalisé pour la recupération des details d'une categories. 
 * @returns retour les hooks categories , error
 */
export const useCollectionDetails = (slug : string | undefined) => {
    
    //State de la liste des mangas renvoyé par l'API
    const [collectionDetails, setCollectionDetails] = React.useState<any>([]);
   //State du Chargement de la page de resultat de recherche
   const [isLoading, setIsLoagind] = React.useState(true);
    //State de la liste des mangas renvoyé par l'API
    const [error, setError] = React.useState('');
    useEffect(() => {
        SearchListRepository.getDetailsData(slug)
            .then((res) => {           
                setCollectionDetails(res || [])
                setIsLoagind(false)           
            })
            .catch((err) => {
                setError(err)
            })
    }, [])
   
    return {collectionDetails,error,isLoading}
}

