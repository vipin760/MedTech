import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit{
  addDoctor!:FormGroup;
  isSubmitted:boolean=false;

  constructor(
    private fb:FormBuilder
  ){}

ngOnInit(): void {
  this.addDoctor = this.fb.group({
    fullName:['',[Validators.required]],
    gender:['',Validators.required],
    dateofbirth:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    phone:['',Validators.required,Validators.minLength(10),Validators.maxLength(10)],
    adress:['',[Validators.required,Validators.minLength(6)] ]
  })
}
get fc(){
 return this.addDoctor.controls
}

submit(){
  this.isSubmitted = true;
  if(this.isSubmitted){
    console.log(this.addDoctor);
    
  }

}
}
