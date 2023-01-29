export class PostRow {
    id: number;
    text: string;
    header: string;
    author: string;
    target: number;

    constructor(
        id: number,
        text: string,
        header: string,
        author: string,
        target: number
    ) {
        this.id = id;
        this.text = text;
        this.header = header;
        this.author = author;
        this.target = target;
    }
}