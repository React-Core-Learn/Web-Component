import Component from "../core"
import { Todo } from "../types"

interface TodoListProps {
  todos: Todo[]
  deleteTodo: (todoId: number) => void
  activeToggle: (todoId: number) => void
}

export default class TodoList extends Component<HTMLUListElement, TodoListProps> {
  template(): string {
    const { todos } = this.props!
    return `
			${todos
        .map(
          (todo) => `
					<li data-id=${todo.id}>
						${todo.title}
						<button type="button" id="toggle-button" style="color: ${todo.isActive ? "#09F" : "#F09"}">
							${todo.isActive ? "비활성화" : "활성화"}
						</button>
						<button type="button" id="delete-button">삭제</button>
					</li>
				`
        )
        .join("")}
		`
  }

  getTodoId(element: HTMLElement): number {
    const todoId = Number((element.closest("[data-id]") as HTMLLIElement)!.dataset.id)
    return todoId
  }

  setEvent(): void {
    this.addEvent("click", "#toggle-button", (event) => {
      const todoId = this.getTodoId(event.target as HTMLElement)
      this.props!.activeToggle(todoId)
    })

    this.addEvent("click", "#delete-button", (event) => {
      const todoId = this.getTodoId(event.target as HTMLElement)
      this.props!.deleteTodo(todoId)
    })
  }
}
