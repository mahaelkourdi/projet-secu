import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/message/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  submitted = false;
  userForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
  });

  id = this.ActivatedRoute.snapshot.paramMap.get('id');

  constructor(
    private message: MessageService,
    private ActivatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.message.getUserById(this.id).subscribe({
      next: (value) => {
        console.log(value);
        this.userForm.addControl('name', new FormControl(value.data[0].name));
        this.userForm.addControl('email', new FormControl(value.data[0].email));
      },
    });
  }

  onFormSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    const data = {
      idUser: this.id,
      name: this.userForm.get('name')?.value,
      password: this.userForm.get('password')?.value,
    };

    this.message.update(data).subscribe({
      next: (value) => {
        this.notyf.success('Modification réussie !');
        this.route.navigateByUrl('/homeUser');
      },
      error: (err) => {
        this.notyf.error('Modification échouée !');
      },
    });
  }
}
