import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntityModule } from 'src/entity/entity.module';

import { SharedCommonModule } from 'src/shared/shared-common/shared-common.module';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from 'src/entity/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntityModule,
    NgbModule,
    BrowserAnimationsModule,
    SharedCommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
