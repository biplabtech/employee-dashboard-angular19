import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../core/models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private employeeId?: number;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    department: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.employeeId = Number(idParam);
      const employee = this.employeeService.getById(this.employeeId);
      if (employee) {
        this.form.patchValue(employee);
      }
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const employee: Employee = {
      id: this.employeeId ?? Date.now(),
      ...this.form.getRawValue(),
    };

    if (this.employeeId) {
      this.employeeService.update(employee);
    } else {
      this.employeeService.add(employee);
    }

    this.router.navigate(['/employees']);
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
