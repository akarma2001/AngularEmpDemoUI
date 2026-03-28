import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edit-emp',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-edit-emp.component.html',
  styleUrl: './add-edit-emp.component.css'
})
export class AddEditEmpComponent {
  @Input() emp : any;
  EmployeeId : string ="";
  EmployeeName:string="";
  Department: string="";
  DateOfJoining: string = "";
  PhotoFileName: string = "anonymous.png";
  PhotoFilePath: string ="";
  DepartmentList: any=[];

  constructor(private service: SharedService){

  }

ngOnInit() :void{
 this.loadDepartmentList();
}

loadDepartmentList(){
   this.service.getAllDepartmentNames().subscribe((data:any)=>{
    this.DepartmentList = data; // Load all Department Names
    
    // Set properties with object recieved from add/edit action
    this.EmployeeId = this.emp.employeeId;
    this.EmployeeName = this.emp.employeeName;
    this.Department = this.emp.department;
    // convert doj to a date object and then get formatted date
    var doj = new Date(this.emp.dateOfJoiing);
    this.DateOfJoining = this.formatDate(doj);
    this.PhotoFileName = this.emp.photoFileName;
    this.PhotoFilePath = this.service.photoUrl + "/" + this.PhotoFileName;

  })
}

formatDate(date: Date): string {
  return date.toLocaleDateString('en-US');
}

addEmployee(){
  
  var val={
      EmployeeId: this.EmployeeId,
      EmployeeName : this.EmployeeName,
      Department: this.Department,
      DateOfJoiing : this.DateOfJoining      
    }

      this.service.addEmployee(val).subscribe(resp=>{
        alert(resp.toString());
      })
}

updateEmployee(){
  var val={
    EmployeeId: this.EmployeeId,
      EmployeeName : this.EmployeeName,
      Department: this.Department,
      DateOfJoiing : this.DateOfJoining    
  }

    this.service.updateEmployee(val).subscribe(resp=>{
      alert(resp.toString());
    })
}

  uploadPhoto(event:any)
  {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile',file,file.name);
    this.service.uploadPhoto(formData).subscribe((data:any) =>
      {
        this.PhotoFileName = data.toString();
        this.PhotoFilePath = this.service.photoUrl + "/" + this.PhotoFileName;
      }
    );
  }
}
