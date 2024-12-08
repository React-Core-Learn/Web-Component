import Component from "../core/Component";

interface IItem {
  id: number;
  content: string;
  active: boolean;
}

interface IListItems {
  filteredItems: IItem[];
  deleteItem: (id: number) => void;
  toggleItem: (id: number) => void;
}

export default class ListItems extends Component<IListItems> {
  template() {
    const { filteredItems } = this.props
    return `
      <ul>
        ${filteredItems.map(({ id, content, active }: IItem) =>
        `<li data-id="${id}">
            ${content}
            <button class="toggleButton" data-id="${id}" style="color: ${active ? '#09F' : '#F09'}">
              ${active ? '활성' : '비활성' }
            </button>
            <button class="deleteButton" data-id="${id}">삭제</button>
          </li>`).join('')}
      </ul>
    `
  }

  setEvent() {
    const { deleteItem, toggleItem } = this.props
    this.addEvent('click', '.deleteButton', ({ target }) => {
      if (target instanceof HTMLElement && target.dataset.id) {
        deleteItem(Number(target?.dataset?.id))
     }
    })

    this.addEvent('click', '.toggleButton', ({ target }) => {
      if (target instanceof HTMLElement && target.dataset.id) {
        toggleItem(Number(target?.dataset?.id))
      }
    })
  }
}