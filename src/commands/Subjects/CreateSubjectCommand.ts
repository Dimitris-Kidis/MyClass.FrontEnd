export class CreateSubjectCommand {
    subjectName: string;

    constructor(
        subjectName: string,
    ) {
        this.subjectName = subjectName;
    }
}