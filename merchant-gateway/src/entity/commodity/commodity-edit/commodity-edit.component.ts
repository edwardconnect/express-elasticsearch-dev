import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { Commodity } from '../commodity.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-commodity-edit',
  templateUrl: './commodity-edit.component.html',
  styleUrls: ['./commodity-edit.component.sass']
})
export class CommodityEditComponent implements OnInit {
  commodity: Commodity = new Commodity();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(
    public dialogRef: MatDialogRef<CommodityEditComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.commodity.tags = [];
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.commodity.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeChip(chip) {
    const index = this.commodity.tags.indexOf(chip);

    if (index >= 0) {
      this.commodity.tags.splice(index, 1);
    }
  }
}
