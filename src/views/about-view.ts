import { html } from 'lit-element';
import { BaseView } from './base-view';

import '~/components/markdown-block';

const ABOUT_MD = `
# What is this
### TODO: write about
`;

class AboutView extends BaseView {
  render() {
    return html`
      <markdown-block class="about" content="${ABOUT_MD}" />
    `;
  }
}

customElements.define('about-view', AboutView);
