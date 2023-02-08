import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message= sessionStorage.getItem("firstname")
  name='';

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.message)
  this.name= this.route.snapshot.params['name'];
  }
  
}
