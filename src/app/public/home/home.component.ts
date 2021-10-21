import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = [
    {
      id: 1,
      name: 'Honda Civic Vti 2000',
      price: 799
    },
    {
      id: 2,
      name: 'Honda Civic Vti 2001',
      price: 999
    },
    {
      id: 3,
      name: 'Honda Civic Vti 2002',
      price: 499
    },
    {
      id: 4,
      name: 'Honda Civic Vti 2003',
      price: 769
    },
    {
      id: 5,
      name: 'Honda Civic Vti 2004',
      price: 929
    },
    {
      id: 6,
      name: 'Honda Civic Vti 2005',
      price: 349
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
