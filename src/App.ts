import Component from "./core/Component";
import Items from "./components/Items";
import ItemAppender from "./components/ItemAppender";
import ItemFilter from "./components/ItemFilter";

interface IItem {
  id: number;
  content: string;
  active: boolean;
}

export default class App extends Component {
  setup() {
    this.state = { isFilter: 0, items: [{ id: 1, content: 'item1', active: false }, { id: 2, content: 'item2', active: true }] }
  }

  template() {
    return `    
      <header data-component="item-appender"></header>
        <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `
    // 컴포넌트 분할 전
    // return `
    // <header>
    //   <input type="text" class="appender" placeholder="아이템 내용 입력">
    // </header>
    // <main>
      // <ul>
      //   ${this.filteredItems.map(({ id, content, active }) =>
      // `<li data-id="${id}">
      //       ${content}
      //       <button class="toggleButton" data-id="${id}" style="color: ${active ? '#09F' : '#F09'}">
      //         ${active ? '활성' : '비활성' }
      //       </button>
      //       <button class="deleteButton" data-id="${id}">삭제</button>
      //     </li>`).join('')}
      // </ul>
    // </main>
    // <footer>
      // <button class="filterButton" data-is-filter="0">전체 보기</button>
      // <button class="filterButton" data-is-filter="1">활성 보기</button>
      // <button class="filterButton" data-is-filter="2">비활성 보기</button>
    // </footer>
    // `
  }

  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector('[data-component="item-appender"]')
    const $items = this.$target.querySelector('[data-component="items"]')
    const $itemFilter = this.$target.querySelector('[data-component="item-filter"]')

    new ItemAppender(($itemAppender as HTMLElement), {
      addItem: addItem.bind(this)
    })

    new Items(($items as HTMLElement), {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this)
    })

    new ItemFilter(($itemFilter as HTMLElement), {
      filterItem: filterItem.bind(this)
    })
  }

  get filteredItems(): IItem[] {
    const { isFilter, items } = this.state;
    return items.filter(({ active }: { active: boolean }) => (isFilter === 1 && active) || (isFilter === 2 && !active) || (isFilter === 0) )
  }

  addItem(content: string) {
    const { items } = this.state;
    const id = Math.max(0, ...items.map((v: IItem) => v.id)) + 1;
    const active = false;
    this.setState({
      items: [
        ...items,
        {id, content, active}
      ]
    })
  }

  deleteItem(id: number) {
    const items = [...this.state.items];
    const index = items.findIndex(item => item.id === id)
    items.splice(index, 1)
    this.setState({ items })
  }

  toggleItem(id: number) {
    const items = [...this.state.items];
      const index = items.findIndex(v => v.id === id);
      items[index].active = !items[index].active;
    this.setState({ items })
  }

  filterItem(isFilter: number) {
    this.setState({ isFilter })
  }

  // 컴포넌트 분할 전
  // setEvent() {
    //   this.addEvent<KeyboardEvent>('keyup', '.appender', (event) => {
    //     const { key, target } = event
    //     if (key !== 'Enter') return;
    //     const { items } = this.state;
    //     const id = Math.max(0, ...items.map((v: IItem) => v.id)) + 1;
    //     const content = (target as HTMLInputElement)?.value;
    //     const active = false;
    //     this.setState({
    //       items: [
    //         ...items,
    //         {id, content, active}
    //       ]
    //     })
    //   })

    // this.addEvent('click', '.deleteButton', ({ target }) => {
    //   const items = [...this.state.items];
    //   if (target instanceof HTMLElement && target.dataset.id) {
    //     const id = Number(target?.dataset?.id)
    //     const index = items.findIndex(item => item.id === id)
    //     items.splice(index, 1)
    //     this.setState({ items })
    //   }
    // })

    // this.addEvent('click', '.toggleButton', ({ target }) => {
    //   const items = [...this.state.items];
    //   if (target instanceof HTMLElement && target.dataset.id) {
    //     const id = Number(target?.dataset?.id)
    //     const index = items.findIndex(v => v.id === id);
    //     items[index].active = !items[index].active;
    //   }
    //   this.setState({ items })
    // })

    // this.addEvent('click', '.filterButton', ({ target }) => {
    //   if (target instanceof HTMLElement && target.dataset.isFilter) {
    //     this.setState({ isFilter: Number(target.dataset.isFilter) })
    //   }
  // })

    // 이벤트 버블링 추상화 적용한 코드
    // this.addEvent('click', '.addButton', ({ target }) => {
    //   const items = [...this.state.items];
    //   this.setState({ items: [...items, `item${items.length + 1}`] })
    // })
    // this.addEvent('click', '.deleteButton', ({ target }) => {
    //   const items = [...this.state.items];
    //     if (target instanceof HTMLElement && target.dataset.index) {
    //       items.splice(Number(target?.dataset?.index), 1)
    //     }
    //   this.setState({ items })
    // })
    // 이벤트 버블링 적용한 코드
    // this.$target.addEventListener('click', ({ target }) => {
    //   if (!target || !(target instanceof HTMLElement)) return;
    //   const items = [...this.state.items];

    //   if (target && target.classList && target.classList.contains('addButton')) {
    //     this.setState({ items: [...items, `item${items.length + 1}`] })
    //   }

    //   if (target && target.classList && target.classList.contains('deleteButton')) {
    //     if (target instanceof HTMLElement && target.dataset.index) {
    //           items.splice(Number(target?.dataset?.index), 1)
    //         }
    //     this.setState({ items })
    //   }
    // })
  
    // 이벤트 버블링 적용 전 코드
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