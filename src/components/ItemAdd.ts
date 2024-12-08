import Component from "../core/Component";

interface IItemAdd {
  addListItem: (content: string) => void;
}

export default class ItemAdd extends Component<IItemAdd> {
  template() {
    return `
      <input type="text" class="addListItem" placeholder="항목 입력">
    `
  }

  setEvent() {
    const { addListItem } = this.props
    this.addEvent<KeyboardEvent>('keyup', '.addListItem', (event) => {
      const { key, target } = event
      if (key !== 'Enter') return;
      addListItem((target as HTMLInputElement)?.value)
    })
  }
}