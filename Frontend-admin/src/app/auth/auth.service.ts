import { Injectable } from '@angular/core';
import { Data } from '../data';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string = '';

  constructor(private message: MessageService) {}

  sendAuthentication(obj: any) {
    return this.message.login(obj);
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
