import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Employee } from '../Employee';
import { GetEmployees } from '../store/actions/employee.action';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store) { }

  @Select(EmployeeState.getEmployeeList) employees$: Observable<Employee[]>;
  form = this.fb.group({ name: [''], department: [''] });

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.store.dispatch(new GetEmployees());
  }

  create() {
    // this._apiService.create(this.form.value).subscribe(response => {
    //   this.form.reset();
    //   alert(response.message);
    //   this.getAll();
    // });
  }

}
