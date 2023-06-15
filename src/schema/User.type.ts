import { DataResult } from "@remix-run/router/dist/utils";

type UserType = {
    id: number,
    name : string,
    surname: string,
    email : string,
    picture : string,
    gender : string,
    dateOfBirth: string|Date,
    countVolume : number,
    countVolumeRead: number,
    wishList : any,
    libraries : any

}

export default UserType;