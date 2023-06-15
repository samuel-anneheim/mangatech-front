import React, { useEffect } from 'react'
import volumeRepository from '../api/services/VolumeRepository'


/**
 * Hook personnalisé pour la recupération des details d'une categories. 
 * @returns retour les hooks categories , error
 */
export const useEditionVolumesList = (
        slugCollection: string | undefined,
        slugEdition: string | undefined,
        page: number,
        limit: number
    ) => {

    //State de la liste des mangas renvoyé par l'API
    const [volumeList, setVolumeList] = React.useState<any>([]);
    //State du Chargement de la page de resultat de recherche
    const [isLoading, setIsLoagind] = React.useState(true);
    //State de la liste des mangas renvoyé par l'API
    const [error, setError] = React.useState(false);
    //State du nom de la collection
    const [collection, setCollection] = React.useState<any>({});
    //State du nom de l'edition 
    const [edition, setEdition] = React.useState<any>({});
    //State pour savoir le nombre de pages total
    let [totalPages, setTotalPages] = React.useState(1);
    //State qui defini le nomnbre de résultats trouvés
    let [countResultsFound, setCountResultsFound] = React.useState(1);
    useEffect(() => {
        volumeRepository.getVolumesByEdition(slugCollection, slugEdition, page, limit)
            .then((res) => {
                setVolumeList(res || [])

                if (res.length > 0) {
                    setTotalPages(res[0].totalPages);
                    setCountResultsFound(res[0].count)
                    setCollection(res[0].edition.collection)
                    setEdition(res[0].edition)
                }else{
                    setError(true)
                }

                setIsLoagind(false)
            })
            .catch((err) => {
                setError(true)
            })
    }, [page])

    return { volumeList, error, isLoading, totalPages, countResultsFound, collection, edition}
}

