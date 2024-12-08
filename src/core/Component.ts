type TComponentData = Record<string, any>

export default class Component<Props = TComponentData, State = TComponentData> {
  $target: HTMLElement;
  props: Props;
  state: State;
  isMounted: boolean;

  constructor($target: HTMLElement, props: Props) {
    this.$target = $target;
    this.props = props;
    this.state = {} as State;
    this.isMounted = false;
    this.setEvent();
    this.setup();
    this.render();
  }
  setup() { };
  mounted() {
    if (!this.isMounted) {
      console.log(this.mounted)
      this.isMounted = true;
    }
  };
  template() { return ''; }
  render() {
    this.$target.innerHTML = this.template();
    !this.isMounted && this.mounted()
  }
  setEvent() { }
  setState(newState: State) {
    this.state = { ...this.state, ...newState };
    this.render()
  }

  addEvent<T extends Event>(eventType: keyof HTMLElementEventMap, selector: keyof HTMLElementTagNameMap | string, callback: (event: T) => void ) {
    this.$target.addEventListener(eventType, event => {
      if (event && event.target instanceof HTMLElement && !event.target.closest(selector)) return false;
      callback(event as T)
    })
  }
}