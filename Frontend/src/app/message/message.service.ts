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
    const adr: string = environment.url +'/user/login';
    return this.http.post<Data>(adr, data, { withCredentials: true });
  }

  // S'inscrire via un email + mdp 
  signup(data: any): Observable<Data> {
    const adr: string = environment.url +'/user/signup';
    return this.http.post<Data>(adr, data, { withCredentials: true });
  }
    
  // Récupérer tous les users 

  getAllUsers(id:any):Observable<Data> {
    const adr: string = environment.url +'/user/getUser/'+id;
    return this.http.get<Data>(adr, { withCredentials: true });
  }

  // Récupérer les informtations d'un utilisateur pour modifier son profil 

  getUserById(id:any):Observable<Data>{
    const adr: string = environment.url +'/user/getUserById/'+id;
    return this.http.get<Data>(adr, { withCredentials: true });
  }

  // Update les informations d'un user

  update(data: any): Observable<Data> {
    const adr: string = environment.url + '/user/update';
    return this.http.post<Data>(adr, data, { withCredentials: true });
  }

}
