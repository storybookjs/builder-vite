import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './simplegreeting.scss';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = [style];

  @property()
  name = 'Somebody';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
