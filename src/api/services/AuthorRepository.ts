import axiosInstance from "../axiosConfig";

class AuthorRepository {

    /**
     * Récupération de la liste des auteurs
     * @returns author
     */
    getAuthor = async () => {
        return await axiosInstance
            .get(
                '/author'
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
     * @returns récupère un auteur
     */
    getOneAuthor = async (slug?: string) => {
        return await axiosInstance
            .get(
                `/author/collections/${slug}/slug`
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default new AuthorRepository();