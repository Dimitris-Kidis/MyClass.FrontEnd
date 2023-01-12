export class Note {
    id: number;
    noteText: string;
    createdAt: string;

    constructor(
        id: number,
        noteText: string,
        createdAt: string,
    ) {
        this.id = id;
        this.noteText = noteText;
        this.createdAt = createdAt;
    }
}