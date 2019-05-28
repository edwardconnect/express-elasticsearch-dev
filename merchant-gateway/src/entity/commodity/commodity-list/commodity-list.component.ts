import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Commodity } from '../commodity.model';
import { MatPaginator, MatDialog } from '@angular/material';
import { merge, of, Subscription } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { CommodityService } from '../commodity.service';
import { CommodityEditComponent } from '../commodity-edit/commodity-edit.component';
import { FormControl } from '@angular/forms';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-commodity-list',
  templateUrl: './commodity-list.component.html',
  styleUrls: ['./commodity-list.component.sass']
})
export class CommodityListComponent implements OnInit {
  commodities: Commodity[] = [];
  searchFormControl = new FormControl()

  /* Table paginator */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['name', 'description']
  pageSizeOptions = [10, 20, 30];
  length = 0;
  updateTableEventEmitter: EventEmitter<any> = new EventEmitter();

  /* Font-awesome icons */
  faSearch = faSearch;
  faTimes = faTimes;

  constructor(
    private commodityService: CommodityService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.updateTableView();
  }

  private updateTableView() {
    merge(this.paginator.page, this.updateTableEventEmitter)
      .pipe(
        startWith({}),
        switchMap(() => {
          const currentPageSize = this.paginator.pageSize === undefined ? this.pageSizeOptions[0] : this.paginator.pageSize;
          const searchReq = {
            page: this.paginator.pageIndex,
            size: currentPageSize,
          };
          if (this.searchFormControl.value) {
            searchReq['queryString'] = this.searchFormControl.value;
          }
          
          return this.commodityService.getCommodities(searchReq);
        }),
        map(res => {
          this.length = +res.headers.get('X-total-count');
          return res.body;
        }),
        catchError(() => {
          return of([]);
        })
      )
      .subscribe((data: Commodity[]) => {
        console.log(this.length)
        this.commodities = data;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommodityEditComponent, {
      width: '450px',
      minHeight: '510px'
    });


    dialogRef.afterClosed().subscribe(result => {
      this.commodityService.createCommodity(result).subscribe(res => {
        console.log(res);
      })
    })
  }

  search() {
    this.updateTableEventEmitter.emit();
  }
}
