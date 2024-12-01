interface IState {
  [key: string]: any;
}

export default class Component {
  $target: HTMLElement;
  state: IState;

  constructor($target: HTMLElement) {
    this.$target = $target;
    this.state = {};
    this.setEvent();
    this.setup();
    this.render();
  }
  setup() { };
  template() { return ''; }
  render() {
    this.$target.innerHTML = this.template();
  }
  setEvent() { }
  setState(newState: IState) {
    this.state = { ...this.state, ...newState };
    this.render()
  }
}