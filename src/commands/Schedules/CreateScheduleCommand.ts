export class CreateScheduleCommand {
    subjectId: number;
    classId: number;
    teacherId: number;
    lessonName: string;
    dateAndTime: string;
    cabinet: string;

    constructor(
        subjectId: number,
        classId: number,
        teacherId: number,
        lessonName: string,
        dateAndTime: string,
        cabinet: string
    ) {
        this.subjectId = subjectId;
        this.classId = classId;
        this.teacherId = teacherId;
        this.lessonName = lessonName;
        this.dateAndTime = dateAndTime;
        this.cabinet = cabinet;
    }
}