import axiosInstance from "../axiosConfig";
/**
 * repository pour la récupération des data lité aux Categories.
 */
class VolumeRepository {
  /**
   * Récupération des volumes par edition depuis l'API
   * @returns
   */
  getVolumesByEdition = async (
    slugCollection: string | undefined,
    slugEdition: string | undefined,
    page: number,
    limit: number
  ) => {
    return await axiosInstance
      .get(`/volume/edition/${slugCollection}/${slugEdition}?pageNumber=${page}&&limit=${limit}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**
   * Récupération du volume par son edition et le numéro de son tome depuis l'API
   * @returns
   */
  getOneVolumeByEditionAndNumber = async (
    slugCollection: string | undefined,
    slugEdition: string | undefined,
    number: string | undefined,
    isLogged: boolean
  ) => {
    if (isLogged) {
      return await axiosInstance
        .get(`/volume/edition/${slugCollection}/${slugEdition}/${number}/connected`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          return response.data;
          
        })
        .catch((error) => {
          console.log(error);
          
          return error;
        });
    } else {
      return await axiosInstance
      .get(`/volume/edition/${slugCollection}/${slugEdition}/${number}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    }
  };
  /**
   * Ajouté un volume dans la library de l'utilisateur courant
   * @param isRead
   * @param userId
   * @param volumeId
   * @returns
   */
  addVolumeInUserWishList = async (volumeId: number) => {
    return await axiosInstance
      .patch(`volume/${volumeId}/wishlist`, {},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Supprimer un volume de la bibliotheque de l'utisateur courant
   * @param libraryId
   * @returns
   */
  deleteVolumeInUserWishList = async (volumeId: number) => {
    return await axiosInstance
      .delete(`volume/${volumeId}/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default new VolumeRepository();
