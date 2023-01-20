import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { SchedulesForStudent } from 'src/models/Schedules/SchedulesForStudent';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.scss']
})
export class StudentScheduleComponent implements OnInit{

  constructor(
    private _studService: StudentService,
    private _authService: AuthentificationService,
    public dialog: MatDialog
  ) {}


  schedules: SchedulesForStudent[];

  calendarOptions: CalendarOptions= {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    eventClick: this.openEvent.bind(this),
    events: []
  };

  events: { Id: number; title: string; start: Date}[] = [];

  ngOnInit(): void {
      this._studService.getSchedulesForStudent(this._authService.getStudentsClassId()).subscribe((schedules: SchedulesForStudent[]) => {
        this.schedules = schedules;
        console.log(schedules);
        this.setAllEvents();
      });
  }
  
  setAllEvents(): void {
    console.log(this.schedules);
    for (let i = 0; i < this.schedules.length; i++) {
      this.events.push({
        Id: this.schedules[i].id, 
        title: `${this.schedules[i].subjectName}`, 
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



// objs: object[];
//   ngOnInit(): void {
//     this._studService.getSchedulesForStudent(this._authService.getStudentsClassId()).subscribe((schds: SchedulesForStudent[]) => {
//       this.schedules = schds;
//       console.log(schds);
//       for (let i = 0; i < schds.length; i++) {
//         const event = {Id: schds[i].id, title: `${schds[i].subjectName}`, start: new Date(schds[i].dateAndTime)};
//       }
//       this.calendarOptions = {
//         plugins: [dayGridPlugin],
//         initialView: 'dayGridMonth',
//         weekends: true,
//         eventClick: this.openEvent.bind(this),
//         events: [
//           { title: 'Meeting', start: new Date() },
//           { Id: 1111, title: 'Meeting', start: new Date(2023, 0, 16, 12, 30)},
//         ]
//       };
//     });
//   }
//   calendarOptions: CalendarOptions;