/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
class Basket extends HTMLElement {
  static get observedAttributes() {return ['data-items-count']; }  
  
  constructor() {
      // Always call super first in constructor
      super();
  
      // Create a shadow root
      const shadow = this.attachShadow({ mode: 'open' }); // sets and returns 'this.shadowRoot'
  
      // Create (nested) span elements
      const wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'basket');

      const basketImage = document.createElement('img');
      basketImage.setAttribute('src', 'images/basket.png');
      basketImage.setAttribute('width', '50');
      basketImage.setAttribute('height', '50');
      basketImage.setAttribute('class', 'basket__image');
      basketImage.setAttribute('alt', 'basket');

      const basketCounterContainer = document.createElement('div');
      basketCounterContainer.setAttribute('class', 'basket__counter-container');
      
      const basketCounter = document.createElement('span');
      basketCounter.setAttribute('class', 'basket__counter');
      basketCounterContainer.appendChild(basketCounter);

      const itemsCount = this.getAttribute('data-items-count');
      basketCounter.innerHTML = itemsCount;

      wrapper.appendChild(basketImage);
      wrapper.appendChild(basketCounterContainer);
  
      // Apply external styles to the shadow dom
      const linkElem = document.createElement('link');
      linkElem.setAttribute('rel', 'stylesheet');
      linkElem.setAttribute('href', 'basket.css');
  
      // Attach the created element to the shadow dom
      shadow.appendChild(linkElem);
  
      // attach the created elements to the shadow DOM
      shadow.appendChild(wrapper);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.shadowRoot.querySelector('.basket__counter').textContent = newValue;
    }
  }
  
  customElements.define('basket-label', Basket);
  
/******/ })()
;
//# sourceMappingURL=basket.js.map