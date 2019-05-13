import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Commodity } from './commodity.model';

@Injectable({
  providedIn: 'root'
})
export class CommodityService {
  private resourceUrl = 'http://localhost:80/products'
  constructor(private http: HttpClient) { }

  getCommodities(req): Observable<HttpResponse<Commodity[]>> {
    
    return this.http.get<Commodity[]>(this.resourceUrl, {observe: 'response'})
  }

  createCommodity(commodity: Commodity): Observable<HttpResponse<Commodity>> {
    return this.http.post<Commodity>(this.resourceUrl, commodity,{observe: 'response'});
  }
}
