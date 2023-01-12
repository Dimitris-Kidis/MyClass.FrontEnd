export class StudentsClassmatesInfo {
    fullName: string;
    dateOfBirth: string;
    email: string;
    gender: string;

    constructor(
        fullName: string,
        dateOfBirth: string,
        email: string,
        gender: string,
    ) {
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.gender = gender;
    }
}