import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const ERROR_MESSAGE:any = {
  email:'invalid Email',
  required:'value required',
  minlength:'value is too short',
  pattern:'please use correct value',
  noMatch:'not match password',
  strong:'password make strong'
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
  this.showErrorMessages = errorKey.map(key => ERROR_MESSAGE[key] )
  
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
