import React, { useEffect } from 'react'
import LibraryRepository from '../api/services/LibraryRepository';
import VolumeRepository from '../api/services/VolumeRepository';



/**
 * Hook personnalisé pour la recupération des details d'une categories. 
 * @returns retour les hooks categories , error
 */
export const useVolumeDetails = (slugCollection: string | undefined, slugEdition: string | undefined, number: string | undefined, isLoggedIn : boolean) => {

    //State de la liste des mangas renvoyé par l'API
    const [volume, setVolume] = React.useState<any>([]);
    //State du Chargement de la page de resultat de recherche
    const [isLoading, setIsLoagind] = React.useState(true);
    //State de la liste des mangas renvoyé par l'API
    const [error, setError] = React.useState('');
    //State permetant de mettre a jour le composant apres une methode
    const [update , setUpdate ] = React.useState(false);
    

    //Ajout d'un volume dans la library de l'utilsateur courant
    const addVolumeInUserLibrary = () => {
        LibraryRepository.addVolumeInUserLibrary(false, volume.id)
        .then(res => {
            setUpdate(!update);
        })
        .catch((err) => {
            setError(err)
        })
        
    }

    //Suppression d'un volume dans la library de l'utilsateur courant
    const deleteVolumeInUserLibrary = () => {
        LibraryRepository.deleteVolumeInUserLibrary(volume.volumeInLibrary)
        .then(res => {
            setUpdate(!update);
        })
        .catch((err) => {
            setError(err)
        })
        
    }


    //Ajout d'un volume dans la wish list de l'utilsateur courant
    const addVolumeInUserWishList= () => {
        VolumeRepository.addVolumeInUserWishList(volume.id)
        .then(res => {
            setUpdate(!update);
        })
        .catch((err) => {
            setError(err)
        })
        
    }

    //Suppression d'un volume dans la wish list de l'utilsateur courant
    const deleteVolumeInUserWishList= () => {
        VolumeRepository.deleteVolumeInUserWishList(volume.id)
        .then(res => {
            setUpdate(!update);
        })
        .catch((err) => {
            setError(err)
        })
        
    }
    //Changement du status du isRead dans la library de l'utilisateur (non lu / lu)
    const changeIsReadStatus = () => {
        LibraryRepository.changeIsReadStatus(volume.volumeInLibrary)
        .then(res => {
            setUpdate(!update);
        })
        .catch((err) => {
            setError(err)
        })
    }

    useEffect(() => {
        VolumeRepository.getOneVolumeByEditionAndNumber(slugCollection ,slugEdition, number, isLoggedIn)
            .then((res) => {
                setVolume(res || [])
                setIsLoagind(false)
            })
            .catch((err) => {
                setError(err)
            })
    }, [number,update,isLoggedIn])

    return { volume, error, isLoading,addVolumeInUserLibrary,deleteVolumeInUserLibrary,addVolumeInUserWishList,deleteVolumeInUserWishList,changeIsReadStatus }
}

