import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const VALIDATOR_MESSAGES:any={
  email:"invalid email",
  required:"should not be empty"
}
@Component({
  selector: 'input-validators',
  templateUrl: './input-validators.component.html',
  styleUrls: ['./input-validators.component.css']
})
export class InputValidatorsComponent implements OnInit, OnChanges{
  @Input()
  control!:AbstractControl;
  
  @Input()
  showErrorWhen:boolean=true
  
  errorMessages:string[]=[]


  checkValidators(){
    const errors = this.control.errors
    if(!errors){
      this.errorMessages = []
      return
    }else{
      const errorKey = Object.keys(errors)
      this.errorMessages = errorKey.map(key => VALIDATOR_MESSAGES[key] )
    }
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
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

