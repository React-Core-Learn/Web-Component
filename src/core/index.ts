type ComponentInternalRecord = Record<string, any>

interface ComponentOptions<TElement = HTMLElement, Props = any, State extends ComponentInternalRecord = ComponentInternalRecord> {
  target: TElement
  props?: Props
  state?: State
}

export default abstract class Component<
  TElement extends HTMLElement,
  Props = any,
  State extends ComponentInternalRecord = ComponentInternalRecord
> {
  target: TElement
  props?: Props
  private _state?: State

  constructor({ target, props, state = {} as State }: ComponentOptions<TElement, Props, State>) {
    this.target = target
    this.props = props
    this._state = state

    this.setup()
    this.render()
    this.setEvent()
  }

  setup() {}

  get state() {
    return this._state!
  }

  set state(newState: State) {
    if (this._state) {
      this._state = { ...this._state, ...newState }
      this.render()
    }
  }

  setState(newState: State) {
    if (this._state) {
      this._state = { ...this._state, ...newState }
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
