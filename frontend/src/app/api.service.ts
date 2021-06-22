import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private readonly URL = environment.NGXS;

  create(formData: Employee) {
    return this.http.post<{ message: string }>(`${this.URL}/create`, formData);
  }

  getAll() {
    return this.http.get<{ data: Employee[] }>(`${this.URL}/getAll`);
  }

  update(id: string, formData: Employee) {
    return this.http.put<{ message: string }>(`${this.URL}/update/${id}`, formData);
  }

  delete(id: string) {
    return this.http.delete<{ message: string }>(`${this.URL}/delete/${id}`);
  }
}
