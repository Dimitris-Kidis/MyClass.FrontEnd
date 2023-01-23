import {
  Component,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  MatSort
} from '@angular/material/sort';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  merge
} from 'rxjs';
import {
  ageRange,
  digitCheck,
  lowercaseLetterCheck,
  noLettersAllowed,
  noNumbersCharsSpaces,
  specialCharCheck,
  uppercaseLetterCheck
} from 'src/app/shared/form-validators';
import {
  UpdateTeacherInfoCommand
} from 'src/commands/Teachers/UpdateTeacherInfoCommand';
import {
  UserForRegistrationDto
} from 'src/models/Auth/auth';
import {
  TableColumn
} from 'src/models/TableColumn';
import {
  ITeacherWithInfoRow
} from 'src/models/Teachers/ITeacherWithInfoRow';
import {
  TeacherRow
} from 'src/models/Teachers/TeacherRow';
import {
  User
} from 'src/models/Users/User';
import {
  Filter
} from 'src/pagination/Filter';
import {
  FilterLogicalOperators
} from 'src/pagination/FilterLogicalOperators';
import {
  PagedResult
} from 'src/pagination/PagedResult';
import {
  PaginatedRequest
} from 'src/pagination/PaginatedRequest';
import {
  RequestFilters
} from 'src/pagination/RequestFilters';
import {
  AdminService
} from 'src/services/admin.service';
import {
  AuthentificationService
} from 'src/services/authentification.service';

@Component({
  selector: 'app-admins-teacher-list',
  templateUrl: './admins-teacher-list.component.html',
  styleUrls: ['./admins-teacher-list.component.scss']
})
export class AdminsTeacherListComponent {

  pagedUsers: PagedResult < ITeacherWithInfoRow > ;


  tableColumns: TableColumn[] = [{
      name: 'firstName',
      index: 'firstName',
      displayName: 'FirstName',
      useInSearch: true
    },
    {
      name: 'lastName',
      index: 'lastName',
      displayName: 'LastName',
      useInSearch: true
    },
    {
      name: 'email',
      index: 'email',
      displayName: 'Email',
      useInSearch: true
    },
    {
      name: 'dateOfBirth',
      index: 'dateOfBirth',
      displayName: 'Birth Date'
    },
    {
      name: 'gender',
      index: 'gender',
      displayName: 'Gender'
    },
    {
      name: 'signedUpAt',
      index: 'signedUpAt',
      displayName: 'Joined'
    },
    {
      name: 'numberOfSubjects',
      index: 'numberOfSubjects',
      displayName: 'Subjects'
    },
    {
      name: 'numberOfClasses',
      index: 'numberOfClasses',
      displayName: 'Classes'
    },
    {
      name: 'position',
      index: 'position',
      displayName: 'Position',
      useInSearch: true
    },
    {
      name: 'description',
      index: 'description',
      displayName: 'Description'
    },
    {
      name: 'experience',
      index: 'experience',
      displayName: 'Experience',
      useInSearch: true
    },
    {
      name: 'id',
      index: 'id',
      displayName: 'Id'
    }
  ];


  displayedColumns: string[];

  searchInput = new FormControl('');
  filterForm: FormGroup;

  requestFilters: RequestFilters;

  @ViewChild(MatPaginator, {
    static: false
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: false
  }) sort: MatSort;

  constructor(
    private _adminService: AdminService,
    private _authService: AuthentificationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    this.displayedColumns = this.tableColumns.map(column => column.name);
  }

