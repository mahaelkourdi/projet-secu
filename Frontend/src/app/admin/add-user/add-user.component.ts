import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/message/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  submitted = false;
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
  });

  constructor(
    private message: MessageService,
    private ActivatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {}

  onFormSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    const data = {
      name: this.userForm.get('name')?.value,
      password: this.userForm.get('password')?.value,
      email: this.userForm.get('email')?.value,
    };

    console.log(data);

    this.message.createUser(data).subscribe({
      next: (value) => {
        console.log(value);
        this.notyf.success('Création réussie !');
        this.route.navigateByUrl('/homeAdmin');
      },
      error: (err) => {
        this.notyf.error('Création échouée !');
      },
    });
  }
}
