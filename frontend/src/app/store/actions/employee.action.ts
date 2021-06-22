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

// Update Employee
export class UpdateEmployee {
    static readonly type = '[Employee] Update';
    constructor(public id: string, public payload: Employee) {}
}

// Delete Employee
export class DeleteEmployee {
    static readonly type = '[Employee] Delete';
    constructor(public id: string) {}
}
