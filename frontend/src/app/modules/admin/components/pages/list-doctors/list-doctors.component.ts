import { Component, AfterViewInit, ViewChild, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import {MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
import { IListDoctors } from '../../../shared/interface/IListDoctors';
import { AdminService } from '../../../service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  // this.activateRoute.snapshot.queryParams['returnUrl']
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllDoctors()
    // this.activateRoute.snapshot.queryParams['returnUrl']
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

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator
  }
///////////////////////////////////////////////////////////////////////////

blockDoctor(id:string){

  this.adminService.blockDoctor(id).subscribe(()=>{
     this.router.navigateByUrl("/admin/list-doctor")

  })
}

///////////////////////////////////////////////////////////////////////////
unblockDoctor(id:string){
  this.adminService.unblockDoctor(id).subscribe(()=>{
     this.router.navigateByUrl("/admin/list-doctor")
  })
}

  
}































// import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
// import {MatTableDataSource } from '@angular/material/table';
// import {MatPaginator} from '@angular/material/paginator'
// import { IListDoctors } from '../../../shared/interface/IListDoctors';
// import { AdminService } from '../../../service/admin.service';
// interface PeriodicElement { 
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

// @Component({
//   selector: 'app-list-doctors',
//   templateUrl: './list-doctors.component.html',
//   styleUrls: ['./list-doctors.component.css']
// })
// export class ListDoctorsComponent implements AfterViewInit ,OnInit{
//   LIST_DOCTORS!:any;
//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
//   listDoctors = new MatTableDataSource<PeriodicElement>(this.LIST_DOCTORS)

//   constructor(private adminService:AdminService){}

//   ngOnInit(): void {
//   this.getAllDoctors()
//   }
//   getAllDoctors(){
//     this.adminService.listAllDoctors().subscribe(data=>{
//       this.LIST_DOCTORS = data
//     })
//   }

//   @ViewChild(MatPaginator) 
//   paginator!:MatPaginator;

//   ngAfterViewInit(){
//     this.dataSource.paginator = this.paginator
//   }


  
// }
