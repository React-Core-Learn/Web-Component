import Component from "../core"

export default class TodoInput extends Component<HTMLDivElement> {
  template(): string {
    return `
			 <form>
        <input type="text" />
        <button>Submit</button>
      </form>
		`
  }

  setEvent(): void {
    this.addEvent("submit", "form", (event) => {
      event.preventDefault()
      const inputElem = this.target.querySelector("input") as HTMLInputElement
      this.props.addTodo(inputElem.value)
    })
  }
}
