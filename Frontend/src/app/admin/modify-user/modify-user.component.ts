import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Notyf } from 'notyf';
import { MessageService } from 'src/app/message/message.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss'],
})
export class ModifyUserComponent implements OnInit {
  user: any;
  id = this.ActivatedRoute.snapshot.paramMap.get('id');
  notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
  });

  submitted = false;

  userForm = new FormGroup({});

  constructor(
    private message: MessageService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.message.getUserByIdAdmin(this.id).subscribe({
      next: (value) => {
        this.user = value.data[0];
        this.userForm.addControl('email', new FormControl(this.user.email));
        this.userForm.addControl('name', new FormControl(this.user.name));
        this.userForm.addControl(
          'sign',
          new FormControl(this.user.signup_date)
        );
        this.userForm.addControl('password', new FormControl(''));
      },
    });
  }

  updatePassword(): void {
    const data = {
      idUser: this.id,
      password: 'root',
    };
    this.message.ModifyUserPasswordAdmin(data).subscribe({
      next: (value) => {
        this.notyf.success('Modification du mot de passe réussie !');
      },
      error: (err) => {
        this.notyf.error('Modification du mot de passe echouée !');
      },
    });
  }

  removeDate(): void {
    this.message.modifyUserGrantAdmin(this.id, 'date', 0).subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }

  removeEmail(): void {
    this.message.modifyUserGrantAdmin(this.id, 'email', 0).subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }

  addDate(): void {
    this.message.modifyUserGrantAdmin(this.id, 'date', 1).subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }

  addEmail(): void {
    this.message.modifyUserGrantAdmin(this.id, 'email', 1).subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }
}
