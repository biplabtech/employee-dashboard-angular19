import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<Employee[]>([
    { id: 1, name: 'John Doe', department: 'IT', salary: 60000 },
    { id: 2, name: 'Jane Smith', department: 'HR', salary: 50000 },
  ]);

  employees$ = this.employeesSubject.asObservable();

  getById(id: number): Employee | undefined {
    return this.employeesSubject.value.find(e => e.id === id);
  }

  add(employee: Employee): void {
    this.employeesSubject.next([
      ...this.employeesSubject.value,
      employee,
    ]);
  }

  update(updated: Employee): void {
    this.employeesSubject.next(
      this.employeesSubject.value.map(e =>
        e.id === updated.id ? updated : e
      )
    );
  }

  remove(id: number): void {
    this.employeesSubject.next(
      this.employeesSubject.value.filter(e => e.id !== id)
    );
  }
}
