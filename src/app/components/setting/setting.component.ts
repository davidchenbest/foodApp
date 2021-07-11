import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  username!: string;
  id!: number;
  setting: any;
  showAddresses: boolean = false;
  constructor(private authService: AuthGuardService) {}

  ngOnInit(): void {
    const user = this.authService.getLogginUser();
    if (!user) return;
    const { id, username, setting } = user;
    this.id = id;
    this.username = username;
    this.setting = setting;
  }

  toggleAddress() {
    return (this.showAddresses = !this.showAddresses);
  }
}
