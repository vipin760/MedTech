import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IListPatient } from '../../../shared/interface.ts/IListPatient';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from '../../../service/doctor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit, AfterViewInit{

  ILISTPATIENTS:IListPatient[]=[];

  dataSource =new MatTableDataSource<IListPatient>(this.ILISTPATIENTS)
  displayedColumns:string[]=['name','email','phone','address','actions']
///////////////////////////////////////////////////////////////////////
@ViewChild(MatPaginator)
paginator!:MatPaginator;

@ViewChild(MatSort)
sort!:MatSort;
///////////////////////////////////////////////////////////////////////
constructor(private doctorService:DoctorService,
            private router: Router
  ){

}
///////////////////////////////////////////////////////////////////////
ngOnInit(): void {
  this.fetchPatients()
}
  
///////////////////////////////////////////////////////////////////////
ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator
  this.dataSource.sort = this.sort
}
///////////////////////////////////////////////////////////////////////

fetchPatients(){
  this.doctorService.listPatients().subscribe((data)=>{
    this.ILISTPATIENTS = data.data
    this.dataSource.data = this.ILISTPATIENTS
  })
}

///////////////////////////////////////////////////////////////////////
filterFun(data:Event){
const value = (data.target as HTMLInputElement).value
this.dataSource.filter = value
}
///////////////////////////////////////////////////////////////////////
toggleBlockStatus(id:string,currentPatient:boolean){
 this.doctorService.toggleStatus(id,currentPatient).subscribe(()=>{
  this.fetchPatients()
 })
}

///////////////////////////////////////////////////////////////////////
trackByFun(index:number,item:IListPatient):string{
  return item._id || ''
}
///////////////////////////////////////////////////////////////////////

update(id:string){
this.router.navigateByUrl(`doctor/update-patients/${id}`)
}

///////////////////////////////////////////////////////////////////////

}
