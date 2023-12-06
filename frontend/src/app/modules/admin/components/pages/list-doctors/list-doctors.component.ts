import { Component, AfterViewInit, ViewChild, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import {MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
import { IListDoctors } from '../../../shared/interface/IListDoctors';
import { AdminService } from '../../../service/admin.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSort ,Sort} from '@angular/material/sort';


@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css']
})
export class ListDoctorsComponent implements AfterViewInit ,OnInit, OnChanges{
  LIST_DOCTORS!:IListDoctors[];
  isBlocked!:boolean
  returnUrl:string=""
  displayedColumns: string[] = ['name', 'email', 'address','phone','actions'];
  dataSource = new MatTableDataSource<IListDoctors>(this.LIST_DOCTORS)

  constructor(private adminService:AdminService ,
              private router : Router,
              private activateRoute: ActivatedRoute,
    ){}

  ngOnInit(): void {
  this.getAllDoctors()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllDoctors()
  }

  ///////////////////////////////////////////////////////////////////////////
  getAllDoctors(){
    this.adminService.listAllDoctors().subscribe(data=>{
      this.LIST_DOCTORS = data.data
      this.dataSource.data = this.LIST_DOCTORS
    })
  }

  @ViewChild(MatPaginator) 
  paginator!:MatPaginator;

  @ViewChild(MatSort)
  sort!:MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

/////////////////////////////////////////////////////////////////////////////

toggleBlockeStatus(id:string,currentDoctor:boolean){
  this.adminService.toggleStatus(id,currentDoctor).subscribe((data)=>{
      this.getAllDoctors()
  })
}

///////////////////////////////////////////////////////////////////////////////
trackByFun(index:number,item:IListDoctors):string{ 
return item._id || ''
}

//////////////////////////////////////////////////////////////////////////////// 
updateDoctor(id:string){
  this.router.navigateByUrl(`admin/update-doctor/${id}`)
}

//////////////////////////////////////////////////////////////////////////////// 

filterChange(data:Event){
  const value = (data.target as HTMLInputElement).value
  this.dataSource.filter=value;
}

//////////////////////////////////////////////////////////////////////////////// 


}





























