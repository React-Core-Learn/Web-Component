interface ComponentOptions<TElement = HTMLElement, Props = any, State = any> {
  target: TElement
  props?: Props
  state?: State
}

export default abstract class Component<TElement extends HTMLElement, Props = any, State = any> {
  target: TElement
  props?: Props
  state?: State

  constructor({ target, props, state }: ComponentOptions<TElement, Props, State>) {
    this.target = target
    this.props = props
    this.state = state

    this.setup()
    this.render()
    this.setEvent()
  }

  setup() {}

  setState(newState: Partial<State>) {
    if (this.state) {
      this.state = { ...this.state, ...newState }
      this.render()
    }
  }

  abstract template(): string

  render() {
    this.target.innerHTML = this.template()
    this.componentDidMount()
  }

  componentDidMount() {}

  addEvent(eventType: keyof HTMLElementEventMap, selector: keyof HTMLElementTagNameMap | string, callback: EventListener) {
    this.target.addEventListener(eventType, (event) => {
      const target = event.target as HTMLElement
      if (target.closest(selector)) {
        callback(event)
      }
    })
  }

  setEvent() {}
}
