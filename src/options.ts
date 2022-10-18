import 'webext-base-css';
import './options.css';

import optionsStorage from './options-storage';

const rangeInputs = [...document.querySelectorAll('input[type="range"][name^="color"]')] as HTMLInputElement[];
const numberInputs = [...document.querySelectorAll('input[type="number"][name^="color"]')] as HTMLInputElement[];
const output = document.querySelector('.color-output');

function updateOutputColor() {
	if (output) {
		(output as HTMLElement).style.backgroundColor = `rgb(${rangeInputs[0].value}, ${rangeInputs[1].value}, ${rangeInputs[2].value})`;
	}
}

function updateInputField(event: Event) {
	if (event.currentTarget) {
		const current = event.currentTarget as HTMLInputElement;
		(numberInputs[rangeInputs.indexOf(current)] as HTMLInputElement).value = (current).value;
	}
}

for (const input of rangeInputs) {
	input.addEventListener('input', updateOutputColor);
	input.addEventListener('input', updateInputField);
}

async function init() {
	await optionsStorage.syncForm('#options-form');
	updateOutputColor();
}

init().catch((e) => {
	console.log(e);
});
