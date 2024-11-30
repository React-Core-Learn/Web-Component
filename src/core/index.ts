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

    this.render()
    this.setup()
    this.mounted()
  }

  abstract template(): string

  setup() {}

  render() {
    this.target.innerHTML = this.template()
    this.mounted()
  }

  setState(newState: State) {
    if (this.state) {
      this.state = { ...this.state, newState }
      this.render()
    }
  }

  mounted() {}
}
