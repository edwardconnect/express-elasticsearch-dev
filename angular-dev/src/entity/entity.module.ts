import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    ProductModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntityModule { }
