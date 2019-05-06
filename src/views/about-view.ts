import { html } from 'lit-element';
import { BaseView } from './base-view';

import '~/components/markdown-block';

const ABOUT_MD = `
# What is this
This is a place where I collect pieces of JavaScript \`<code/>\`
that I encounter out there 'in the wild' and find interesting. You get the idea.

Feel free to [send me](https://t.me/brsgn) some bits of JS that you think are interesting.

[github repo](https://github.com/mihansweatpants/js-in-the-wild)
`;

class AboutView extends BaseView {
  render() {
    return html`
      <markdown-block class="about" content="${ABOUT_MD}" />
    `;
  }
}

customElements.define('about-view', AboutView);
