import { Component, UX, ViewModel, ViewState } from 'squid-uxui';

UX.define('squid.table', class extends Component {
  // @ts-ignore
  private tableVm: ViewModel;
  private defaultCellType: ViewState = {
    ux: 'bootstrap.paragraph'
  };

  buildViewState (viewState: {
    ux: 'squid.table' | 'squid-table';
    cssClass?: string;
    defaultCellType?: ViewState
  }): ViewState[] {
    if (viewState.defaultCellType) this.defaultCellType = viewState.defaultCellType;

    return [{
      ux: 'squid.table.table',
      items: {
        columns: [],
        rows: []
      }
    }];
  }

  onComponentReady () {
    this.tableVm = this.vm.down('squid.table.table')?.[0] as ViewModel;
  }

  addColumn (name: string | ViewState) {
    this.tableVm.addItem({
      ux: 'squid.table.column',
      name: (typeof name === 'string') ? name : undefined,
      items: (typeof name === 'string') ? [] : [name]
    }, { itemFor: 'columns' });

    this.vm.down('squid.table.row')?.forEach(row => {
      row.addItem({
        ux: 'squid.table.cell',
        items: [this.defaultCellType]
      });
    });
  }

  deleteColumn (col?: number): void {
    col = col ?? this.tableVm.getItems('columns').length - 1;
    this.tableVm.removeItem(col, { itemFor: 'columns' });

    for (const row of this.vm.down('squid.table.row') ?? []) {
      row.removeItem(col);
    }
  }

  addRow (cellType: ViewState = this.defaultCellType) {
    this.tableVm.addItem({
      ux: 'squid.table.row',
      items: new Array(this.tableVm.getItems('columns').length)
        .fill({
          ux: 'squid.table.cell',
          items: [cellType]
        })
    }, { itemFor: 'rows' });
  }

  deleteRow (row?: number): void {
    const rows = this.tableVm.getItems('rows');
    row = row ?? rows.length - 1;
    this.tableVm.removeItem(row, { itemFor: 'rows' });
  }

  updateCell (value: ViewState, row: number, col: number): ViewModel {
    const cell = this.tableVm.getItems('rows')[row]?.getItems()[col];
    if (!cell) {
      throw Error(`No cell at row: ${row}, col: ${col}`);
    }
    return cell.addItem(value);
  }

  getCell (row: number, col: number): ViewModel | undefined {
    return this.tableVm.getItems('rows')[row]?.getItems()[col];
  }
});
