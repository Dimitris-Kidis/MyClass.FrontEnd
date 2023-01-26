import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';
import { absentRange, gradeRange, gradeRule, noLettersAllowed, noSpecialCharAllowed, onlyIntegers } from 'src/app/shared/form-validators';
import { UpdateGradeCommand } from 'src/commands/Grades/UpdateGradeCommand';
import { ClassesAndSubjectsWithIds } from 'src/models/Classes/ClassesAndSubjectsWithIds';
import { IGradeForTeacher } from 'src/models/Grades/IGradeForTeacher';
import { TableColumn } from 'src/models/TableColumn';
import { Filter } from 'src/pagination/Filter';
import { FilterLogicalOperators } from 'src/pagination/FilterLogicalOperators';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';
import { RequestFilters } from 'src/pagination/RequestFilters';
import { AuthentificationService } from 'src/services/authentification.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-teacher-grades',
  templateUrl: './teacher-grades.component.html',
  styleUrls: ['./teacher-grades.component.scss']
})
export class TeacherGradesComponent implements AfterViewInit, OnInit {

  pagedReviews: PagedResult<IGradeForTeacher>;


  tableColumns: TableColumn[] = [
    { name: 'studentName', index: 'studentName', displayName: 'Student', useInSearch: true},
    { name: 'gradeOne', index: 'gradeOne', displayName: 'Att. 1'},
    { name: 'gradeTwo', index: 'gradeTwo', displayName: 'Att. 2'},
    { name: 'gradeThree', index: 'gradeThree', displayName: 'Individ. Work'},
    { name: 'gradeFour', index: 'gradeFour', displayName: 'Current'},
    { name: 'average', index: 'average', displayName: 'Average'},
    { name: 'labs', index: 'labs', displayName: 'Lab Abs.'},
    { name: 'seminars', index: 'seminars', displayName: 'Sem Abs.'},
    { name: 'courses', index: 'courses', displayName: 'Course Abs.'},
    { name: 'total', index: 'total', displayName: 'Toltal Abs.'},
    { name: 'id', index: 'id', displayName: 'Id' },
  ];

  displayedColumns: string[];

  searchInput = new FormControl('');
  filterForm: FormGroup;

  requestFilters: RequestFilters;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;

  constructor(
    private _teacherService: TeacherService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthentificationService
  ) {
    this.displayedColumns = this.tableColumns.map(column => column.name);
  }

  ngAfterContentInit(): void {
  }

  currentClassId: number;
  currentSubjectId: number;

  downloadLink!: string;

