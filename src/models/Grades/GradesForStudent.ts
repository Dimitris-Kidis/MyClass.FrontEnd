export class GradesForStudent {
    subject: string;
    gradeOne: number;
    gradeTwo: number;
    gradeThree: number;
    gradeFour: number;
    seminars: number;
    courses: number;
    labs: number;

    constructor(
        subject: string,
        gradeOne: number,
        gradeTwo: number,
        gradeThree: number,
        gradeFour: number,
        seminars: number,
        courses: number,
        labs: number
    ) {
        this.subject = subject;
        this.gradeOne = gradeOne;
        this.gradeTwo = gradeTwo;
        this.gradeThree = gradeThree;
        this.gradeFour = gradeFour;
        this.seminars = seminars;
        this.labs = labs;
        this.courses = courses;
    }
}