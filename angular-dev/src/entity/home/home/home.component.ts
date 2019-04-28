import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/entity/product/product.service';
import { Product } from 'src/entity/product/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor(
    private productService: ProductService
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
}
