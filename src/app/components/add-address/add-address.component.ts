import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {
  @Input() show!: boolean;
  @Output() addAddress: EventEmitter<Task> = new EventEmitter();
  newAddressForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private authService: AuthGuardService
  ) {}

  ngOnInit(): void {}

  get fc() {
    return this.newAddressForm.controls;
  }

  onSubmit() {
    const newAddress = this.newAddressForm.value;
    const { id } = this.authService.getLogginUser();
    if (!id) return alert('error user');
    this.userService.getUser(id).subscribe((user) => {
      user.setting?.addresses?.push(newAddress);
      this.userService.updateUser(id, user).subscribe((updateUser) => {
        if (!updateUser) return alert('error add address');
        this.addAddress.emit(newAddress);
        this.newAddressForm.reset();
        this.show = false;
      });
    });
  }
}
