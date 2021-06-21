import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';
import { ApiService } from "src/app/api.service";
import { Employee } from "src/app/Employee";
import { GetEmployees } from "../actions/employee.action";

export interface EmployeeStateModel {
    employees: Employee[];
}

@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees: []
    }
})

@Injectable()
export class EmployeeState {

    constructor(private _apiService: ApiService) {}

    @Selector()
    static getEmployeeList(state: EmployeeStateModel) {
        return state.employees;
    }

    @Action(GetEmployees)
    getAllEmployess({ getState, setState}: StateContext<EmployeeStateModel>) {
        if(!getState().employees.length) {
            return this._apiService.getAll().pipe(tap(res => {
                const state = getState();
                setState({ ...state, employees: res });
            }));
        }
    }
}