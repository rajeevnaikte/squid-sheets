import { UI, ViewModel, ViewState } from 'squid-uxui';
import '../components/table';
import './styles.css';

const sheetView: ViewState = {
  ux: 'bootstrap.card',
  items: [{
    ux: 'squid.table',
    cssClass: 'bordered-table'
  }, {
    ux: 'bootstrap.btn-link',
    text: 'Add column',
    listeners: {
      click: (viewModel: ViewModel, event: Event) => {
        viewModel.up('bootstrap.card')
          ?.down('squid.table')?.[0].comp
          .addColumn({
            ux: 'bootstrap.paragraph',
            editable: true,
            listeners: {
              input (vm: ViewModel, e: Event) {
                console.log(e);
              }
            }
          });
      }
    }
  }, {
    ux: 'bootstrap.btn-link',
    text: 'Add Row',
    listeners: {
      click: (viewModel: ViewModel, event: Event) => {
        viewModel.up('bootstrap.card')
          ?.down('squid.table')?.[0].comp
          .addRow();
      }
    }
  }, {
    ux: 'bootstrap.btn-link',
    text: 'Delete column',
    listeners: {
      click: (viewModel: ViewModel, event: Event) => {
        viewModel.up('bootstrap.card')
          ?.down('squid.table')?.[0].comp
          .deleteColumn();
      }
    }
  }, {
    ux: 'bootstrap.btn-link',
    text: 'Delete Row',
    listeners: {
      click: (viewModel: ViewModel, event: Event) => {
        viewModel.up('bootstrap.card')
          ?.down('squid.table')?.[0].comp
          .deleteRow();
      }
    }
  }]
};

const genesis = UI.render(sheetView, 'root');
