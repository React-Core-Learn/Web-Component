import Component from "./core"

import TodoInput from "./components/todo-Input"
import TodoList from "./components/todo-list"
import { Todo } from "./types"

interface TodoState {
  todos: Todo[]
}

class App extends Component<HTMLDivElement, {}, TodoState> {
  setup() {
    this.state = {
      todos: [],
    }
  }

  componentDidMount(): void {
    const todoInputElem = this.target.querySelector("#todo-input") as HTMLDivElement
    const todoListElem = this.target.querySelector("#todo-list") as HTMLUListElement

    new TodoInput({
      target: todoInputElem,
      props: {
        addTodo: this.addTodo.bind(this),
      },
    })

    new TodoList({
      target: todoListElem,
      props: {
        todos: this.state!.todos,
        deleteTodo: this.deleteTodo.bind(this),
        activeToggle: this.activeToggle.bind(this),
      },
    })
  }

  template(): string {
    return `
			<main>
				<div id="todo-input"></div>
      	<ul id="todo-list"></ul>
			</main>
		`
  }

  addTodo(title: string) {
    const newTodo = {
      id: Date.now(),
      title,
      isActive: false,
    } as Todo
    this.setState({ ...this.state, todos: [...this.state!.todos, { ...newTodo }] })
  }

  deleteTodo(todoId: number) {
    const filteredTodo = this.state!.todos.filter((todo) => todo.id !== todoId)
    this.setState({ todos: filteredTodo })
  }

  activeToggle(todoId: number) {
    const updateTodo = this.state!.todos.map((todo) => (todo.id === todoId ? { ...todo, isActive: !todo.isActive } : todo))
    this.setState({ todos: updateTodo })
  }
}

const rootElement = document.getElementById("app") as HTMLDivElement

if (rootElement) {
  new App({ target: rootElement })
}
