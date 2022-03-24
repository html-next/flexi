import Component from '@glimmer/component';

let ID = 0;
export default class extends Component {
  id = `has-model-instance-${ID++}`;
}