  ngAfterViewInit() {
    
    this.loadPagedReviews();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadPagedReviews();
    });
  }

  pairs: ClassesAndSubjectsWithIds[];
  ngOnInit(): void {
    this._teacherService.getAllClassesAndSubjectsWithTheirIds(this._authService.getUserId()).subscribe((pairs: ClassesAndSubjectsWithIds[]) => {
      this.pairs = pairs;
      this.currentClassId = this.pairs[0].classId;
      console.log(this.currentClassId);
      this.currentSubjectId = this.pairs[0].subjectId;

      
    });

    
  }

  @ViewChild('downloadButton') dowbloadButton: ElementRef;
  @ViewChild('list') list: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;

  getSelectedValue(value: any) {
    console.log(this.pagination.nativeElement);
    this.pagination.nativeElement.classList.remove('invisible');
    if (value.target.value == 0) {
      this.dowbloadButton.nativeElement.classList.add('hidden')
      return;
    } else {
      this.dowbloadButton.nativeElement.classList.remove('hidden')

    }

    var classIdAndSubjectId = (value.target.value).toString().split(',');
    this.currentClassId = classIdAndSubjectId[0];
    this.currentSubjectId = classIdAndSubjectId[1];

    this._teacherService.getTeacherPrintSheet(this._authService.getUserId(), this.currentClassId).subscribe((obj: any) => {
      this.downloadLink = obj.url;
    });
    this.loadPagedReviews();
  }

  loadPagedReviews() {
    if (!this.currentClassId || !this.currentSubjectId) return;
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort!, this.requestFilters, this.currentClassId, this.currentSubjectId);
    this._teacherService.getPagedStudentsWithGrades(paginatedRequest)
      .subscribe((pagedReviews: PagedResult<IGradeForTeacher>) => {
        this.pagedReviews = pagedReviews;
      });
  }

  hideList() {
    this.list.nativeElement.classList.add('hidden');
  }

  applySearch() {
    this.createFiltersFromSearchInput();
    this.loadPagedReviews();
  }

  resetGrid() {
    this.requestFilters = {filters: [], logicalOperator: FilterLogicalOperators.And};
    this.loadPagedReviews();
  }

  filterBooksFromForm() {
    this.createFiltersFromForm();
    this.loadPagedReviews();
  }

  private createFiltersFromForm() {
    if (this.filterForm.value) {
      const filters: Filter[] = [];

      Object.keys(this.filterForm.controls).forEach(key => {
        const controlValue = this.filterForm.controls[key].value;
        if (controlValue) {
          const foundTableColumn = this.tableColumns.find(tableColumn => tableColumn.name === key);
          const filter: Filter = { path : foundTableColumn!.index, value : controlValue }; // добавил !
          filters.push(filter);
        }
      });

      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.And,
        filters
      };
    }
  }

  private createFiltersFromSearchInput() {
    const filterValue = this.searchInput.value!.trim(); // добавил !
    if (filterValue) {
      const filters: Filter[] = [];
      this.tableColumns.forEach(column => {
        if (column.useInSearch) {
          const filter: Filter = { path : column.index, value : filterValue };
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

  // -------------------

  // showed: boolean = false;
  pageTitle: string;
  public reviewForm: FormGroup;
  paginationFlag = true;
  reviewId: number;

  hidePagination(mode: string, id: number){
    this.hideList();
    

    this.paginationFlag = false;
    if (mode == 'Edit') {
      this.reviewId = id;
      console.log(id);
      
    
        this.getReview(id);
      
      this.pageTitle = 'Edit'
    } else if (mode == 'Add') {
      this.pageTitle = 'Add'
    }
    this.editReview(id);
  }

  editReview(id: number) {
    this.reviewForm = new FormGroup({
      gradeOne: new FormControl("", [Validators.required,
        gradeRule,
        gradeRange
         ]),
      gradeTwo: new FormControl("", [Validators.required,
        gradeRule,
        gradeRange
                                ]),
      gradeThree: new FormControl("", [Validators.required,gradeRule,
        gradeRange]),
      gradeFour: new FormControl("", [Validators.required,gradeRule,
        gradeRange]),
      labs: new FormControl("", [Validators.required,
                                  absentRange,
                                  onlyIntegers,
                                  
                                  ]),
      seminars: new FormControl("", [Validators.required,
                                      absentRange,
                                      onlyIntegers,]),
      courses: new FormControl("", [Validators.required,
                                    absentRange,
                                    onlyIntegers,]),
    })

    
  }

  getReview(id: number) {
    this._teacherService.getGradeLine(id).subscribe((rev: IGradeForTeacher) => {
      this.reviewForm.patchValue({
        id: rev.id,
        studentName: rev.studentName,
        gradeOne: rev.gradeOne,
        gradeTwo: rev.gradeTwo,
        gradeThree: rev.gradeThree,
        gradeFour: rev.gradeFour,
        seminars: rev.seminars,
        courses: rev.courses,
        labs: rev.labs
      });
      this.reviewId = rev.id;
    });
  }

  @ViewChild('invalid') errorMessage!: ElementRef;
  saveReview(): void {
    if (false) {
      


      console.log('fff');
      } else if (this.pageTitle == 'Edit') {
        console.log('lllll');
        const updateReview: UpdateGradeCommand = {
          id: this.reviewId,
          ...this.reviewForm.value
        };

        this._teacherService.updateGrade(updateReview).subscribe({
          next: () => {
            this.onSaveComplete();
          },
          error:
            async () => {
              console.log('eerrr');
              await changeContent(this, 'Invalid text id or user id.');
              await delay(5000);
              await changeContent(this, '');
            }
        });
      }
        

       
    
  }

  onSaveComplete(): void {
    window.location.reload();
  }

  refresh() {
    window.location.reload();
  }

  setting(){
    // this.sort.active = "Id";
  }
}


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string) {
  obj.errorMessage.nativeElement.innerHTML = `${content}`;
}