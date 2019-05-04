import { html, property } from 'lit-element';
import { BaseView } from './base-view';

import '~/components/markdown-block';

class ListView extends BaseView {
  @property({ type: Array })
  private list;

  render() {
    if (this.list == null) {
      return html`
        <style>
          .placeholder {
            color: var(--yellow);
            font-size: 30px;
            white-space: nowrap;
            font-weight: 700;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        </style>
        <div class="placeholder">Fetching some code</div>
      `;
    }

    return html`
      <div>
        ${this.list.map(markup => html`<markdown-block content="${markup}" />`)}
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
