import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableColumn } from 'src/app/interfaces/table-column';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comon-table',
  templateUrl: './comon-table.component.html',
  styleUrls: ['./comon-table.component.scss']
})
export class ComonTableComponent implements OnInit, AfterViewInit {

  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  currentPageData: any[] = [];
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;
  currentSortColumn: string;
  currentSortDirection: string = ''; // O 'desc' según tu preferencia
  isAgente: boolean = this.authService.isAgent() ? true : false;
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() isPdfs = false;
  @Input() tableColumns: TableColumn[] = [];
  @Input() rowActionIcon: string;
  @Input() paginationSizes: number[] = [5, 10, 15, 30];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() export: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() downloadPdf: EventEmitter<any> = new EventEmitter<any>();
  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    private authService: AuthService
  ) {
    this.matPaginatorIntl.itemsPerPageLabel = 'Elementos por página:';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
    this.matPaginatorIntl.previousPageLabel = 'Página anterior';
    this.matPaginatorIntl.firstPageLabel = 'Primera página';
    this.matPaginatorIntl.lastPageLabel = 'Última página';
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [...columnNames, this.rowActionIcon];
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
    if (this.isFilterable) {
      setTimeout(() => {
        const itemsPerPage = this.tableDataSource.paginator.pageSize;
        const currentPageIndex = this.tableDataSource.paginator.pageIndex;
        const startIndex = currentPageIndex * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        this.currentPageData = this.tableDataSource.data.slice(startIndex, endIndex);
      }, 20);
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPageData = this.tableDataSource.filteredData;
  }


  exportAction(row: any) {
    // Emit the current page data
    this.export.emit(this.currentPageData);
  }

  editAction(row: any) {
    this.edit.emit(row);
  }

  deleteAction(row: any) {
    this.delete.emit(row);
  }
  downloadPdfAction(row: any) {
    this.downloadPdf.emit(row);
  }
  handlePageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.currentPageData = this.tableDataSource.data.slice(startIndex, endIndex);
  }

}
