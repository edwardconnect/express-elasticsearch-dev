import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommodityListComponent } from './commodity-list/commodity-list.component';
import { CommodityEditComponent } from './commodity-edit/commodity-edit.component';

@NgModule({
  declarations: [CommodityListComponent, CommodityEditComponent],
  imports: [
    CommonModule
  ]
})
export class CommodityModule { }
