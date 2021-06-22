import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';
import { ApiService } from "src/app/api.service";
import { Employee } from "src/app/Employee";
import { AddEmployee, DeleteEmployee, GetEmployee, GetEmployees, UpdateEmployee } from "../actions/employee.action";

export interface EmployeeStateModel {
    employees: Employee[];
    employee: Employee;
}

@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees: [],
        employee: null
    }
})

@Injectable()
export class EmployeeState {

    constructor(private _apiService: ApiService) { }

    @Selector()
    static getEmployeeList(state: EmployeeStateModel) {
        return state.employees;
    }

    @Selector()
    static getEmployee(state: EmployeeStateModel) {
        return state.employee;
    }

    @Action(AddEmployee)
    addEmployee({ getState, patchState }: StateContext<EmployeeStateModel>, { payload }: AddEmployee) {
        return this._apiService.create(payload).pipe(tap(response => {
            alert(response.message);
            patchState({ employees: [] });
        }));
    }

    @Action(GetEmployees)
    getAllEmployess({ getState, setState }: StateContext<EmployeeStateModel>) {
        if (!getState().employees.length) {
            return this._apiService.getAll().pipe(tap(response => {
                const state = getState();
                setState({ ...state, employees: response.data });
            }));
        }
    }

    @Action(GetEmployee)
    getEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: GetEmployee) {
        const state = getState();
        setState({
            ...state,
            employee: getState().employees.find(value => value.id === id)
        });
    }

    @Action(UpdateEmployee)
    updateEmployee({ getState, patchState }: StateContext<EmployeeStateModel>, { id, payload }: UpdateEmployee) {
        return this._apiService.update(id, payload).pipe(tap(response => {
            const state = getState();
            const employeeList = [...state.employees];
            const index = employeeList.findIndex(item => item.id === id);
            employeeList[index] = { ...payload, id: id };
            patchState({ employees: employeeList });
            alert(response.message);
        }));
    }

    @Action(DeleteEmployee)
    deleteEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: DeleteEmployee) {
        return this._apiService.delete(id).pipe(tap(response => {
            const state = getState();
            setState({
                ...state,
                employees: state.employees.filter(value => value.id !== id)
            });
            alert(response.message);
        }));
    }
}