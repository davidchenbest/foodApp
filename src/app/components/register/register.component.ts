import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user.service';
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

  constructor(
    private userService: UserService,
    private authService: AuthGuardService
  ) {}

  ngOnInit(): void {}

  get fc() {
    return this.newUserForm.controls;
  }

  onSubmit() {
    this.userService.registerUser(this.newUserForm.value).subscribe((data) => {
      if (!data) return alert('there was an error registering');
      this.authService.login(data);
    });
  }
}
