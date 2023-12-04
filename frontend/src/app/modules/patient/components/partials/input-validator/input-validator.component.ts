import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const ERROR_MESSAGE:any = {
  email:'invalid Email',
  required:'value required',
  minlength:'value is too short',
  pattern:'please use correct value'
}

@Component({
  selector: 'input-validator',
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.css']
})
export class InputValidatorComponent implements OnInit, OnChanges{
 

  showErrorMessages:string[] = []

@Input()
control!:AbstractControl;

@Input()
showErrorWhen:boolean=true

checkValidators(){
  const errors =  this.control.errors
  console.log("errors",errors)
  if(!errors){
    this.showErrorMessages = []
    return
  }
  const errorKey = Object.keys(errors)
  console.log("errorKey",errorKey)
  this.showErrorMessages = errorKey.map(key => ERROR_MESSAGE[key] )
  console.log("this.showErrorMessages",this.showErrorMessages);
  
}
ngOnInit(): void {
  this.control.valueChanges.subscribe(()=>{
    this.checkValidators()
  })
  this.control.statusChanges.subscribe(()=>{
    this.checkValidators()
  })
}

ngOnChanges(changes: SimpleChanges): void {
  this.checkValidators()
}

}
