import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommodityModule } from './commodity/commodity.module';
import { SettingModule } from './setting/setting.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommodityModule,
    SettingModule,
    UserModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntityModule { }
