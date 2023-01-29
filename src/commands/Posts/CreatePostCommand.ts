
export class CreatePostCommand {
    text: string;
    header: string;
    author: string;
    target: number;
    userId: number;

    constructor(
        text: string,
        header: string,
        author: string,
        target: number,
        userId: number
    ) {
        this.text = text;
        this.header = header;
        this.author = author;
        this.target = target;
        this.userId = userId;
    }
}