import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MainComponent } from './main/main.component';
import { SharedCommonModule } from 'shared/shared-common/shared-common.module';

@NgModule({
  declarations: [NavbarComponent, SidenavComponent, MainComponent],
  imports: [
    CommonModule,
    SharedCommonModule
  ],
  exports: [
    NavbarComponent, SidenavComponent, MainComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
