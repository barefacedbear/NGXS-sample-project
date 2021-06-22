import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Employee } from '../Employee';
import { AddEmployee, DeleteEmployee, GetEmployees, UpdateEmployee } from '../store/actions/employee.action';
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
    this.store.dispatch(new AddEmployee(this.form.value)).subscribe(response => {
      this.form.reset();
      console.log(response);
      this.store.dispatch(new GetEmployees());
    });
  }

  edit(formData) {
    this.form.patchValue({ ...formData });
  }

  update(id: string) {
    this.store.dispatch(new UpdateEmployee(id, this.form.value));
  }

  delete(id: string) {
    if(confirm('Are you sure to delete?')) {
      this.store.dispatch(new DeleteEmployee(id));
    }
  }

}
