import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../data';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  // se connecter via un email + password
  login(data: any): Observable<Data> {
    const adr: string = environment.url + '/user/login';
    return this.http.post<Data>(adr, data, { withCredentials: true });
  }

  // se connecter via un email + password
  loginAdmin(data: any): Observable<Data> {
    const adr: string = environment.url + '/admin/login';
    return this.http.post<Data>(adr, data, { withCredentials: true });
  }

  // S'inscrire via un email + mdp + name
  signup(data: any): Observable<Data> {
    const adr: string = environment.url + '/user/signup';
    return this.http.post<Data>(adr, data, { withCredentials: true });
  }

  // Récupérer tous les users

  getAllUsers(id: any): Observable<Data> {
    const adr: string = environment.url + '/user/getUser/' + id;
    return this.http.get<Data>(adr, { withCredentials: true });
  }

  // Récupérer les informtations d'un utilisateur pour modifier son profil

  getUserById(id: any): Observable<Data> {
    const adr: string = environment.url + '/user/getUserById/' + id;
    return this.http.get<Data>(adr, { withCredentials: true });
  }

  // Update les informations d'un user

  update(data: any): Observable<Data> {
    const adr: string = environment.url + '/user/update';
    return this.http.post<Data>(adr, data, { withCredentials: true });
  }

  // clôturer le compte 

  deleteAccount(id: any):Observable<Data> {
    const adr: string = environment.url + '/user/delete/' + id;
    return this.http.delete<Data>(adr, { withCredentials: true });
  }

  getAllUserAdmin(id: any): Observable<Data> {
    const adr: string = environment.url + '/admin/getUser/' + id;
    return this.http.get<Data>(adr, { withCredentials: true });
  }

  deleteUserAdmin(id: any): Observable<Data> {
    const adr: string = environment.url + '/admin/deleteUser/' + id;
    return this.http.delete<Data>(adr, { withCredentials: true });
  }

  createUser(data: any): Observable<Data> {
    const adr: string = environment.url + '/admin/setUser';
    return this.http.post<Data>(adr, data, { withCredentials: true });
  }

  getUserByIdAdmin(id: any): Observable<Data> {
    const adr: string = environment.url + '/admin/getUserById/' + id;
    return this.http.get<Data>(adr, { withCredentials: true });
  }

  ModifyUserPasswordAdmin(data: any): Observable<Data> {
    const adr: string = environment.url + '/admin/update/';
    return this.http.patch<Data>(adr, data, { withCredentials: true });
  }

  modifyUserGrantAdmin(
    idUser: any,
    privilege: any,
    value: any
  ): Observable<Data> {
    const adr: string =
      environment.url + `/admin/grant/${idUser}/${privilege}/${value}`;
    return this.http.patch<Data>(adr, { withCredentials: true });
  }


}
