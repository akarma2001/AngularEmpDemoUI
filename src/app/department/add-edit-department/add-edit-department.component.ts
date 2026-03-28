import { Component, Input } from '@angular/core';
import { ShowDepComponent } from '../show-dep/show-dep.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edit-department',
  standalone: true,
  imports: [ShowDepComponent, FormsModule, CommonModule],
  templateUrl: './add-edit-department.component.html',
  styleUrl: './add-edit-department.component.css'
})
export class AddEditDepartmentComponent {

  @Input() dep:any;
  DepartmentId:string ="";  
  DepartmentName:string="";

  constructor(private service: SharedService){

    }

  ngOnInit() :void{
    this.DepartmentId = this.dep.departmetId;
    this.DepartmentName = this.dep.departmentName;

  }

  addDepartment(){
    
    var val={DepartmentId:this.DepartmentId,
        DepartmentName : this.DepartmentName}

        this.service.addDepartment(val).subscribe(resp=>{
          alert(resp.toString());
        })
  }

  updateDepartment(){
    var val={
      DepartmentId: this.DepartmentId,
      DepartmentName : this.DepartmentName
    }

      this.service.updateDepartment(val).subscribe(resp=>{
        alert(resp.toString());
      })
  }

  
}