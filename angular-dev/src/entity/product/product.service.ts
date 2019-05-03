import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Product } from './product.model';

@Injectable({
providedIn: 'root'
})
export class ProductService {
  // TODO: Refine the path, should be process env sth
  private resourceUrl = 'http://localhost:80/products'
  constructor(private http: HttpClient) { }

  getProduct(): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(this.resourceUrl, { observe: 'response' });
  }

  createProduct(product: Product): Observable<HttpResponse<Product>> {
    return this.http.post<Product>(this.resourceUrl, product,{ observe: 'response' });
  }
}
