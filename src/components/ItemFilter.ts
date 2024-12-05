import Component from "../core/Component";

interface IItemFilter {
  filterItem: (isFilter: number ) => void;
}

export default class ItemFilter extends Component {
  props: IItemFilter;

  constructor($target: HTMLElement, props: IItemFilter) {
    super($target, props);
    this.props = props;
  }

  template() {
    return `
      <button class="filterButton" data-is-filter="0">전체 보기</button>
      <button class="filterButton" data-is-filter="1">활성 보기</button>
      <button class="filterButton" data-is-filter="2">비활성 보기</button>
    `
  }

  setEvent() {
    const { filterItem } = this.props
    this.addEvent('click', '.filterButton', ({ target }) => {
      if (target instanceof HTMLElement && target.dataset.isFilter) {
        filterItem(Number(target.dataset.isFilter))
      }
    })
  }
}