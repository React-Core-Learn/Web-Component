import App from './App'

class Main {
  constructor(){
    const $app: Element | null = document.querySelector('#app');
    if ($app instanceof HTMLElement) {
      new App($app, {});
    } else {
      console.error('Element with ID "app" not found.');
    }
  }
}

new Main()