import { html, property } from 'lit-element';
import { BaseView } from './base-view';

import '~/components/code-example';

class ExamplesList extends BaseView {
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

  async connectedCallback() {
    super.connectedCallback();

    console.log(await this.fetchGists());
  }

  fetchGists = async () => {
    const response = await fetch('/api/gists');
    const gists = await response.json();

    this.list = gists;
  }
}

customElements.define('examples-list', ExamplesList);
