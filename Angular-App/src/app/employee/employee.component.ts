import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { 
  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
   }

   getEmployeeService(){
    return this.employeeService;
   }

  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: 0
    };
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.employeeService.postEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        M.toast({ html: 'Saved Successfully', classes: 'rounded' });
      });
    }else{
      this.employeeService.putEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        M.toast({ html: 'Updated Successfully', classes: 'rounded' });
      });
    }
    this.refreshEmployeeList();
    location.reload();
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res)=>{
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm){
    if(confirm('Are You Sure to Delete This Record?') == true){
      this.employeeService.deleteEmployee(_id).subscribe((res)=>{
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted Successfully', classes: 'rounded' });
        location.reload();
      });
    }
  }
}
