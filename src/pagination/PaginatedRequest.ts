import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RequestFilters } from './RequestFilters';

export class PaginatedRequest {
    pageIndex: number;
    pageSize: number;
    columnNameForSorting: string;
    sortDirection: string;
    requestFilters: object;
    classId: number | null;
    subjectId: number | null;

    constructor(
        paginator: MatPaginator,
        sort: MatSort,
        filters: RequestFilters,
        classId: number | null,
        subjectId: number | null
        ) {
        this.pageIndex = paginator.pageIndex;
        this.pageSize = paginator.pageSize;
        this.columnNameForSorting = sort.active;
        this.sortDirection = sort.direction;            
        this.requestFilters = filters;
        this.classId = classId;
        this.subjectId = subjectId;
    }
//     constructor(pageIndex: number, pageSize: number, columnNameForSorting: string, sortDirection: string ) {
//         this.pageIndex = pageIndex;
//         this.pageSize = pageSize;
//         this.columnNameForSorting = columnNameForSorting;
//         this.sortDirection = sortDirection;
//         this.requestFilters = {};
// }

}

