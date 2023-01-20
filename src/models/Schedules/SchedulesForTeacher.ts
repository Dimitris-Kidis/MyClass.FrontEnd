export class SchedulesForTeacher {
    id: number;
    subjectName: string;
    lessonName: string;
    className: string;
    dateAndTime: string;
    cabinet: string;

    constructor(
        id: number,
        subjectName: string,
        lessonName: string,
        className: string,
        dateAndTime: string,
        cabinet: string
    ) {
        this.id = id;
        this.subjectName = subjectName;
        this.lessonName = lessonName;
        this.className = className;
        this.dateAndTime = dateAndTime;
        this.cabinet = cabinet;
    }
}