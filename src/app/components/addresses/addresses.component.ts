import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css'],
})
export class AddressesComponent implements OnInit {
  @Input() show!: boolean;
  @Input() id!: number;
  @Input() addresses: any;
  showAddAddress!: boolean;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe((user) => {
      if (!user) return;
      const { addresses } = user.setting;
      this.addresses = addresses;
    });
  }

  toggleAddAddress() {
    this.showAddAddress = !this.showAddAddress;
  }

  addAddress(address: any) {
    this.addresses.push(address);
  }

  removeAddress(index: number) {
    this.userService.getUser(this.id).subscribe((user) => {
      if (!user) return;
      this.addresses.splice(index, 1);
      user.setting.addresses = this.addresses;
      this.userService.updateUser(this.id, user).subscribe((updateUser) => {
        if (!updateUser) return alert('error removing user from api');
      });
    });
  }
}
