import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { TableDataDirective } from 'src/app/shared/directives/table-data.directive';
import { DisplayedColumns } from 'src/app/shared/interfaces/DisplayedColumns.interface';
import { SortInfo } from 'src/app/shared/interfaces/sort-info.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource!: any;
  @Input() displayedColumns!: DisplayedColumns[];
  @Output() sort = new EventEmitter<SortInfo>();
  @Output() rowClick = new EventEmitter<any>();

  sortAsc = false;

  @ContentChildren(TableDataDirective)
  templates!: QueryList<TableDataDirective>;

  getContentChanges(column: string) {
    return this.templates.find((elem) => {
      return elem.appTableData === column;
    })?.templateRef;
  }

  emitSort(sortColumn: string) {
    this.sortAsc = !this.sortAsc;
    this.sort.emit({ sortDirection: this.sortAsc, colName: sortColumn });
  }
}
