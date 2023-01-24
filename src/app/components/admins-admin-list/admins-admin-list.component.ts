import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { noNumbersCharsSpaces, lowercaseLetterCheck, uppercaseLetterCheck, digitCheck, specialCharCheck } from 'src/app/shared/form-validators';
import { UpdateStudentInfoCommand } from 'src/commands/Students/UpdateStudentInfoCommand';
import { IAdminRow } from 'src/models/Admins/IAdminRow';
import { UserForRegistrationDto } from 'src/models/Auth/auth';
import { ClassWithId } from 'src/models/Classes/ClassWithId';
import { IStudentWithInfoRow } from 'src/models/Students/IStudentWithInfoRow';
import { StudentOrAdminRow } from 'src/models/Students/StudentOrAdminRow';
import { TableColumn } from 'src/models/TableColumn';
import { Filter } from 'src/pagination/Filter';
import { FilterLogicalOperators } from 'src/pagination/FilterLogicalOperators';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';
import { RequestFilters } from 'src/pagination/RequestFilters';
import { AdminService } from 'src/services/admin.service';
import { AuthentificationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-admins-admin-list',
  templateUrl: './admins-admin-list.component.html',
  styleUrls: ['./admins-admin-list.component.scss']
})
export class AdminsAdminListComponent {

  pagedUsers: PagedResult < IAdminRow > ;


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

  classesWithIds: ClassWithId[];
  adminId: number;
  ngOnInit(): void {
    this.adminId = this._authService.getUserId();
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
    this._adminService.getPagedAdminsInfo(paginatedRequest)
      .subscribe((pagedUsers: PagedResult < IAdminRow > ) => {
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
    this._adminService.deleteAdmin(id).subscribe(
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
        password: 'vU78*8uj8(KJ',
      });
    }

  }

  getUser(id: number) {
    this._adminService.getStudentOrAdmin(id).subscribe((user: StudentOrAdminRow) => {
      this.userForm.patchValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth.split('T')[0],
      });
      this.userId = user.id;
    });
  }

  saveUser(): void {
    if (this.userForm.dirty && this.userForm.valid) {
      if (this.pageTitle == 'Add') {
        const createUser: UserForRegistrationDto = {
          ...this.userForm.value,
          type: 2,
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
        const updateUser: UpdateStudentInfoCommand = {
          id: this.userId,
          email: this.userForm.value.email,
          firstName: this.userForm.value.firstName,
          lastName: this.userForm.value.lastName,
          gender: this.userForm.value.gender,
          dateOfBirth: this.userForm.value.dateOfBirth,
        };
        this._adminService.updateStudentInfo(updateUser).subscribe(
          () => this.refresh()
        );
      }
    }
  }

  refresh() {
    window.location.reload();
  }

}
