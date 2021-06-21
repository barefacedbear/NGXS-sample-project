import { Employee } from "src/app/Employee";

// Add Employee
export class AddEmployee {
    static readonly type = '[Employee] Add';
    constructor(public payload: Employee) {}
}

// Get All Employee
export class GetEmployees {
    static readonly type = '[Employee] GetAll';
}

// Get One Employee
export class GetEmployee {
    static readonly type = '[Employee] Get';
    constructor(public id: string) {}
}