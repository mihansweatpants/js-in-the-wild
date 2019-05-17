import { html, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { BaseView } from '~/views/base-view';

import { md } from './markdownRenderer';

class MarkdownBlock extends BaseView {
  @property({ type: String })
  private content: string;

  render() {
    return html`
      <style>
        .markdown-block {
          margin-top: 50px;
          font-size: 1rem;
        }
      </style>

      <div class="markdown-block">
        ${unsafeHTML(md.render(this.content))}
      </div>
    `;
  }
}

customElements.define('markdown-block', MarkdownBlock);