  ngAfterViewInit() {
    this.loadPagedUsers();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadPagedUsers();
    });
  }

  loadPagedUsers() {
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters, null, null);
    this._adminService.getPagedTeachersInfo(paginatedRequest)
      .subscribe((pagedUsers: PagedResult < ITeacherWithInfoRow > ) => {
        this.pagedUsers = pagedUsers;
        console.log(this.pagedUsers);
      });
  }

  applySearch() {
    this.createFiltersFromSearchInput();
    this.loadPagedUsers();
  }

  resetGrid() {
    this.requestFilters = {
      filters: [],
      logicalOperator: FilterLogicalOperators.And
    };
    this.loadPagedUsers();
  }

  filterUsersFromForm() {
    this.createFiltersFromForm();
    this.loadPagedUsers();
  }

  private createFiltersFromForm() {
    if (this.filterForm.value) {
      const filters: Filter[] = [];

      Object.keys(this.filterForm.controls).forEach(key => {
        const controlValue = this.filterForm.controls[key].value;
        if (controlValue) {
          const foundTableColumn = this.tableColumns.find(tableColumn => tableColumn.name === key);
          const filter: Filter = {
            path: foundTableColumn!.index,
            value: controlValue
          };
          filters.push(filter);
        }
      });

      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.And,
        filters
      };
    }
  }

  deleteDialog(id: number) {
    this._adminService.deleteTeacher(id).subscribe(
      () => {
        this.loadPagedUsers();
      });
  }


  private createFiltersFromSearchInput() {
    const filterValue = this.searchInput.value!.trim();
    if (filterValue) {
      const filters: Filter[] = [];
      this.tableColumns.forEach(column => {
        if (column.useInSearch) {
          const filter: Filter = {
            path: column.index,
            value: filterValue
          };
          filters.push(filter);
        }
      });
      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.Or,
        filters
      };
    } else {
      this.resetGrid();
    }
  }

  pageTitle: string;
  public userForm: FormGroup;
  paginationFlag = true;
  userId: number;
  pass: string;

  hidePagination(mode: string, id: number) {
    this.paginationFlag = false;
    if (mode == 'Edit') {
      this.userId = id;
      this.getUser(id);
      this.pageTitle = 'Edit'
    } else if (mode == 'Add') {
      this.pageTitle = 'Add'
    }
    this.editUser(id);
  }

  editUser(id: number) {
    this.userForm = new FormGroup({
      firstName: new FormControl("", [Validators.required,
        noNumbersCharsSpaces,
        Validators.minLength(2),
        Validators.maxLength(30),
        noNumbersCharsSpaces
      ]),
      lastName: new FormControl("", [Validators.required,
        noNumbersCharsSpaces,
        Validators.minLength(2),
        Validators.maxLength(30),
        noNumbersCharsSpaces
      ]),
      email: new FormControl("", [Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      dateOfBirth: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      position: new FormControl("", [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      experience: new FormControl("", [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      description: new FormControl("", [Validators.required,
        Validators.minLength(50),
        Validators.maxLength(400)
      ]),
      password: new FormControl("", [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        lowercaseLetterCheck,
        uppercaseLetterCheck,
        digitCheck,
        specialCharCheck
      ]),
    })
    if (this.pageTitle == 'Edit') {
      this.userForm.patchValue({
        password: 'vU78*8uj8(KJ'
      });
    }

  }

  getUser(id: number) {
    this._adminService.getTeacher(id).subscribe((user: TeacherRow) => {
      this.userForm.patchValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth.split('T')[0],
        position: user.position,
        description: user.description,
        experience: user.experience,
      });
      this.userId = user.id;
    });
  }

  saveUser(): void {
    if (this.userForm.dirty && this.userForm.valid) {
      if (this.pageTitle == 'Add') {
        const createUser: UserForRegistrationDto = {
          ...this.userForm.value,
          type: 1
        }
        if (`${createUser.isAdmin}` == 'true') {
          createUser.isAdmin = true;
        } else {
          createUser.isAdmin = false;
        }
        this._authService.registerUser(createUser).subscribe(
          () => this.refresh()
        );

      } else if (this.pageTitle == 'Edit') {
        const updateUser: UpdateTeacherInfoCommand = {
          id: this.userId,
          email: this.userForm.value.email,
          firstName: this.userForm.value.firstName,
          lastName: this.userForm.value.lastName,
          gender: this.userForm.value.gender,
          dateOfBirth: this.userForm.value.dateOfBirth,
          position: this.userForm.value.position,
          description: this.userForm.value.description,
          experience: this.userForm.value.experience,
        };
        this._adminService.updateTeacherInfo(updateUser).subscribe(
          () => this.refresh()
        );
      }
    }
  }

  refresh() {
    window.location.reload();
  }

}
