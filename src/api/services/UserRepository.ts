import axiosInstance from "../axiosConfig";

/**
 * repository pour la récupération des data lié aux User.
 */
class UserRepository {
    /**
    * Check si l'utilisateur est eligible a la connexion , retour du jwt dans le cas ou il est eligible
    * @returns
    */
    getLoginJwt = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
        return await axiosInstance
            .post(
                `/login`,
                {
                    username: email,
                    password: password
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            })

    }

    /**
 * Check si l'utilisateur est eligible a la connexion , retour du jwt dans le cas ou il est eligible
 * @returns
 */
    register = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null, date: string) => {
        return await axiosInstance
            .post(
                `/user`,
                {
                    email: email,
                    password: password,
                    registrationDate: date
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    updateData = async (data: FormData, jwt: string | undefined | null) => {
        const headers = { 'Authorization': `Bearer ${jwt}` };
        return await axiosInstance
            .patch(
                `user/updateProfile`, {
                    name: data.get('name') ? data.get('name') : undefined,
                    surname: data.get('surname') ? data.get('surname') : undefined,
                    picture: data.get('picture') ? data.get('picture') : undefined,
                    email: data.get('email') ? data.get('email') : undefined,
            },{headers})
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error);
            });
    };

    updatePassword = async (data: FormData, jwt: string | undefined | null) => {
        const headers = { 'Authorization': `Bearer ${jwt}` };
        return await axiosInstance
            .patch(
                `user/updateProfile`, {
                    password: data.get('password'),
            }, {headers})
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error);
            });
    };

    deleteUser = async (jwt: string | undefined | null) => {
        const headers = { 'Authorization': `Bearer ${jwt}` };
        return await axiosInstance
            .delete(
                `user/deleteProfile`,{headers})
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * Récupération des datas de l'utilisateur par le jwt
     * @param jwt json token récupérer lors du login
     */
    getUserData = async (jwt: string | undefined | null) => {
        const headers = { 'Authorization': `Bearer ${jwt}` };
        return await axiosInstance
            .get(
                '/profil', { headers }
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            })
    };
}

export default new UserRepository();