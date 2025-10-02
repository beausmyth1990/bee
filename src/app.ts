// @ts-ignore
import './components/alert.ts';

customElements.define(
    'beau-app',
    class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }

        connectedCallback() {
            this.shadowRoot!.innerHTML =
                /* HTML */
                `<div id="app">
                    <beau-alert type="success">
                        <p slot="message">Hello world!</p>
                    </beau-alert>
                </div>`;
        }
    }
);
