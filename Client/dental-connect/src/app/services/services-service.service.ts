import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})

export class ServicesService {
    constructor(private http: HttpClient) { }

    createService(name: string, description: string, price: number, duration: number, imgURL: string) {
        return this.http.post('http://localhost:3000/services/create', { name, description, price, duration, imgURL }, { withCredentials: true })
    }

}