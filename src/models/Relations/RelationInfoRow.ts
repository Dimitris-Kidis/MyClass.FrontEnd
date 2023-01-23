export class RelationInfoRow {
    subjectName: string;
    teacherName: string;
    className: string;

    constructor(
        subjectName: string,
        teacherName: string,
        className: string,
    ) {
        this.subjectName = subjectName;
        this.teacherName = teacherName;
        this.className = className;
    }
}