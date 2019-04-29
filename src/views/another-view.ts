import { html } from 'lit-element';
import { BaseView } from './base-view';

class AnotherView extends BaseView {
  render() {
    return html`
      <div>another page</div>
    `;
  }
}

customElements.define('another-view', AnotherView);
