import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { SidenavMainComponent } from './components/sidenav-main/sidenav-main/sidenav-main.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    redirectTo: 'main/studentaccount',
    pathMatch: 'full'
  },
  { path: 'main', loadChildren: () => import('./components/sidenav-main/main.module').then(mod => mod.MainModule)},
  {
    path: 'main',
    component: SidenavMainComponent
  },
  {
    path: '**',
    component: LoginComponent
  },
  // {
  //   path: '/main',
  //   redirectTo: '/main/',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
