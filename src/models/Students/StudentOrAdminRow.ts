export class StudentOrAdminRow {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    gender: string;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        dateOfBirth: string,
        gender: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
    }
}