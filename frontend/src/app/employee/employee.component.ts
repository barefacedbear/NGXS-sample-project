import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../api.service';
import { Employee } from '../Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private _apiService: ApiService) { }
  employee: Employee;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this._apiService.getOne(paramMap.get('id')).subscribe(response => this.employee = response.data);
      }
    });
  }

}
