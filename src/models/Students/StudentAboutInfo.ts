export class StudentAboutInfo {
    fullName: string;
    dateOfBirth: string;
    className: string;
    numberOfSubjects: number;
    numberOfClassmates: number;
    numberOfTeachers: number;

    constructor(
        fullName: string,
        dateOfBirth: string,
        className: string,
        numberOfSubjects: number,
        numberOfClassmates: number,
        numberOfTeachers: number
    ) {
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.className = className;
        this.numberOfSubjects = numberOfSubjects;
        this.numberOfClassmates = numberOfClassmates;
        this.numberOfTeachers = numberOfTeachers;
    }
}