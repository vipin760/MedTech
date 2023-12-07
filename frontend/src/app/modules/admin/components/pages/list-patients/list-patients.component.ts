import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IListPatient } from '../../../shared/interface/IListPatients';
import { AdminService } from '../../../service/admin.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit, AfterViewInit{
  LIST_PATIENTS!:IListPatient[];
  displayedColumns:string[]=['name','email','address','phone','actions'] 

  dataSource = new MatTableDataSource<IListPatient>(this.LIST_PATIENTS)

  @ViewChild(MatPaginator)
  paginator!:MatPaginator;

  @ViewChild(MatSort)
  sort!:MatSort;

  constructor(
    private adminService: AdminService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.fetchPatients()
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }


  fetchPatients(){
    this.adminService.listPatients().subscribe((data)=>{
      this.LIST_PATIENTS = data.data
      this.dataSource.data = this.LIST_PATIENTS
      console.log("this.LIST_PATIENTS",this.LIST_PATIENTS)
    })
  }

  toggleStatus(id:string, isBlocked:boolean){
    this.adminService.patient_toggleStatus(id,isBlocked).subscribe(()=>{
      this.fetchPatients()
    })
  }

  trackByFun(index:number,item:IListPatient):string{
    return item._id || ''
  }
  /////////////////////////////////////////////////////////////////////////////////
  
  filterFun(data:Event){
    const value = (data.target as HTMLInputElement).value
    this.dataSource.filter = value
  }

  //////////////////////////////////////////////////////////////////////////////////

  update(id:string){
    this.router.navigateByUrl(`admin/update-patient/${id}`)
  }


 //////////////////////////////////////////////////////////////////////////////////

}
