import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class extends Component {
  @action
  destroyContainer() {
    this.args.showContainer(false);
  }
}
