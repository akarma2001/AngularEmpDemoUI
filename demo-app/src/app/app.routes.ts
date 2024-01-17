import { Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = [
    {path: '', redirectTo:'department', pathMatch:'full'},
    {path:"department", component:DepartmentComponent},
    {path:"employee", component:EmployeeComponent}
];
