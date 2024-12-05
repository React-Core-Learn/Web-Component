import Component from "../core/Component";

export default class ItemAppender extends Component {
  template() {
    return `
      <input type="text" class="appender" placeholder="아이템 내용 입력">
    `
  }

  setEvent() {
    const { addItem } = this.props
    this.addEvent<KeyboardEvent>('keyup', '.appender', (event) => {
      const { key, target } = event
      if (key !== 'Enter') return;
      addItem((target as HTMLInputElement)?.value)
    })
  }
}