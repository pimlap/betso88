'use babel';

import BtsoyyView from './btsoyy-view';
import { CompositeDisposable } from 'atom';

export default {

  btsoyyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.btsoyyView = new BtsoyyView(state.btsoyyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.btsoyyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'btsoyy:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.btsoyyView.destroy();
  },

  serialize() {
    return {
      btsoyyViewState: this.btsoyyView.serialize()
    };
  },

  toggle() {
    console.log('Btsoyy was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
