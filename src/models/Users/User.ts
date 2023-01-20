export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    avatar: string; 
    isAdmin: boolean;
    teacherId: number | null;
    studentId: number | null;

    constructor (
        id: number,
        email: string,
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        gender: string,
        avatar: string,
        isAdmin: boolean,
        teacherId: number | null,
        studentId: number | null
        ) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.avatar = avatar;
        this.isAdmin = isAdmin;
        this.teacherId = teacherId;
        this.studentId = studentId;
    }
    
}

export interface IUserGridRow {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string; 
    age: number;
    gender: string;
    isAdmin: boolean;
}