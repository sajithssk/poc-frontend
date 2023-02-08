import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '../auth.guard.service';
import { User } from '../model/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user:User = new User()
  form!: FormGroup
  cpw:any = ''
  pw:any = ''
  error = null
  submitted = false
  isConfirmPasswordDirty: boolean = false;
  passwordsMatching: boolean = false;
  confirmPasswordClass!: string;
 
  constructor(private service:UserService,private authService:AuthGuardService,
    private router:Router,private fb:FormBuilder) { }

    profileForm: FormGroup = new FormGroup({
      email: new FormControl('',Validators.email),
      password: new FormControl('',Validators.minLength(6)),
      firstname: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required)
    });
  ngOnInit(): void {
    this.profileForm = this.fb.group(
      {
        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        firstname:['',[Validators.required]],
        lastname:['',[Validators.required]],
      });
  }
  get f() { return this.profileForm.controls;  
  }
 
  addDetails(){
    this.isConfirmPasswordDirty = true;
    if (this.pw === this.cpw) 
    { 
      this.passwordsMatching = true;
      console.log("Password Match")
      this.confirmPasswordClass = 'form-control is-valid'
      this.submitted = true;
      
        if (this.profileForm.invalid) {
          return;
        }
        

      this.service.addDetails(this.user)
      
      .subscribe(res=>{ 
        console.log(res)
        this.authService.saveUserName();
        this.router.navigate(['/login'])
        console.log('working')
        alert("User Registered successfully")
        
      },err=>{
        this.error = err.error;
        console.log("error")
        
        // alert(err.error)
        this.profileForm.controls['email'].reset()
      })
      
    }
       else 
       {
        this.passwordsMatching = false;
        this.confirmPasswordClass = 'form-control is-invalid'
        console.log("Password Mismatch")
        alert("Password not matching")
       
      }
    
    
   
     
    // this.router.navigate(['/login'])
    // alert("User registered successfully")
    
  }

    
}
