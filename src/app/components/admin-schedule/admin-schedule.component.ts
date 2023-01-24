import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import { SchedulesForStudent } from 'src/models/Schedules/SchedulesForStudent';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';
import { DialogComponent } from '../student-schedule/dialog/dialog.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AdminService } from 'src/services/admin.service';
import { ScheduleInfo } from 'src/models/Schedules/ScheduleInfo';


@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.scss']
})
export class AdminScheduleComponent {

  constructor(
    private _adminService: AdminService,
    private _authService: AuthentificationService,
    public dialog: MatDialog
  ) {}


  schedules: ScheduleInfo[];

  calendarOptions: CalendarOptions= {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    eventClick: this.openEvent.bind(this),
    events: []
  };

  events: { Id: number; title: string; start: Date}[] = [];

  role: string;
  ngOnInit(): void {
      this._adminService.getAllSchedules().subscribe((schedules: ScheduleInfo[]) => {
        this.schedules = schedules;
        console.log(schedules);
        this.setAllEvents();
      });
      this.role = this._authService.userRole();
  }
  
  setAllEvents(): void {
    console.log(this.schedules);
    for (let i = 0; i < this.schedules.length; i++) {
      this.events.push({
        Id: this.schedules[i].id, 
        title: `${this.schedules[i].subjectName}` + `${this.role == 'Admin' ? `, ${this.schedules[i].className}` : ''}`, 
        start: new Date(this.schedules[i].dateAndTime)
    });
    }
    this.calendarOptions.events = this.events;
  }


  openEvent(arg: any) {
    this.dialog.open(DialogComponent, {
      data: {
        id: arg.event._def.extendedProps.Id,
      },
    });
  }
}

