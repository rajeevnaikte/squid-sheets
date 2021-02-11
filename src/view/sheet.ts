import { UI, ViewModel, ViewState } from 'squid-uxui';
import '../components/table';
import './styles.css';

const sheetView: ViewState = {
	ux:    'bootstrap.card',
	items: [
	  {
			ux:       'squid.table',
			cssClass: 'bordered-table'
		},
		{
			ux:    'bootstrap.btn-link',
			state: {
				text: 'Add column'
			},
			listeners: {
				click: (viewModel: ViewModel, event: Event) =>
				{
        viewModel.up('bootstrap.card')
          ?.down('squid.table')?.[0]
          .addColumn({
          	ux:        'bootstrap.paragraph',
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
        viewModel.up('bootstrap.card')
          ?.down('squid.table')?.[0].comp
          .deleteColumn();
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
        viewModel.up('bootstrap.card')
          ?.down('squid.table')?.[0].comp
          .deleteRow();
				}
			}
		}
	]
};

const genesis = UI.render(sheetView, 'root');
