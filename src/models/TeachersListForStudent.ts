export class TeachersListForStudent {
    userId: number;
    teacherId: number;
    firstName: string;
    lastName: string;
    position: string;
    description: string;
    subject: string;
    avatar: string;

    constructor(
        userId: number,
        teacherId: number,
        firstName: string,
        lastName: string,
        position: string,
        description: string,
        subject: string,
        avatar: string
    ) {
        this.userId = userId;
        this.teacherId = teacherId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.description = description;
        this.subject = subject;
        this.avatar = avatar;
    }
}