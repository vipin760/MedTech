import { AbstractControl } from "@angular/forms"



export const PasswordMatchValidator = (passwordControlName:string,
        confirmPasswordControlName:string)=>{
            console.log(passwordControlName,confirmPasswordControlName)
            const validator = (form:AbstractControl)=>{
               const passwordControl = form.get(passwordControlName);
               const confirmPasswordControl = form.get(confirmPasswordControlName);
               
                
               if(!passwordControl || !confirmPasswordControl){
                return
               }
              
               if(passwordControl.value !== confirmPasswordControl.value){
                confirmPasswordControl.setErrors({noMatch:true});
               }else{
                const errors = confirmPasswordControl.errors;
                if(!errors) return;

                delete errors["notMatch"]
                confirmPasswordControl.setErrors(errors)
                confirmPasswordControl.setErrors(errors);
               }

            }
            return validator
    }