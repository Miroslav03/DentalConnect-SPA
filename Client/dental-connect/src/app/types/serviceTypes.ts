import { DoctorType, UserType } from "./authTypes";

export interface Services {
    name: string,
    description: string,
    price: number,
    duration: number,
    imgURL: string,
    owner: DoctorType,
    signed: UserType[],
}