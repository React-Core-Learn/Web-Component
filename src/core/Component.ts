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
  isMounted: boolean;

  constructor($target: HTMLElement, props: IProps = {}) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.isMounted = false;
    this.setEvent();
    this.setup();
    this.render();
  }
  setup() { };
  mounted() {
    if (!this.isMounted) {
      this.isMounted = true;
    }
  };
  template() { return ''; }
  render() {
    this.$target.innerHTML = this.template();
    !this.isMounted && this.mounted()
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