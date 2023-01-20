import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { digitCheck, lowercaseLetterCheck, specialCharCheck, uppercaseLetterCheck } from 'src/app/shared/form-validators';
import { ChangePasswordDto } from 'src/models/Auth/auth';
import { User } from 'src/models/Users/User';
import { AuthentificationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  loginForm!: FormGroup;
  user: User;
  
  constructor(private _authService: AuthentificationService,
    private _router: Router){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      oldPassword: new FormControl("", [Validators.required,
                                     Validators.minLength(8),
                                     Validators.maxLength(20),
                                     lowercaseLetterCheck,
                                     uppercaseLetterCheck,
                                     digitCheck,
                                     specialCharCheck]),
      newPassword: new FormControl("", [Validators.required,
                                      Validators.minLength(8),
                                      Validators.maxLength(20),
                                      lowercaseLetterCheck,
                                      uppercaseLetterCheck,
                                      digitCheck,
                                      specialCharCheck]),
    })
  }

  @ViewChild('invalidLogin') loginErrorMessage: ElementRef;

  changePassword = async (loginFormValue: any) => {
    const login = { ...loginFormValue };
    const id = this._authService.getUserId();
    const passData: ChangePasswordDto = {
      userId: +id,
      oldPassword: login.oldPassword,
      newPassword: login.newPassword
    }
    this._authService.changePassword(passData)
      .subscribe({
      next: async (res: any) => {
        console.log('GOT IT ', res);
        this._router.navigate(['/typo/account']).then(() => {
           window.location.reload();
        });
      },
      error:
        async () => {
          await changeContent(this, 'Password error. Check if data is correct');
          await delay(5000);
          await changeContent(this, '');
        }
    });
  }

}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string) {
  obj.loginErrorMessage.nativeElement.innerHTML = `${content}`;
}