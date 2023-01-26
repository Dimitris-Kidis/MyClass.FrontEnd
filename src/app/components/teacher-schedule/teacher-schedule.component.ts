import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import { SchedulesForStudent } from 'src/models/Schedules/SchedulesForStudent';
import { SchedulesForTeacher } from 'src/models/Schedules/SchedulesForTeacher';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';
import { DialogComponent } from '../student-schedule/dialog/dialog.component';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.scss']
})
export class TeacherScheduleComponent {

  constructor(
    private _teacherService: TeacherService,
    private _authService: AuthentificationService,
    public dialog: MatDialog
  ) {}


  schedules: SchedulesForTeacher[];

  calendarOptions: CalendarOptions= {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    eventClick: this.openEvent.bind(this),
    events: []
  };

  events: { Id: number; title: string; start: Date}[] = [];

  ngOnInit(): void {
      this._teacherService.getSchedulesForTeacher(this._authService.getUserId()).subscribe((schedules: SchedulesForTeacher[]) => {
        this.schedules = schedules;
        this.setAllEvents();
      });
  }
  
  setAllEvents(): void {
    console.log(this.schedules);
    for (let i = 0; i < this.schedules.length; i++) {
      this.events.push({
        Id: this.schedules[i].id, 
        title: `${this.schedules[i].subjectName}, ${this.schedules[i].className}`, 
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
