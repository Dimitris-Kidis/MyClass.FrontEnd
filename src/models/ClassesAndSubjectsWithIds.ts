export class ClassesAndSubjectsWithIds {
    classId: number;
    className: string;
    subjectId: number;
    subjectName: string;

    constructor(
        classId: number,
        className: string,
        subjectId: number,
        subjectName: string
    ) {
        this.classId = classId;
        this.className = className;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
    }
}