import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ScheduleInfo } from 'src/models/Schedules/ScheduleInfo';
import { AuthentificationService } from 'src/services/authentification.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private _commonService: CommonService
  ) {}

  info: ScheduleInfo;
  date: string;
  time: string;

  ngOnInit() {
    var dateAndTime;
    this._commonService.getScheduleInfo(this.data.id).subscribe((info: ScheduleInfo) => {
      this.info = info;
      dateAndTime = this.info?.dateAndTime.toString().split('T');
      this.date = dateAndTime[0];
      this.time = dateAndTime[1].substring(0,5);
    });
    console.log(this.data.id);
  }

}


