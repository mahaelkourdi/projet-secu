import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth : AuthService, private route : Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    sessionStorage.removeItem('loggedIn');
    this.route.navigateByUrl('/se-connecter');
    this.auth.isLoggedIn= false;
  }

}
