import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTE } from './home/home.route';
import { MatInputModule } from '@angular/material/input';
import { SharedCommonModule } from 'src/shared/shared-common/shared-common.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([HOME_ROUTE]),
    SharedCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
