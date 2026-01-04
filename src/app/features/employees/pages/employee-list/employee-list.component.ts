import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../core/models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  private employeeService = inject(EmployeeService);

  employees = toSignal(this.employeeService.employees$, {
    initialValue: [] as Employee[],
  });

  trackById(index: number, emp: Employee): number {
    return emp.id;
  }

  deleteEmployee(id: number): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmed) return;

    this.employeeService.remove(id);
  }
}
