export class ScheduleInfo {
    id: number;
    subjectName: string;
    lessonName: string;
    teacherName: string;
    className: string;
    dateAndTime: string;
    cabinet: string;

    constructor(
        id: number,
        subjectName: string,
        lessonName: string,
        teacherName: string,
        dateAndTime: string,
        className: string,
        cabinet: string
    ) {
        this.id = id;
        this.subjectName = subjectName;
        this.lessonName = lessonName;
        this.className = className;
        this.teacherName = teacherName;
        this.dateAndTime = dateAndTime;
        this.cabinet = cabinet;
    }
}