export class UpdateTeacherInfoCommand {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    position: string;
    description: string;
    experience: string;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        dateOfBirth: string,
        gender: string,
        position: string,
        description: string,
        experience: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.position = position;
        this.description = description;
        this.experience = experience;
    }
}