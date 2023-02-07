import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  cl,
  s
} from '@fullcalendar/core/internal-common';
import {
  CreateScheduleCommand
} from 'src/commands/Schedules/CreateScheduleCommand';
import {
  ClassWithId
} from 'src/models/Classes/ClassWithId';
import {
  ScheduleInfo
} from 'src/models/Schedules/ScheduleInfo';
import {
  SubjectsWithId
} from 'src/models/Subjects/SubjectsWithId';
import {
  TeacherNameAndId
} from 'src/models/Teachers/TeacherNameAndId';
import {
  AdminService
} from 'src/services/admin.service';

@Component({
  selector: 'app-admin-lessons',
  templateUrl: './admin-lessons.component.html',
  styleUrls: ['./admin-lessons.component.scss']
})
export class AdminLessonsComponent implements OnInit {


  constructor(
    private _adminService: AdminService
  ) {}

  schedules: ScheduleInfo[];
  classesWithIds: ClassWithId[];
  subjectsWithIds: SubjectsWithId[];
  teachersWithIds: TeacherNameAndId[];

  times: string[] = [];

  ngOnInit(): void {
    var prevTime = 7;
    for (let i = 0; i < 52; i++) {
      if (i % 4 == 0) {
        prevTime++;
        if (prevTime >= 10) {
          this.times.push(`${prevTime}:00`); 
        } else {
          this.times.push(`0${prevTime}:00`); 
        }
        continue;
      }
      if (prevTime >= 10) {
        this.times.push(`${prevTime}:${(i%4)*15}`); 
      } else {
        this.times.push(`0${prevTime}:${(i%4)*15}`); 
      }
      // this.times.push();      
    }
    this._adminService.getAllSchedules().subscribe(
      (schedules: ScheduleInfo[]) => {
        this.schedules = schedules;
      }
    );

    this._adminService.getAllClassesWithIds().subscribe(
      (classes: ClassWithId[]) => {
        this.classesWithIds = classes;
      }
    );

    this._adminService.getAllSubjectsWithIds().subscribe(
      (subjects: SubjectsWithId[]) => {
        this.subjectsWithIds = subjects;
      }
    );

    this._adminService.getAllTeachersWithIds().subscribe(
      (teachers: TeacherNameAndId[]) => {
        this.teachersWithIds = teachers;
      }
    );
  }

  @ViewChild('classSelect') classSelect: ElementRef;
  @ViewChild('subjectSelect') subjectSelect: ElementRef;
  @ViewChild('teacherSelect') teacherSelect: ElementRef;
  @ViewChild('dateSelect') dateSelect: ElementRef;
  @ViewChild('timeSelect') timeSelect: ElementRef;
  @ViewChild('cabinetSelect') cabinetSelect: ElementRef;
  @ViewChild('lessonNameSelect') lessonNameSelect: ElementRef;

  deleteLesson(id: number) {
    this._adminService.deleteSchedule(id).subscribe(
      () => {
        this.refresh();
      }
    );
  }

  addLesson() {
    var classId = this.classSelect.nativeElement.value;
    var subjectId = this.subjectSelect.nativeElement.value;
    var teacherId = this.teacherSelect.nativeElement.value;
    var date = this.dateSelect.nativeElement.value;
    var time = this.timeSelect.nativeElement.value;
    var cabinet = this.cabinetSelect.nativeElement.value;
    var lessonName = this.lessonNameSelect.nativeElement.value;


    if (+classId == -1 || +subjectId == -1 || +teacherId == -1 || +time == -1 || date == "" || lessonName == "") {
      console.log('WRONG');
    } else {
      var schedule: CreateScheduleCommand = {
        classId: classId,
        subjectId: subjectId,
        teacherId: teacherId,
        dateAndTime: `${date + 'T' + time + ':00.000Z'}`,
        cabinet: cabinet,
        lessonName: lessonName
      }
      this._adminService.createSchedule(schedule).subscribe(
        () => {
          this.refresh();
        }
      );
    }
  }




  refresh() {
    window.location.reload();
  }
}
