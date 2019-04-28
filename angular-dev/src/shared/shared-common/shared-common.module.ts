import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatChipsModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatAutocompleteModule, MatTableModule, MatPaginatorModule, MatTabsModule, MatToolbarModule, MatSidenavModule, MatProgressBarModule, MatExpansionModule, MatTooltipModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatMenuModule, MatSortModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    // Table
    MatTableModule,
    MatPaginatorModule,
    // Navigation
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    // Util
    MatProgressBarModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    // Datepicker
    MatDatepickerModule,
    MatNativeDateModule,
    // Stepper
    MatStepperModule,
    MatMenuModule,
    // Menu
    MatSortModule,
    MatListModule
  ]
})
export class SharedCommonModule { }
