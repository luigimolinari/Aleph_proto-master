/**
template - material-table
 
Utilizzo:
nel template del componente padre dovranno essere specificati:
              [tableData]       -> i record della tabella 
              [tableColumns]    -> la configurazione delle colonne 
              [listActions]     -> l'abilitazione alle azioni standard (tableCase = 'general')
              [titleActions]     -> titoli delle azioni
              tableCase         -> general, per la gestione standard delle azioni
              [isFilterable]    -> (boolean) abilitazione del filtro
              [isPageable]      -> (boolean) abilitazione della paginazione
              [paginationSizes] -> (array) opzioni di pageSize
              [defaultPageSize] -> (string) pageSize di default
              (XAction)         -> evento che chiama il metodo X

Gli eventi standard sono:      
              viewAction     
              editAction
              orgAction
              deleteAction
              groupsOpAction
              groupsProcAction
              groupsFascAction

       
*/
import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter  } from '@angular/core';
import { faEye, faUserEdit,faClock,faUserSlash, faEdit, faTrash, faSitemap, faUserPlus, faList, faThumbsUp, faThumbsDown, faCode, faCubes, faRecycle, faBriefcase, faFolderOpen, faUsers } from '@fortawesome/free-solid-svg-icons';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSort,Sort} from '@angular/material/sort';

export interface TableColumn {
  name: string; // column name
  dataKey: string; // name of key of the actual data in this column - the same of SQL name that column refers
  position?: 'right' | 'left'; // should it be right-aligned or left-aligned?
  isSortable?: boolean; // can a column be sorted?
}

@Component({
  selector: 'app-aleph-table',
  templateUrl: './aleph-table.component.html',
  styleUrls: ['./aleph-table.component.css']
})
export class AlephTableComponent implements OnInit, AfterViewInit {

  faEye = faEye;
	faUserEdit = faUserEdit;
	faUserSlash = faUserSlash;
	faEdit = faEdit;
	faTrash = faTrash;
	faSitemap = faSitemap;
  faUserPlus = faUserPlus;
  faList = faList;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faCode = faCode;
  faCubes = faCubes;
  faRecycle = faRecycle;
  faBriefcase = faBriefcase;
  faFolderOpen = faFolderOpen;
  faUsers = faUsers;
  faClock = faClock;
  
  data;

  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort: MatSort;
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[];
  @Input() listActions;
  @Input() titleActions;
  @Input() tableCase: string;
  @Input() rowActionIcon: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() workflowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() editAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() orgAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() groupsOpAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() groupsProcAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() groupsFascAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() documentiEditAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() modelliEditAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() createFormAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() uncreateFormAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() gatewayFormAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() restoreFormAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() struttureAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() personeAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() tempiAction: EventEmitter<any> = new EventEmitter<any>();


  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.data = data;
    this.setTableDataSource(data);
  }

  constructor() {}

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon, ...columnNames]
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name

    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active).dataKey;
    //this.sort.emit(sortParameters);

    const data = this.data.slice();
		if (!sortParameters.active || sortParameters.direction === '') {
			this.data = data;
			return;
		}

		this.data = data.sort((a, b) => {
			const isAsc = sortParameters.direction === 'asc';
			return this.compare(a[sortParameters.active], b[sortParameters.active], isAsc);
		});

    this.setTableDataSource(this.data);

  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }

  emitViewAction(row: any){
    this.viewAction.emit(row);
  }

  emitViewAziendaAction(row: any){
    this.viewAction.emit(row);
  }

  emitWorkflowAction(row: any){
    this.workflowAction.emit(row);
  }

  emitTempiAction(row: any){
    this.tempiAction.emit(row);
  }

  emitEditAction(row: any){
    this.editAction.emit(row);
  }

  emitOrgAction(row: any){
    this.orgAction.emit(row);
  }

  emitDeleteAction(row: any){
    this.deleteAction.emit(row);
  }

  emitGroupsOpAction(row: any){
    this.groupsOpAction.emit(row);
  }

  emitGroupsProcAction(row: any){
    this.groupsProcAction.emit(row);
  }

  emitGroupsFascAction(row: any){
    this.groupsFascAction.emit(row);
  }

  emitDocumentiEditAction(row: any){
    this.documentiEditAction.emit(row);
  }

  emitModelliEditAction(row: any){
    this.modelliEditAction.emit(row);
  }

  emitCreateformAction(row: any){
     this.createFormAction.emit(row);
  }

  emitUnCreateformAction(row: any){
    this.uncreateFormAction.emit(row);
 }

 emitRestoreformAction(row: any){
  this.restoreFormAction.emit(row);
}

 emitGatewayformAction(row: any){
  this.gatewayFormAction.emit(row);
}

emitStruttureAction(row: any) {
  this.struttureAction.emit(row);
}

emitPersoneAction(row: any) {
  this.personeAction.emit(row);
}

}