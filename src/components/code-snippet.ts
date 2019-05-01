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

class CodeSnippet extends BaseView {
  @property({ type: String })
  private markdown = '';

  render() {
    return html`
      <style>
        .code-snippet {
          margin-top: 50px;
          font-size: 1rem;
        }
      </style>

      <div class="code-snippet">
        ${unsafeHTML(md.render(this.markdown))}
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();

    // tslint:disable max-line-length
    const gist = await fetch('https://gist.githubusercontent.com/mihansweatpants/9e5e169eb0d6b8a10173612fd78d51c3/raw/75b067c64cd18462db771b459fa18698c1fa5f7e/test-gist.md');
    this.markdown = await gist.text();
  }
}

customElements.define('code-snippet', CodeSnippet);
