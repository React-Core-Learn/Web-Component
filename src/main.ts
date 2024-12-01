import Items from "./components/Items";

class Main {
  constructor(){
    const $main: Element | null = document.querySelector('#app');
    if ($main instanceof HTMLElement) {
      new Items($main);
    } else {
      console.error('Element with ID "app" not found.');
    }
  }
}

new Main()