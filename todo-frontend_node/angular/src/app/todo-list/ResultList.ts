import { Todo } from "./todo";

export class ResultList {
    currentPage: number;
    list: Array<Todo>;
    pageSize: number;
    sortDirections: string;
    sortFields: string;
    totalResults: number;

    constructor(object?: any) {
        object = object ? object : {};
        this.currentPage = object.currentPage || 0;
        this.list = object.list || '';
        this.pageSize = object.pageSize || 0;
        this.sortDirections = object.sortDirection || '';
        this.sortFields = object.sortFields || '';
        this.totalResults = object.totalResults || 0;
    }
}