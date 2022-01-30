import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "../message/message.service";
import { Notyf } from 'notyf';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    }
  })

  submitted : boolean = false;

  userForm = new FormGroup({
    nom: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mdp: new FormControl('', [Validators.required]),
  });

  constructor(private message: MessageService, private route: Router) {}

  ngOnInit(): void {
  }

  onFormSubmit(){
    
    this.submitted = true;
    if(this.userForm.invalid){
      return;
    }

    const data = {
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('mdp')?.value,
      name: this.userForm.get('nom')?.value,
    };

    this.message.signup(data).subscribe({
      next: (value) => {
        console.log("test",value);
        if (value.status == "ok"){
          this.notyf.success('Inscription réussie !');
          this.route.navigateByUrl('/');
        }else {

        }
      },
      error: (err) => {
        this.notyf.error('Insciption échouée !');
      }
    })
    

    

  }

}
