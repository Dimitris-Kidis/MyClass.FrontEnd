export class Post {
    id: number;
    text: string;
    header: string;
    author: string;
    createdAt: string;

    constructor(
        id: number,
        text: string,
        header: string,
        author: string,
        createdAt: string
    ) {
        this.id = id;
        this.text = text;
        this.header = header;
        this.author = author;
        this.createdAt = createdAt;
    }
}