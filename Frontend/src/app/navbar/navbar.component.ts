import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private route: Router,
    public tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    console.log(this.tokenStorage.getUser().userId);
  }

  logout(): void {
    sessionStorage.clear();
  }
}
