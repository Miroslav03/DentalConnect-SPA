import { DoctorType, UserType } from "./authTypes";

export interface Services {
    _id:string,
    name: string,
    description: string,
    price: number,
    duration: number,
    imgURL: string,
    owner: DoctorType,
    signed: UserType[],
}