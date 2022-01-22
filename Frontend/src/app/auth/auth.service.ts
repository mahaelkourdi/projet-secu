import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Data } from '../data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string = '';

  constructor(private message: MessageService) {}

  sendAuthentication(obj: any, role: any) {
    if (role) {
      return this.message.loginAdmin(obj);
    } else {
      return this.message.login(obj);
    }
  }

  finalizeAuthentication(reponse: Data) {
    if (reponse.status == 'ok') {
      this.isLoggedIn = true;
      sessionStorage.setItem('loggedIn', 'true');
    } else {
      this.isLoggedIn = false;
    }
  }
  // Tester si l'utilisateur est connecté
  test() {
    return this.isLoggedIn;
  }
}
