import { Component, OnInit } from '@angular/core';
import { ImprovementListItem } from 'src/models/Improvements/ImprovementListItem';
import { AdminService } from 'src/services/admin.service';
import { AuthentificationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-all-improvements',
  templateUrl: './all-improvements.component.html',
  styleUrls: ['./all-improvements.component.scss']
})
export class AllImprovementsComponent implements OnInit{

  constructor(
    private _authService: AuthentificationService,
    private _adminService: AdminService
  ){}

  improvements: ImprovementListItem[];

  ngOnInit(): void {
    this._adminService.getAllImprovements().subscribe((improvements: ImprovementListItem[]) => {
      this.improvements = improvements;
    });
  }


  show(info: any) {
    console.log(info);
  }
}
