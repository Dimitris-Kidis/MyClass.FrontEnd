export class SchedulesForStudent {
    id: number;
    subjectName: string;
    lessonName: string;
    teacherName: string;
    dateAndTime: string;
    cabinet: string;

    constructor(
        id: number,
        subjectName: string,
        lessonName: string,
        teacherName: string,
        dateAndTime: string,
        cabinet: string
    ) {
        this.id = id;
        this.subjectName = subjectName;
        this.lessonName = lessonName;
        this.teacherName = teacherName;
        this.dateAndTime = dateAndTime;
        this.cabinet = cabinet;
    }
}