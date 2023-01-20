import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateImprovementCommand } from 'src/commands/Improvements/CreateImprovementCommand';
import { AuthentificationService } from 'src/services/authentification.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-improvement-window',
  templateUrl: './improvement-window.component.html',
  styleUrls: ['./improvement-window.component.scss']
})
export class ImprovementWindowComponent {


  constructor(
    private _commonService: CommonService,
    private _authService: AuthentificationService,
    private _router: Router) {}

  @ViewChild('scroll') scroll: ElementRef;
  @ViewChild('main') main: HTMLElement;
  @ViewChild('results') results: ElementRef;
  @ViewChild('resultText') resultText: ElementRef;
  @ViewChild('improvementInput') improvementInput: ElementRef;
  @ViewChild('buttonText') buttonText: ElementRef;

  improvementSent: boolean = false;


  improvementForm!: FormGroup;

  ngOnInit(): void {
    this.improvementForm = new FormGroup({
      improvement: new FormControl("", [Validators.required,
                                     Validators.minLength(50),
                                     Validators.maxLength(300)]),
    })
  }


  submitImprovement = (improvementFormValue: any) => {
    this.buttonText.nativeElement.innerText = '✔';
    this.buttonText.nativeElement.style.backgroundColor = '#53d160';
    this.buttonText.nativeElement.style.color = 'white';
    if (this.improvementSent) return;
    this.improvementInput.nativeElement.setAttribute('readonly', 'readonly');
    const createImprovement: CreateImprovementCommand = {
      userId: this._authService.getUserId(),
      helpNote: improvementFormValue.improvement
    };
    this._commonService.createImprovement(createImprovement).subscribe();
    this.improvementSent = true;
  }

}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}