import Component from '@glimmer/component';

let ID = 0;
export default class extends Component {
  id = `tagless-instance-${ID++}`;
}
