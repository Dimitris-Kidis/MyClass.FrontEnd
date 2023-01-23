export class AdminAboutInfo {
    fullName: string;
    dateOfBirth: string;
    createdAt: string;
    createdBy: string;

    constructor(
        fullName: string,
        dateOfBirth: string,
        createdAt: string,
        createdBy: string,
    ) {
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
    }
}