import { html, property } from 'lit-element';
import { BaseView } from './base-view';

import '~/components/code-example';

class ListView extends BaseView {
  @property({ type: Array })
  private list;

  render() {
    if (this.list == null) {
      return html`
        <div>loading...</div>
      `;
    }

    return html`
      <div>
        ${this.list.map(
          markup => html`
            <code-example markup="${markup}"></code-example>
          `,
        )}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.fetchGists();
  }

  fetchGists = async () => {
    const response = await fetch('/api/gists');
    const gists = await response.json();

    this.list = gists;
  }
}

customElements.define('list-view', ListView);
