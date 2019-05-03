import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/entity/product/product.service';
import { Product } from 'src/entity/product/product.model';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  private getAllProducts() {
    this.productService.getProduct().subscribe(res => {
      console.log(res.body);
      this.products = res.body;
    })
  }

  private createProduct(product: Product) {
    this.productService.createProduct(product).subscribe(res => {
      console.log(res);
      console.log('created')
      this.getAllProducts();
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: new Product(null,)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.name && result.description) {
        this.createProduct(result);
      }
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'create-product-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public product: Product) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
