import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [NavbarComponent, SidenavComponent, MainComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
