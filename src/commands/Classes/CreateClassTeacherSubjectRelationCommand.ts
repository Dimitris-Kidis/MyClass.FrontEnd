export class CreateClassTeacherSubjectRelationCommand {
    classId: number;
    subjectId: number;
    teacherId: number;

    constructor(
        classId: number,
        subjectId: number,
        teacherId: number
    ) {
        this.classId = classId;
        this.subjectId = subjectId;
        this.teacherId = teacherId;
    }
}