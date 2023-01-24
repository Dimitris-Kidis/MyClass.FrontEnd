import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CreateClassCommand } from 'src/commands/Classes/CreateClassCommand';
import { CreateSubjectCommand } from 'src/commands/Subjects/CreateSubjectCommand';
import { ClassWithId } from 'src/models/Classes/ClassWithId';
import { SubjectsWithId } from 'src/models/Subjects/SubjectsWithId';
import { AdminService } from 'src/services/admin.service';
import { AuthentificationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-admin-relations',
  templateUrl: './admin-relations.component.html',
  styleUrls: ['./admin-relations.component.scss']
})
export class AdminRelationsComponent implements OnInit{

  constructor(
    private _authService: AuthentificationService,
    private _adminService: AdminService
  ) {}


  classesWithIds: ClassWithId[];
  subjectsWithIds: SubjectsWithId[];

  ngOnInit(): void {
    this._adminService.getAllClassesWithIds().subscribe(
      (classes: ClassWithId[]) => {
        this.classesWithIds = classes;
        console.log(classes);
      }
    );

    this._adminService.getAllSubjectsWithIds().subscribe(
      (subjects: SubjectsWithId[]) => {
        this.subjectsWithIds = subjects;
        console.log(subjects);
      }
    );
  }

  @ViewChild('subjectInput') subjectInput: ElementRef;
  @ViewChild('classInput') classInput: ElementRef;


  subject: CreateSubjectCommand = { subjectName: '' };
  class: CreateClassCommand = { className: '' };


  addSubject() {
    console.log(this.subjectInput.nativeElement.value);
    this.subject.subjectName = this.subjectInput.nativeElement.value;
    this._adminService.createSubject(this.subject).subscribe();
    this.refresh();
  }

  deleteSubject(id: number) {
    console.log(id);
    this._adminService.deleteSubject(id).subscribe();
    this.refresh();
  }

  addClass() {
    console.log(this.classInput.nativeElement.value);
    this.class.className = this.classInput.nativeElement.value;
    this._adminService.createClass(this.class).subscribe();
    this.refresh();
  }

  deleteClass(id: number) {
    console.log(id);
    this._adminService.deleteClass(id).subscribe();
    this.refresh();
  }

  refresh() {
    window.location.reload();
  }
}
