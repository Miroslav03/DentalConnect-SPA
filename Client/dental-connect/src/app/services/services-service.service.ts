import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription, tap } from "rxjs";
import { Services } from "../types/serviceTypes";



@Injectable({
    providedIn: 'root'
})

export class ServicesService implements OnDestroy {

    private services$$ = new BehaviorSubject<Services[]>([]);
    private services$ = this.services$$.asObservable();

    services: Services[] = [];

    serviceSubscribtion: Subscription;

    constructor(private http: HttpClient) {
        this.serviceSubscribtion = this.services$.subscribe((services) => {
            this.services = services;
        })
    }

    createService(name: string, description: string, price: number, duration: number, imgURL: string) {
        return this.http.post('http://localhost:3000/services/create', { name, description, price, duration, imgURL }, { withCredentials: true });
    }

    getAll() {
        return this.http.get<Services[]>('http://localhost:3000/services/all', { withCredentials: true }).pipe(tap((services) => {
            this.services$$.next(services);
        }));
    }


    ngOnDestroy(): void {
        this.serviceSubscribtion.unsubscribe();
    }

}