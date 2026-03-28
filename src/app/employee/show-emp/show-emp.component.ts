import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddEditEmpComponent } from '../add-edit-emp/add-edit-emp.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-emp',
  standalone: true,
  imports: [FormsModule,AddEditEmpComponent,CommonModule],
  templateUrl: './show-emp.component.html',
  styleUrl: './show-emp.component.css'
})
export class ShowEmpComponent {
  public EmployeeList : any = [];
  ModalTitle:string = "";
  ActivateAddEditEmpComp:boolean = false;
  emp:any;

  constructor(private sharedService: SharedService, private http:HttpClient){
  }

  ngOnInit() : void
  { 
    this.refreshEmployeeList();
  }

  addClick()
  {
    // alert("Add click called!");
    this.emp = {
      EmployeeId: 0,
      EmployeeName: "",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  editClick(dataItem:any)
  {
      this.emp = dataItem;
      this.ModalTitle="Edit Employee";
      this.ActivateAddEditEmpComp = true;

  }
 
  deleteClick(dataItem:any)
  {
    this.emp = dataItem;
    this.deleteEmployee(this.emp.employeeId); 
  }

  deleteEmployee(empId:any){  
    this.sharedService.deleteEmployee(empId).subscribe(resp=>{
      alert(resp.toString());
      this.refreshEmployeeList();
    })
}

  closeClick()
  {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmployeeList();
  }

  refreshEmployeeList()
  {
    this.sharedService.getEmpList().subscribe(data=> {
      this.EmployeeList = data;
    });
  }
}
