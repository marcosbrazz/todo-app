export class Todo {
    id: string;
    rev: string;
    description: string;
    done: boolean;

    constructor(object?: any) {
        object = object || {};
        this.id = object.id || '';
        this.rev = object.rev || '';
        this.description = object.description || '';
        this.done = object.done || false;
    }
}