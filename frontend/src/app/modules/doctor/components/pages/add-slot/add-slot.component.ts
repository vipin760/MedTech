import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DoctorService } from '../../../service/doctor.service';
import { IAppointment, IFetchAppoinmentResponse } from '../../../shared/interface.ts/Doctor.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit, OnChanges{

  doctor: string = ''; // You may replace this with a dynamic doctor selection mechanism
  date: string = ''; // You may replace this with a dynamic date selection mechanism
  startTime: string = '';
  endTime: string = '';

  listData:IFetchAppoinmentResponse[]=[];
  displayedColumns:string[]=['date','time','booked','actions']
  timeSlots: string[] = [];
  ////////////////////////////////////////////////////////////////////////////////////////////////
  @ViewChild(MatPaginator)
paginator!:MatPaginator;

@ViewChild(MatSort)
sort!:MatSort;
////////////////////////////////////////////////////////////////////////////////////////////////
  dataSource =new MatTableDataSource<IFetchAppoinmentResponse>(this.listData)
////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private doctorService:DoctorService,
    private router:Router
  ){}
////////////////////////////////////////////////////////////////////////////////////////////////
ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator
  this.dataSource.sort = this.sort
}
////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.getSlotList()
    // Generate time slots every 30 minutes from 9:00 AM to 9:00 PM
    const startTime = new Date(2000, 0, 1, 9, 0, 0);
    const endTime = new Date(2000, 0, 1, 21, 0, 0);

    while (startTime <= endTime) {
      this.timeSlots.push(this.formatTime(startTime));
      startTime.setMinutes(startTime.getMinutes() + 30);
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////
ngOnChanges(changes: SimpleChanges): void {
  this.getSlotList()
}
////////////////////////////////////////////////////////////////////////////////////////////////

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
////////////////////////////////////////////////////////////////////////////////////////////////
filterFun(data:Event){
  const value = (data.target as HTMLInputElement).value
  this.dataSource.filter = value
  }
////////////////////////////////////////////////////////////////////////////////////////////////
  saveSlot(): void {
    const slotData = {
      date: this.date,
      time: this.startTime
    }
    this.doctorService.addSlot(slotData).subscribe(()=>{
      this.getSlotList()
    })
    };
////////////////////////////////////////////////////////////////////////////////////////////////
    getSlotList(){
    this.doctorService.getSlot().subscribe((data)=>{
      this.listData = data.data
      this.dataSource.data = this.listData
      console.log(this.listData)
    })
    }
////////////////////////////////////////////////////////////////////////////////////////////////
    cancelSlot(date:string,time:string){
      this.doctorService.cancelSlot({date:date,time:time}).subscribe(()=>{
        this.getSlotList()
      })
    }

////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
  }
