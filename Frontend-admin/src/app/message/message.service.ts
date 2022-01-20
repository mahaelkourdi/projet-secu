import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Data} from "../data";
import {environment} from "../../environments/environment";
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  // se connecter via un email + password
  login(data: any): Observable<Data> {
    const adr: string = environment.url +'/login';
    return this.http.post<Data>(adr, data, { withCredentials: true });
  }


}
