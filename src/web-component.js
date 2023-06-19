export class TreeItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.isOpen = false;
    }
  
    connectedCallback() {
      this.render();
      this.addEventListeners();
    }
  
    render() {
      const text = this.firstChild.textContent.trim();
      const isLastLevel = this.children.length === 0;
  
      const toggleIconStyle = isLastLevel ? 'display: none;' : '';
  
      const toggleIconContent = this.isOpen ? '\u2304' : '\u203A';
  
      const template = `
        <style>
          .tree-item {
            position: relative;
          }
          .tree-item ul {
            list-style-type: none;
            padding-left: 20px;
          }
          .tree-item .toggle-icon {
            display: inline-block;
            margin-right: 5px;
          }
          .tree-item .content {
            display: inline-block;
          }
          .tree-item.opened > .toggle-icon::before {
            content: '\u2304';
          }
          .tree-item.closed > .toggle-icon::before {
            content: '\u203A';
          }
          .tree-item.closed > ul {
            display: none;
          }
          .tree-item:hover:not(.ancestor-hover) {
            position: relative;
          }
          .tree-item .content:hover {
            background-color: #e0e0e0;
          }
          .node {
            position: relative;
            padding: 5px;
          }
          .node:hover {
            background-color: #e0e0e0;
            color: black;
          }
        </style>
        <div class="tree-item ${this.isOpen ? 'opened' : 'closed'}">
          <div class="node">
            <span class="toggle-icon" style="${toggleIconStyle}"></span>
            <span class="content">${text}</span>
          </div>
          <ul></ul>
        </div>
      `;
  
      this.shadowRoot.innerHTML = template;
  
      const toggleIconElement = this.shadowRoot.querySelector('.toggle-icon');
      toggleIconElement.textContent = toggleIconContent;
  
      // Renderizar los elementos hijos recursivamente
      const ulElement = this.shadowRoot.querySelector('ul');
      const childNodes = Array.from(this.children);
      childNodes.forEach(childNode => {
        const liElement = document.createElement('li');
        liElement.appendChild(childNode);
        ulElement.appendChild(liElement);
      });
    }
  
    toggleChildren() {
      this.isOpen = !this.isOpen;
      const treeItemElement = this.shadowRoot.querySelector('.tree-item');
      treeItemElement.classList.toggle('opened');
      treeItemElement.classList.toggle('closed');
  
      const toggleIconElement = this.shadowRoot.querySelector('.toggle-icon');
      toggleIconElement.textContent = this.isOpen ? '\u2304' : '\u203a';
    }
  
    addEventListeners() {
      const toggleElement = this.shadowRoot.querySelector('.toggle-icon');
      toggleElement.addEventListener('click', (event) => {
        event.stopPropagation();
        this.toggleChildren();
      });
  
      const contentElement = this.shadowRoot.querySelector('.content');
      contentElement.addEventListener('mouseenter', () => {
        this.addAncestorHoverClass();
      });
  
      contentElement.addEventListener('mouseleave', () => {
        this.removeAncestorHoverClass();
        contentElement.style.color = '';
      });
    }
  
    addAncestorHoverClass() {
      let parent = this.parentNode;
      while (parent && parent.tagName.toLowerCase() === 'tree-item') {
        parent.classList.add('ancestor-hover');
        parent = parent.parentNode;
      }
    }
  
    removeAncestorHoverClass() {
      const ancestorHoverElements = this.shadowRoot.querySelectorAll('.ancestor-hover');
      ancestorHoverElements.forEach(element => {
        element.classList.remove('ancestor-hover');
      });
    }
  }
  
  window.customElements.define('tree-item', TreeItem);
  