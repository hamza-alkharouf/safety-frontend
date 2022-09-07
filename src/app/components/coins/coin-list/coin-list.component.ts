import { Component, OnInit, ViewChild } from '@angular/core';
import {CoinService} from "../../../services/coin.service";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Data {
  id: string;
  name: string;
  currency: string;
}

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  displayedColumns:string [] = ["id", "name", "currency"];

  value = '';

  ELEMENT_DATA: Data[] = [];
  isLoading = false;
  total = 0;
  pageSize = 5;
  page = 0;
  search !: string;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource: MatTableDataSource<Data> = new MatTableDataSource();

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  ngOnInit(): void {
    //Load initial data
    this.loadData();
  }

  loadData() {
    this.isLoading = true;


      this.coinService.coins(this.page+1,this.pageSize,this.search).subscribe({
        next: (data: any) => {
          console.log(data);

          this.dataSource.data = data.data;
          setTimeout(() => {
            this.paginator.pageIndex = this.page;
            this.paginator.length = data.total;
            this.pageSize = data.pageSize;

          });
          this.isLoading = false;
        },
        error: err => {
          console.log(err);
          this.isLoading = false;
        }
      });
  }


  constructor(
    private coinService: CoinService

  ) {

  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    console.log(this.pageSize);



    this.page = event.pageIndex;
    this.loadData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search=this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.search);
    this.loadData();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


  }
  clearSearch(){
    console.log("this.search");
    this.value =''
    this.search =''

    this.loadData();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}
