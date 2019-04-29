import { html } from 'lit-element';
import { BaseView } from './base-view';

class HomeView extends BaseView {
  render() {
    return html`
      <div>Page</div>
    `;
  }
}

customElements.define('home-view', HomeView);
