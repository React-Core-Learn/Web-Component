import Component from "../core/Component";

export default class Items extends Component {
  setup() {
    this.state = { items: ['item1', 'item2'] }
  }

  template() {
    const { items } = this.state;
    return `
    <ul>
      ${items.map((item: any, key: number) =>
        `<li>
          ${item}
          <button class="deleteButton" data-index="${key}">삭제</button>
        </li>`).join('')}
    </ul>
    <button class="addButton">추가</button>
    `
  }

  
  setEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      if (!target || !(target instanceof HTMLElement)) return;
      const items = [...this.state.items];

      if (target && target.classList && target.classList.contains('addButton')) {
        this.setState({ items: [...items, `item${items.length + 1}`] })
      }

      if (target && target.classList && target.classList.contains('deleteButton')) {
        if (target instanceof HTMLElement && target.dataset.index) {
              items.splice(Number(target?.dataset?.index), 1)
            }
        this.setState({ items })
      }
    })
    //이벤트 버블링 적용 전 코드
    // this.$target.querySelectorAll('.deleteButton')?.forEach(deleteButton => deleteButton?.addEventListener('click', ({target}) => {
    //   const items  = [...this.state.items];
    //   if (target instanceof HTMLElement && target.dataset.index) {
    //     items.splice(Number(target?.dataset?.index), 1)
    //   }
    //   this.setState({ items })
    // }))
    // this.$target.querySelector('.addButton')?.addEventListener('click', () => {
    //   const { items } = this.state;
    //   this.setState({ items: [...items, `item${items.length + 1}`] })
    // })
  }
}