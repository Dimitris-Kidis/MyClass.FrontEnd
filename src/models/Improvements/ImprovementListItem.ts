export class ImprovementListItem {
    id: number;
    userName: string;
    role: string;
    time: string;
    improvementText: string;

    constructor(
        id: number,
        userName: string,
        role: string,
        time: string,
        improvementText: string
    ) {
        this.id = id;
        this.userName = userName;
        this.role = role;
        this.time = time;
        this.improvementText = improvementText;
    }
}