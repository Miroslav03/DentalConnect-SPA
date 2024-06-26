import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Services } from "../types/serviceTypes";



@Injectable({
    providedIn: 'root'
})

export class ServicesService {


    constructor(private http: HttpClient) { }

    createService(name: string, description: string, price: number, duration: number, imgURL: string) {
        return this.http.post('http://localhost:3000/services/create', { name, description, price, duration, imgURL }, { withCredentials: true });
    }

    getAll() {
        return this.http.get<Services[]>('http://localhost:3000/services/all', { withCredentials: true })
    }

    getOne(serviceId: string) {
        return this.http.get<Services>(`http://localhost:3000/services/${serviceId}`, { withCredentials: true });
    }

    editService(name: string, description: string, price: number, duration: number, imgURL: string, serviceId: string) {
        return this.http.put(`http://localhost:3000/services/${serviceId}`, { name, description, price, duration, imgURL }, { withCredentials: true });
    }

    deleteService(serviceId: string) {
        return this.http.delete(`http://localhost:3000/services/${serviceId}`, { withCredentials: true });
    }

    getAllForDoctor(doctorId: string) {
        return this.http.get(`http://localhost:3000/services/doctor/all/${doctorId}`, { withCredentials: true });
    }

    getAllForUser(userId: string) {
        return this.http.get(`http://localhost:3000/services/user/all/${userId}`, { withCredentials: true });
    }

    buyService(serviceId: string, userId: string, ownerId: string) {
        return this.http.post(`http://localhost:3000/services/buy/${userId}`, { serviceId, ownerId }, { withCredentials: true });

    }
}
