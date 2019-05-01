import { html } from 'lit-element';
import { BaseView } from './base-view';

import '~/components/code-snippet';

class HomeView extends BaseView {
  render() {
    return html`
      <div>
        <code-snippet></code-snippet>
        <code-snippet></code-snippet>
        <code-snippet></code-snippet>
      </div>
    `;
  }
}

customElements.define('home-view', HomeView);
