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

  addEvent(eventType: string, selector: string, callback: (event: Event) => void ) {
    const children = [...this.$target.querySelectorAll(selector)];
    this.$target.addEventListener(eventType, event => {
      if (event && event.target instanceof HTMLElement && !event.target.closest(selector)) return false;
      callback(event)
    })
  }
}