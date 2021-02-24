import { UI, ViewModel, ViewState } from 'squid-uxui';
import '../components/table';
import './styles.css';
import { isArray, isObjectLike } from 'lodash';

const tableViewModel = new ViewModel({
	ux:       'squid.table',
	cssClass: 'bordered-table'
});

const sheetView: ViewState = {
	ux:    'bootstrap.card',
	items: [
		tableViewModel,
		{
			ux:    'bootstrap.btn-link',
			state: {
				text: 'Add column'
			},
			listeners: {
				click: (viewModel: ViewModel, event: Event) =>
				{
						viewModel.up('bootstrap.card')?.down('squid.table')?.[0]
							.addColumn({
								ux:        'bootstrap.text-box',
								editable:  true,
								listeners: {
									input (vm: ViewModel, e: Event)
									{
										console.log(e);
									}
								}
							});
				}
			}
		},
		{
			ux:    'bootstrap.btn-link',
			state: {
				text: 'Add Row'
			},
			listeners: {
				click: (viewModel: ViewModel, event: Event) =>
				{
						viewModel.up('bootstrap.card')
							?.down('squid.table')?.[0]
							.addRow();
				}
			}
		},
		{
			ux:    'bootstrap.btn-link',
			state: {
				text: 'Delete column',
			},
			listeners: {
				click: (viewModel: ViewModel, event: Event) =>
				{
						viewModel.up('bootstrap.card')?.down('squid.table')?.[0].deleteColumn();
				}
			}
		},
		{
			ux:    'bootstrap.btn-link',
			state: {
				text: 'Delete Row'
			},
			listeners: {
				click: (viewModel: ViewModel, event: Event) =>
				{
						viewModel.up('bootstrap.card')?.down('squid.table')?.[0].deleteRow();
				}
			}
		}
	]
};

const genesis = UI.render({
	ux:    'bootstrap.grid.container',
	items: [
		{
			ux:    'bootstrap.grid.row',
			items: [
				{
					ux:    'bootstrap.grid.column',
					items: [
						{
							ux:    'bootstrap.text-box',
							state: {
								text: 'Squid Sheet'
							}
						},
						{
							ux:    'bootstrap.input.file-reader',
							state: {
								text: 'Upload JSON'
							},
							listeners: {
								read: (viewModel, event) =>
								{
									const json = JSON.parse(new TextDecoder('utf-8').decode((<CustomEvent>event).detail));

									if (isArray(json))
									{
										const columns: Set<string> = new Set<string>();
										const rows: any[][] = [];
										json.forEach((item, i) =>
										{
											if (isObjectLike(item))
											{
												Object.keys(item).forEach(key => columns.add(key));
												rows.push(Array.from(columns).map(column => item[column]));
											}
											else
											{
												columns.add('data');
												rows.push(Array.from(columns).map(column => column === 'data' ? item : undefined));
											}
										});

										columns.forEach(column => tableViewModel.addColumn(column));
										rows.forEach(() => tableViewModel.addRow());
										rows.forEach((row, i) =>
										{
											row.forEach((cell, j) => tableViewModel.getCell(i, j).getItems()[0].state.text = cell);
										});
									}
								}
							}
						}
					]
				}
			]
		},
		{
			ux:    'bootstrap.grid.row',
			items: [
				{
					ux:    'bootstrap.grid.column',
					items: [tableViewModel]
				}
			]
		}
	]
}, 'root');
