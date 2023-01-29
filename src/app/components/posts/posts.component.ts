import { Component, OnInit, ViewChild } from '@angular/core';
import { CreatePostCommand } from 'src/commands/Posts/CreatePostCommand';
import { Post } from 'src/models/Posts/Post';
import { PostRow } from 'src/models/Posts/PostRow';
import { AdminService } from 'src/services/admin.service';
import { AuthentificationService } from 'src/services/authentification.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(
    private _commonService: CommonService,
    private _authService: AuthentificationService,
    private _adminService: AdminService
  ) {}

  @ViewChild('form') form: any;


  @ViewChild('text') text: any;
  @ViewChild('header') header: any;
  @ViewChild('author') author: any;


  addFlag: boolean = false;
  editFlag: boolean = false;

  posts: Post[] = [];

  role: string;

  ngOnInit(): void {
    this.role = this._authService.userRole();
    const target: number = 
          this.role == 'Student' ? 1 
          : (this.role == 'Teacher' ? 2 : 4);
    this._commonService.getAllPostsByTargetNumber(target).subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
  }

  deletePost(id: number) {
    this._adminService.deletePost(id).subscribe();
    this.refresh();
    console.log(id);
  }

  refresh() {
    window.location.reload();
  }

  addPost() {
    this.addFlag = true;
  }

  post() {
    var checkedTarget: number = -1;
    for (let i = 0; i < 3; i++) {
      if(this.form.nativeElement[i].checked) {
        checkedTarget = i+1;
      }      
    }

    var post: CreatePostCommand = {
      text: this.text.nativeElement.value,
      author: this.author.nativeElement.value,
      header: this.header.nativeElement.value,
      target: checkedTarget,
      userId: this._authService.getUserId()
    };

    if (
      checkedTarget == -1 ||
      this.text.nativeElement.value === "" ||
      this.author.nativeElement.value === "" ||
      this.header.nativeElement.value === "" 
      ) {
      
    } else {
      this._adminService.createPost(post).subscribe(
        () => {
          this.refresh();
        }
      );
    }
  }

  postId: number;
  editPost(id: number) {
    this.editFlag = true;
    this.addFlag = true;
    this._adminService.getPost(id).subscribe(
      (post: PostRow) => {
        this.postId = id;
        this.text.nativeElement.value = post.text;
        this.author.nativeElement.value = post.author;
        this.header.nativeElement.value = post.header;
        this.form.nativeElement[post.target - 1].checked = true;
        console.log('s;elk ' + post.target);
      }
    );
  }

  updatePost() {
    var checkedTarget: number = -1;
    for (let i = 0; i < 3; i++) {
      if(this.form.nativeElement[i].checked) {
        checkedTarget = i+1;
      }      
    }

    var post: PostRow = {
      id: this.postId,
      text: this.text.nativeElement.value,
      author: this.author.nativeElement.value,
      header: this.header.nativeElement.value,
      target: checkedTarget
    };

    if (
      checkedTarget == -1 ||
      this.text.nativeElement.value === "" ||
      this.author.nativeElement.value === "" ||
      this.header.nativeElement.value === "" 
      ) {
      
    } else {
      this._adminService.updatePost(post).subscribe(
        () => {
          this.refresh();
        }
      );
    }
  }
}
