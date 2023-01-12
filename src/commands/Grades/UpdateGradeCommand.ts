export class UpdateGradeCommand {
    id: number;
    gradeOne: number;
    gradeTwo: number;
    gradeThree: number;
    gradeFour: number;
    seminars: number;
    courses: number;
    labs: number;

    constructor(
        id: number,
        gradeOne: number,
        gradeTwo: number,
        gradeThree: number,
        gradeFour: number,
        seminars: number,
        courses: number,
        labs: number
    ) {
        this.id = id;
        this.gradeOne = gradeOne;
        this.gradeTwo = gradeTwo;
        this.gradeThree = gradeThree;
        this.gradeFour = gradeFour;
        this.seminars = seminars;
        this.labs = labs;
        this.courses = courses;
    }
}