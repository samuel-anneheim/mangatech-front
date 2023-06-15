import React, { useState } from "react";
import UserRepository from "../api/services/UserRepository";
import UserType from "../schema/User.type";
import jwtDecode from "jwt-decode";
import { redirect } from "react-router-dom";

type UserContextType = {
  user?: UserType;
  setUser: (user: UserType) => void;
  login: (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => void;
  logout: () => void;
  checkJwtValidity: () => void;
  isLoggedIn?: boolean;
  isFromRegister?: boolean;
  isFailedConnexion?: boolean;
  setIsFromRegister:(etat : boolean ) => void;
  jwt?: string | null;
  register : (email: FormDataEntryValue , password: FormDataEntryValue , registerDate : string) => any;
  setIsFailedConnexion : (etat : boolean ) => void;
};

export const UserContext = React.createContext<UserContextType>({
  setUser: (u) => {},
  login: () => {},
  logout: () => {},
  checkJwtValidity: () => {},
  register: ()=>{},
  setIsFromRegister: ()=>{},
  setIsFailedConnexion: ()=>{},
});

export const UserContextWrapper = ({ children }: any) => {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(localStorage.getItem("logged") === 'true' ? true : false);
  const [isFailedConnexion, setIsFailedConnexion] = React.useState<boolean>(false);
  const [isFromRegister, setIsFromRegister] = useState<boolean | undefined >(undefined);
  const [jwt, setJwt] = useState(localStorage.getItem("access_token") ? localStorage.getItem("access_token") : '');
  const login = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    //check si l'utilisateur est eligible a la connexion , retour du jwt si oui
    await UserRepository.getLoginJwt(email, password)
      .then((res) => {
        if (res.data == undefined) {
          setJwt(res.access_token);
          setIsLoggedIn(true);
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("logged", "true");
          //récupération des datas de l'utilisateur
          UserRepository.getUserData(res.access_token)
            .then((res) => {
              const userResponse: UserType = {
                id: res.id,
                name: res.name,
                surname: res.surname,
                email: res.email,
                picture: res.picture,
                gender: res.gender,
                dateOfBirth: res.dateOfBirth,
                countVolume: res.countVolume,
                countVolumeRead: res.countVolumeRead,
                wishList: res.wishList,
                libraries: res.libraries,
              };
              setUser(userResponse);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        else{
            setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsFailedConnexion(true);
        console.log("connexion échoué");
      });
  };

  const logout = () => {
    setIsLoggedIn(undefined);
    setJwt(null);
    setUser({} as UserType);
    setIsFromRegister(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("logged");
    redirect('/');
  };

  const checkJwtValidity = () => {
    if (jwt) {
      const decodedToken: any = jwtDecode(jwt);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
      }
    }
  }

  const register = async (
    email: FormDataEntryValue,
    password: FormDataEntryValue,
    registerDate: string
  ) => {
    const userSave = await UserRepository.register(
      email,
      password,
      registerDate
    )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
        console.log("inscription échoué");
        return error;
      });
    return userSave;
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        login: login,
        logout: logout,
        isLoggedIn : isLoggedIn,
        jwt : jwt,
        checkJwtValidity : checkJwtValidity,
        register : register,
        setIsFromRegister : setIsFromRegister,
        setIsFailedConnexion: setIsFailedConnexion,
        isFromRegister : isFromRegister,
        isFailedConnexion: isFailedConnexion
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
