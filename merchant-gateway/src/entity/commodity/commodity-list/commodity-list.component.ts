import { Component, OnInit, ViewChild } from '@angular/core';
import { Commodity } from '../commodity.model';
import { MatPaginator } from '@angular/material';
import { merge, of, Subscription } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { CommodityService } from '../commodity.service';

@Component({
  selector: 'app-commodity-list',
  templateUrl: './commodity-list.component.html',
  styleUrls: ['./commodity-list.component.sass']
})
export class CommodityListComponent implements OnInit {
  commodities: Commodity[] = [];

  /* Table paginator */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 20, 30];
  length = 0;

  constructor(
    private commodityService: CommodityService
  ) { }

  ngOnInit() {
    // this.updateTableView();
  }

  private updateTableView() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const currentPageSize = this.paginator.pageSize === undefined ? this.pageSizeOptions[0] : this.paginator.pageSize;
          const searchReq = {
            page: this.paginator.pageIndex,
            size: currentPageSize,
          };
          return this.commodityService.getCommodities();
        }),
        map(data => {
          this.length = data.body['totalElements'];
          return data.body['content'];
        }),
        catchError(() => {
          return of([]);
        })
      )
      .subscribe((data: Commodity[]) => {
        this.commodities = data;
      });
  }
}
