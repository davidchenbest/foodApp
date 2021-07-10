import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordMatch } from 'src/app/validators/passwordMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  newUserForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: PasswordMatch.MatchPassword }
  );

  constructor() {}

  ngOnInit(): void {}

  get fc() {
    return this.newUserForm.controls;
  }

  onSubmit() {
    console.log(this.newUserForm.value);
  }
}
