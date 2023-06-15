import axiosInstance from "../axiosConfig";
/**
 * repository pour la récupération des data lité aux Categories.
 */
class LibraryRepository {
    /**
     * Ajouté un volume dans la library de l'utilisateur courant
     * @param isRead 
     * @param userId 
     * @param volumeId 
     * @returns 
     */
    addVolumeInUserLibrary = async (isRead: boolean, volumeId: number) => {
        return await axiosInstance
            .post(
                'library', {
                isRead: isRead,
                volumeId: volumeId,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Supprimer un volume de la bibliotheque de l'utilisateur courant
     * @param libraryId 
     * @returns 
     */
    deleteVolumeInUserLibrary = async (libraryId : number) => {
        return await axiosInstance
        .delete(
            `library/${libraryId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * Change la valeur de isRead dans la library donnée
     * @param libraryId 
     */
    changeIsReadStatus = async(libraryId : number) => {
        return await axiosInstance
        .patch(
            `library/${libraryId}/changeIsReadStatus`, {} ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export default new LibraryRepository();