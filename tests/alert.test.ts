// @ts-ignore
import { test, expect, beforeEach } from 'bun:test';
import Alert from '../src/components/alert';
import '../src/components/alert.ts';

beforeEach(() => {
    document.body.innerHTML = /* HTML */ ` <beau-alert></beau-alert> `;
});

test('role is set to alert', () => {
    // arrange
    const alert = document.body.querySelector('beau-alert')! as Alert;

    // assert
    expect(alert.role).toBe('alert');
});

test('removed from DOM on close', () => {
    // arrange
    const closeBtn = document.body
        .querySelector('beau-alert')!
        .shadowRoot!.querySelector('div button')!;

    // act
    closeBtn.dispatchEvent(new Event('click'));

    // assert
    expect(document.body.querySelector('beau-alert')).toBeNull();
});
