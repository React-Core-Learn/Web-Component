interface IState {
  [key: string]: any;
}

interface IProps {
  [key: string]: any;
}

export default class Component {
  $target: HTMLElement;
  props: IProps;
  state: IState;

  constructor($target: HTMLElement, props: IProps = {}) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.setEvent();
    this.setup();
    this.render();
  }
  setup() { };
  mounted() { };
  template() { return ''; }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted()
  }
  setEvent() { }
  setState(newState: IState) {
    this.state = { ...this.state, ...newState };
    this.render()
  }

  addEvent<T extends Event>(eventType: string, selector: string, callback: (event: T) => void ) {
    this.$target.addEventListener(eventType, event => {
      if (event && event.target instanceof HTMLElement && !event.target.closest(selector)) return false;
      callback(event as T)
    })
  }
}