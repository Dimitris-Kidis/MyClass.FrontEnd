export class ShortClassInfo {
    subjectName: string;
    className: string;
    numberOfStudents: number;

    constructor(
        subjectName: string,
        className: string,
        numberOfStudents: number,
    ) {
        this.subjectName = subjectName;
        this.className = className;
        this.numberOfStudents = numberOfStudents;
    }
}