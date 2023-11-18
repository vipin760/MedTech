import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {

  @Input()
  label!:string;

  @Input() 
  control!:AbstractControl;

  @Input()
  showErrorWhen:boolean=true

  @Input()
  type:'text' | 'email' | 'password' = 'text'

  get formControl(){
    return this.control as FormControl
  }


}
