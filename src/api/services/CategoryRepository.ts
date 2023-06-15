import axiosInstance from "../axiosConfig";
/**
 * repository pour la récupération des data lité aux Categories.
 */
class CategoryRepository{
/**
   * Récupération des data pour la recherche depuis l'API
   * @returns
   */
 getData = async () => {
    return await axiosInstance
      .get(
        `/category`
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default new CategoryRepository();