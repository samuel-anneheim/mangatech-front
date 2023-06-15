import axiosInstance from "../axiosConfig";

class EditorRepository {

    /**
     * Récupération de la liste des editeurs
     * @returns editor
     */
    getEditor = async () => {
        return await axiosInstance
            .get(
                '/editor'
            )
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }

    /**
     * 
     * @param id 
     * @returns récupère un editeur
     */
    getOneEditor = async (slug?: string) => {
        return await axiosInstance
            .get(
                `/editor/${slug}/slug/collections`
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default new EditorRepository();