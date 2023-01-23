import { Component, OnInit } from '@angular/core';
import { CreateScheduleCommand } from 'src/commands/Schedules/CreateScheduleCommand';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent implements OnInit {

  constructor(
    private _adminService: AdminService
  ) {}


  ngOnInit(): void {
  }

}
