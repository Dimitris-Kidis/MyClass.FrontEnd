export class CreateNoteCommand {
    userId: number;
    noteText: string;

    constructor(
        userId: number,
        noteText: string,
    ) {
        this.userId = userId;
        this.noteText = noteText;
    }
}