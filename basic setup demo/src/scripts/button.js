export const addButton = () => {
	const main = document.querySelector('main');

	const button = document.createElement("button");
	button.textContent = "Click me";

	button.addEventListener("click", () => {
		console.log("button clicked");
	})

	main.appendChild(button);
}

export const deleteButton = () => {
	const button = document.querySelector('button');

	document.deleteElement(button);
}