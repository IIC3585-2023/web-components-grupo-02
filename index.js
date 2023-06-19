import { html, render } from 'lit';

import { products } from './src/data';
import './src/my-element';

const template = html`
  ${products.map(product => html`
    <my-element price="${product.price}" discountPrice="${product.discountPrice}" stars="${product.stars}">
    <div id="product-div">
      <img src="${product.image}" alt="${product.name}" style="height: auto; width: 20rem"/>
      <h2>${product.name}</h2>
      <h3>Old Price: ${product.price}$</h3>
      <h3>Discount New Price: ${product.discountPrice}$</h3>
    </div>
    
    </my-element>
  `)}
`;

render(template, document.getElementById('product-div'));