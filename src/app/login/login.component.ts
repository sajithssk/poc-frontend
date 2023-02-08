import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '../auth.guard.service';
import { User } from '../model/User';
// import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // email = 'sajith@123'
  // password= '123'
  form!: FormGroup
  submitted =false
  loading=false
  error = null

    foundUser= new User();
    constructor(private router:Router,private service:UserService,
      private authService:AuthGuardService,private fb: FormBuilder
      ) { }



      profileForm: FormGroup = new FormGroup({
        email: new FormControl('',Validators.email),
        password: new FormControl('',Validators.minLength(6)),
      });
 
  handleLogin(){
    // console.log(this.email)
    // if(this.email==="sajith@123" && this.password ==='123'){
    //   if (this.hardcodedAuthenticationService.authenticate(this.email,this.password)){
    //   this.router.navigate(['home',this.email])
    //   this.invalidLogin=false
    // }else{
    //   this.invalidLogin=true
    // }
    {
      // TODO: Use EventEmitter with form value
      this.submitted = true;
      if (this.profileForm.invalid) {
        return;
      }
      console.warn(this.profileForm.value);
    }
    this.service.handleLogin(this.foundUser).subscribe(
      res => {
      // alert("login Successful")
      this.authService.saveUserName();
      sessionStorage.setItem("firstname",res.firstname)
      this.router.navigate(['home'])
      console.log('working')
      // sessionStorage.setItem('firstName',res.firstName)
    },err=>
    {
      this.error = err.error;
      console.log("Error")
      // alert(err.error)
      this.profileForm.controls['password'].reset()

      // alert("User not found!!! Please register first")
      // this.router.navigate(['registration'])
    }  )

    // this.service.handleLogin(this.foundUser).subscribe(
    //   data => 
    //   {
    //     console.log(data)
    //     this.router.navigate(['home'])
    //   }
    // )

  }
  ngOnInit(): void {
    this.profileForm = this.fb.group(
      {
        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required]],
      });
  }
  get f() { return this.profileForm.controls; }
  
  registerButton(){
    this.router.navigate(['registration'])
  }
}
