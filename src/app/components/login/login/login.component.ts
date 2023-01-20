import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForAuthenticationDto } from 'src/models/Auth/auth';
import { AuthentificationService } from 'src/services/authentification.service';
import { MatFormFieldControl } from '@angular/material/form-field';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  
  @ViewChild('back') back: ElementRef;
  
  loginForm!: FormGroup;
    private _returnUrl!: string;
    errorFlag: boolean = false;
  
    constructor(private _authService: AuthentificationService,
                private _router: Router,
                private _route: ActivatedRoute){}
  ngAfterViewInit(): void {
    this.startAnimation();
  }

    @ViewChild('inputEmail') inputEmail!: ElementRef;

    ngOnInit(): void {
      // if (this._authService.isLoggedIn()) this._router.navigate(['/typo/main']);
      this.loginForm = new FormGroup({
        email: new FormControl("", [Validators.required,
                                       Validators.email,
                                       Validators.minLength(5),
                                       Validators.maxLength(30)]),
        password: new FormControl("", [Validators.required,
                                       Validators.minLength(8),
                                       Validators.maxLength(20)])
      })
      this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
      
    }

    
    @ViewChild('invalidLogin') loginErrorMessage!: ElementRef;
    
    
    login = async (loginFormValue: any) => {
      console.log(this.loginForm);
      const login = { ...loginFormValue };
      const userForAuth: UserForAuthenticationDto = {
        email: login.email,
        password: login.password
      }
      this._authService.loginUser(userForAuth)
        .subscribe({
        next: async (res: any) => {
          localStorage.setItem("token", res.token);
          console.log('GOT IT ' + res.token);
          const role = this._authService.userRole();
          if (role == 'Student') {
            this._router.navigate(['main/studentaccount']).then(() => {
              window.location.reload();
           });
          } else if (role == 'Teacher') {
            this._router.navigate(['main/teacheraccount']).then(() => {
              window.location.reload();
            });
          } else {
            this._router.navigate(['main/adminaccount']).then(() => {
              window.location.reload();
            });
          }
          
        },
        error:
          async () => {
            await changeContent(this, 'Invalid email or password.');
            await delay(5000);
            await changeContent(this, '');
          }
      });
    }





































  startAnimation () {
    // Some random colors
  const colors = ["#FFEC86", "#A1E959", "#E3AAF8", "#F8AAAA", "#AADCF8", "#F8DDAA"];
  
  
  const numBalls = 300;
  const balls = [];
  
  for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.style.position = 'absolute';
    ball.style.borderRadius = '100%';
    ball.style.opacity = '1';
    ball.style.zIndex = '-5';
    ball.style.background = colors[Math.floor(Math.random() * colors.length)];
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random() + 5})`;
    ball.style.width = `${Math.random()}em`;
    ball.style.height = ball.style.width;

    balls.push(ball);
    this.back.nativeElement.append(ball);
  }
  
  // Keyframes
  balls.forEach((el, i, ra) => {
    let to = {
      x: Math.random() * (i % 2 === 0 ? -11 : 11),
      y: Math.random() * 12
    };
  
    let anim = el.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(${to.x}rem, ${to.y}rem)` }
      ],
      {
        duration: (Math.random() + 1) * 2500, // random duration
        direction: "alternate",
        fill: "both",
        iterations: Infinity,
        easing: "ease-in"
      }
    );
  });
}
}

 
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string) {
  obj.loginErrorMessage.nativeElement.innerHTML = `${content}`;
}