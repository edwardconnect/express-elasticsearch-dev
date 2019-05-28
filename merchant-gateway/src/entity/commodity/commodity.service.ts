import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Commodity } from './commodity.model';
import { createRequestOption } from 'src/shared/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class CommodityService {
  private resourceUrl = 'http://localhost:80/products'
  constructor(private http: HttpClient) { }

  /**
   * GET /products - Get the product by request params
   * @param req request params
   */
  getCommodities(req): Observable<HttpResponse<Commodity[]>> {
    const options = createRequestOption(req);
    return this.http.get<Commodity[]>(this.resourceUrl, { params: options, observe: 'response' })
  }

  /**
   * POST /products - Create the product
   * @param commodity the request commodity to be created
   */
  createCommodity(commodity: Commodity): Observable<HttpResponse<Commodity>> {
    return this.http.post<Commodity>(this.resourceUrl, commodity, { observe: 'response' });
  }

  updateCommodity(commodity: Commodity): Observable<HttpResponse<Commodity>> {
    return this.http.put<Commodity>(this.resourceUrl, commodity, { observe: 'response' });
  }
}
