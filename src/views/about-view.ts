import { html } from 'lit-element';
import { BaseView } from './base-view';

class AboutView extends BaseView {
  render() {
    return html`
      <h1>Not found :(</h1>
    `;
  }
}

customElements.define('about-view', AboutView);
