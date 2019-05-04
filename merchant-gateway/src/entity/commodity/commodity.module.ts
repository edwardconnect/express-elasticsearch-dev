import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommodityListComponent } from './commodity-list/commodity-list.component';
import { CommodityEditComponent } from './commodity-edit/commodity-edit.component';
import { RouterModule } from '@angular/router';
import { COMMODITY_ROUTES } from './commodity.route';

@NgModule({
  declarations: [
    CommodityListComponent, 
    CommodityEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([...COMMODITY_ROUTES])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommodityModule { }
