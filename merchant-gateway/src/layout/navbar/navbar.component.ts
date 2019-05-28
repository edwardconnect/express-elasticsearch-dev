import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  readonly navbarItems = [
    {
      name: 'Commodities',
      routerLink: ''
    },
    {
      name: 'Users',
      routerLink: 'user'
    },
    {
      name: 'Settings',
      routerLink: 'settings'
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  changeRoute(routerLink: string) {
    this.router.navigate([routerLink]);
  }
}
