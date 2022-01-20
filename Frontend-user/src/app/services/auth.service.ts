import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Data } from '../data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string = '';

  constructor(private http: HttpClient) {}

  // se connecter via un email + password
  login(data: any): Observable<Data> {
    const adr: string = environment.url +'/login';
    return this.http.post<Data>(adr, data, { withCredentials: true });
  }

  finalizeAuthentication(reponse: Data) {
    if (reponse.status == 'ok') {
      this.isLoggedIn = true;
      sessionStorage.setItem('loggedIn', 'true');
    } else {
      this.isLoggedIn = false;
    }
  }

  test() {
    return this.isLoggedIn;
  }

}


