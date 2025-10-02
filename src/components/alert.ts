export type type = 'success' | 'warning' | 'error';

export default class Alert extends HTMLElement {
    private readonly type: type;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Set the role as 'alert', as per w3.org pattern guide
        this.setAttribute('role', 'alert');
        this.type = this.getAttribute('type') as type;
    }

    connectedCallback() {
        this.shadowRoot!.innerHTML =
            /* HTML */
            `
                <div>
                    <slot name="message"></slot>
                </div>
                <div>
                    <button aria-label="close">x</button>
                </div>

                <style>
                    div {
                        padding: 0.25rem;
                        cursor: default;
                    }
                    button {
                        transition: background-color 0.5s ease-out;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: var(
                            ${'--beau-alert-background-color-' + this.type}
                        );
                    }
                    :host {
                        top: 0;
                        right: 0;
                        margin: 1rem;
                        display: flex;
                        position: absolute;
                        flex-direction: row;
                        background-color: var(
                            ${'--beau-alert-background-color-' + this.type}
                        );
                    }
                </style>
            `;

        this.shadowRoot!.querySelector('button')?.addEventListener(
            'click',
            this
        );
    }

    handleEvent(evt: Event) {
        // @ts-ignore
        this[`${evt.type}Handler`](evt);
    }

    clickHandler(evt: Event) {
        if (evt.target instanceof HTMLButtonElement) {
            evt.stopPropagation();
            this.remove();
        }
    }
}

customElements.define('beau-alert', Alert);
