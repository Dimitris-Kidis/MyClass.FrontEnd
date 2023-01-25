export class RelationInfoRow {
    id: number;
    subjectName: string;
    teacherName: string;
    className: string;

    constructor(
        id: number,
        subjectName: string,
        teacherName: string,
        className: string,
    ) {
        this.id = id;
        this.subjectName = subjectName;
        this.teacherName = teacherName;
        this.className = className;
    }
}