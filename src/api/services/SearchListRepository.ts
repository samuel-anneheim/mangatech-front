import axiosInstance from "../axiosConfig";
/**
 * Repository pour l'appel a l'API et la récupération des data lié aux collections
 */
class SearchListRepository {
    /**
       * Récupération des data pour la recherche depuis l'API
       * @returns
       */
    getData = async (targetPage: number = 1, searchValue: string, limit: number, searchType: string, filterCategoryValue: string[]) => {
        let stringifyFilterCategoryValue: string = "";
        if (searchValue == "All") {
            searchValue = "";
        }
        let url = `/collection/search?pageNumber=${targetPage}&&limit=${limit}&&title=${searchValue}`
        if (searchType == "category") {
            url = `/collection/categories/search?pageNumber=${targetPage}&&limit=${limit}&&categoryName=${searchValue}`
        }
        if (searchType == "filter") {
            stringifyFilterCategoryValue = filterCategoryValue.toString()
            url = `/collection/search/filter?pageNumber=${targetPage}&&limit=${limit}&&title=${searchValue}&&filterCategoryName=${stringifyFilterCategoryValue}`
        }
        return await axiosInstance
            .get(
                url
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getDetailsData = async(slug :  string | undefined) => {
        let url = `/collection/${slug}/alldatas`
        return await axiosInstance
        .get(
            url
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export default new SearchListRepository();