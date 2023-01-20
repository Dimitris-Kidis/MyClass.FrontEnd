import { Component } from '@angular/core';
import { AuthentificationService } from 'src/services/authentification.service';
import { AvatarService } from 'src/services/avatar.service';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent {
  selectedFile!: File;

  constructor(
    private _authService: AuthentificationService,
    private _avatarService: AvatarService
  ) { }

  ngOnInit(): void { }

  onChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onFileSelected() {
    if (this.selectedFile) {
      this._avatarService.uploadPhoto(this.selectedFile).subscribe(() => {
        window.location.reload();
      });
    }
  }

  onDeletePhoto() {
    this._avatarService.deletePhoto().subscribe(() => {
      window.location.reload()
    });
  }
}
