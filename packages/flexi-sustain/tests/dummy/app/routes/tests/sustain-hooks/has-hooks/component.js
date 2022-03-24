import { on } from '@ember/evented';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked willMoveTriggeredCount = 0;
  @tracked didMoveTriggeredCount = 0;

  @tracked willMoveEventCount = 0;
  @tracked didMoveEventCount = 0;

  didMove() {
    this.didMoveTriggeredCount++;
  }

  willMove() {
    this.willMoveTriggeredCount++;
  }

  _onDidMove = on('didMove', function () {
    this.didMoveEventCount++;
  });

  _onWillMove = on('willMove', function () {
    this.willMoveEventCount++;
  });
}
