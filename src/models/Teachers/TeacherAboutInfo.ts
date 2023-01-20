export class TeacherAboutInfo {
    fullName: string;
    dateOfBirth: string;
    numberOfSubjects: number;
    numberOfClasses: number;

    constructor(
        fullName: string,
        dateOfBirth: string,
        numberOfSubjects: number,
        numberOfClasses: number,
    ) {
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.numberOfSubjects = numberOfSubjects;
        this.numberOfClasses = numberOfClasses;
    }
}