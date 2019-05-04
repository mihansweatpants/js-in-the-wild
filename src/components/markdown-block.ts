import { html, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

import { BaseView } from '~/views/base-view';

const md = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
      } catch (_) {}
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

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
