import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateImprovementCommand } from 'src/commands/Improvements/CreateImprovementCommand';
import { CreateNoteCommand } from 'src/commands/Notes/CreateNoteCommand';
import { Note } from 'src/models/Notes/Note';
import { AuthentificationService } from 'src/services/authentification.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {


  constructor(
    private _commonService: CommonService,
    private _authService: AuthentificationService,
    private _router: Router) {}

  @ViewChild('scroll') scroll: ElementRef;
  @ViewChild('main') main: HTMLElement;
  @ViewChild('results') results: ElementRef;
  @ViewChild('resultText') resultText: ElementRef;
  @ViewChild('noteInput') noteInput: ElementRef;
  @ViewChild('buttonText') buttonText: ElementRef;

  noteSent: boolean = false;


  noteForm!: FormGroup;

    notes: Note[] = [];

  ngOnInit(): void {
    this._commonService.getAllNotesForUser(this._authService.getUserId()).subscribe((notes: Note[]) => {
      for (let i = 0; i < notes.length; i++) {
        var dateAndTime = notes[i].createdAt.toString().split('T');
        notes[i].createdAt = 'Created At: ' + dateAndTime[0] + ', ' + dateAndTime[1].substring(0,5);
      }
      this.notes = notes;
      console.log(notes);
    });
    

    this.noteForm = new FormGroup({
      note: new FormControl("", [Validators.required,
                                     Validators.minLength(3),
                                     Validators.maxLength(600)]),
    })
  }

  submitNote = (noteFormValue: any) => {
    if (this.noteSent) return;
    this.buttonText.nativeElement.innerText = '✔';
    this.buttonText.nativeElement.style.backgroundColor = '#53d160';
    this.buttonText.nativeElement.style.color = 'white';
    
    this.noteInput.nativeElement.setAttribute('readonly', 'readonly');
    const createImprovement: CreateNoteCommand = {
      userId: this._authService.getUserId(),
      noteText: noteFormValue.note
    };
    this._commonService.createNote(createImprovement).subscribe(() => {
      this.noteSent = true;

      window.location.reload();
    });
  }
}
