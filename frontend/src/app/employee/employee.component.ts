import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Employee } from '../Employee';
import { GetEmployee } from '../store/actions/employee.action';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private store: Store) { }
  
  @Select(EmployeeState.getEmployee) employee$: Observable<Employee>;
  employee: Employee;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.store.dispatch(new GetEmployee(paramMap.get('id')));
        this.employee$.subscribe(response => this.employee = response);
        // this._apiService.getOne(paramMap.get('id')).subscribe(response => this.employee = response.data);
      }
    });
  }

}
