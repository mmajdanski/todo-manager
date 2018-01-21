export class Todo {

    status: string;
    editMode: boolean;

    constructor(public id: number, public text: string){
        this.id == id;
        this.text == text;
        this.status = "incomplete";
        this.editMode = false;
    }

}
