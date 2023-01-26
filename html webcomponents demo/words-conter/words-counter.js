class WordsCounter extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();
	  }
	  
	  render() {
		const template = ownerDoc.querySelector("#WordsCounterTemplate");

		const rootElement = template.content.cloneNode(true);

		const textString = this.childNodes[0].textContent || "";

		rootElement.querySelector("#Content").textContent = textString;

		const wordsCount = textString.split(" ").length;
		rootElement.querySelector("#WordsCount").innerText = wordsCount;

		this.shadowRoot.appendChild(rootElement);
		console.log("executed");
	  }
}

const ownerDoc = HTMLImports.importForElement(document.currentScript);

if(!customElements.get('words-counter'))
{
	customElements.define('words-counter', WordsCounter);
}


