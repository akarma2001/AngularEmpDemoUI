import { Component, Input } from '@angular/core';
import { SharedService } from '../../shared.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddEditDepartmentComponent } from '../add-edit-department/add-edit-department.component';


@Component({
  selector: 'app-show-dep',
  standalone: true,
  imports: [CommonModule, AddEditDepartmentComponent],
  templateUrl: './show-dep.component.html',
  styleUrl: './show-dep.component.css'
})
export class ShowDepComponent {

  public DepartmentList : any = [];
  ModalTitle:string = "";
  ActivateAddEditDepComp:boolean = false;
  dep:any;

  constructor(private sharedService: SharedService, private http:HttpClient){
  }

  ngOnInit() : void
  { 
    this.refreshDepList();
  }

  addClick()
  {
    // alert("Add click called!");
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepComp = true;
  }

  editClick(dataItem:any)
  {
      this.dep = dataItem;
      this.ModalTitle="Edit Department";
      this.ActivateAddEditDepComp = true;

  }

  
  deleteClick(dataItem:any)
  {
    this.dep = dataItem;
    this.deleteDepartment(this.dep.departmetId); 
  }

  deleteDepartment(depID:any){  
    this.sharedService.deleteDepartment(depID).subscribe(resp=>{
      alert(resp.toString());
      this.refreshDepList();
    })
    
}

  closeClick()
  {
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  refreshDepList()
  {
    this.sharedService.getDepList().subscribe(data=> {
      this.DepartmentList = data;
    });
  }
}
