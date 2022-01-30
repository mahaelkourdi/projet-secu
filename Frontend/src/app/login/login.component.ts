import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  submitted = false;
  errorMessage: string = '';
  isAdmin = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private route: Router,
    private auth: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('loggedIn') == 'true') {
      // get return url from route parameters or default to '/'
      this.route.navigateByUrl('/');
    }
  }
  authenticate(): void {
    this.submitted = true;
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }
    const obj: Object = {
      email: this.email,
      password: this.password,
    };

    this.auth.sendAuthentication(obj, this.isAdmin).subscribe({
      next: (value) => {
        this.tokenStorage.saveToken(value.data.token);
        this.tokenStorage.saveUser(value.data);
        this.auth.finalizeAuthentication(value);
      },
      complete: () => this.finalizeCheck(),
    });
  }

  finalizeCheck(): void {
    if (this.auth.isLoggedIn) {
      this.errorMessage = '';
      // Rajouter tous les cas
      if (this.auth.redirectUrl == '') {
        console.log(this.tokenStorage.getUser().role);
        switch (this.tokenStorage.getUser().role) {
          case 'User':
            this.route.navigateByUrl('/homeUser');
            break;
          case 'Admin':
            this.route.navigateByUrl('/homeAdmin');
            break;
        }
      } else {
        this.route.navigateByUrl(this.auth.redirectUrl);
      }
    } else {
      this.errorMessage = 'Mauvaise Combinaison';
    }
  }
}
