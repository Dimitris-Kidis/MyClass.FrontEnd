export class CreateImprovementCommand {
    userId: number;
    helpNote: string;

    constructor(
        userId: number,
        helpNote: string,
    ) {
        this.userId = userId;
        this.helpNote = helpNote;
    }
}