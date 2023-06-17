import { LitElement, css, html } from 'lit'
import star from './assets/estrella.png'
import fullStar from './assets/estrella_llena.png'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      stars: { type: Number },
      fullPrice: { type: Number },
      discountPrice: { type: Number },
      discount: { type: Number },
    }
  }


  constructor() {
    super()
    this.stars = 0;
    this.fullPrice = 0;
    this.discountPrice = 0;
    this.discount = 0;

  }

  updated(changedProperties) {
    if (changedProperties.has('fullPrice') || changedProperties.has('discountPrice')) {
      this.discount = this.discountPrice/this.fullPrice ;
    }
  }

  setStar(star) {
    this.stars = star;
    console.log(this.stars);
  }

  render() {
    return html`
    <html>

    <head>
      <meta charset="UTF-8">
      <title>Star rating using pure CSS</title>
    </head>
    
    <body>
    <slot></slot>
      <div class="rate">
        <input type="radio" id="star5" name="rate" value="5" @click="${() => this.setStar(5)}"/>
        <label for="star5" title="text">5 stars</label>
        <input  type="radio"id="star4" name="rate" value="4" @click="${() => this.setStar(4)}"/>
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" @click="${() => this.setStar(3)}"/>
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" @click="${() => this.setStar(2)}"/>
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" @click="${() => this.setStar(1)}"/>
        <label for="star1" title="text">1 star</label>
      </div>
      <br>
      <div class = "price">
        <p>Full price: ${this.fullPrice}</p>
        <p>Discount price: ${this.discountPrice}</p>
        <p>Discount: ${this.discount * 100}%</p>
      </div>
    </body>
    
    </html>
    `
  }

  static get styles() {
    return css`
    *{
      margin: 0;
      padding: 0;
  }
  .rate {
      float: left;
      height: 2rem;
      padding: 0 10px;
      margin: 2rem;
  }
  .price {
    float: left;
    padding: 0 10px;
    background-color: lightblue;
}
  .rate:not(:checked) > input {
      position:absolute;
      top:-9999px;
  }
  .rate:not(:checked) > label {
      float:right;
      width:1em;
      overflow:hidden;
      white-space:nowrap;
      cursor:pointer;
      font-size:30px;
      color:#ccc;
  }
  .rate:not(:checked) > label:before {
      content: '★ ';
  }
  .rate > input:checked ~ label {
      color: #ffc700;    
  }
  .rate:not(:checked) > label:hover,
  .rate:not(:checked) > label:hover ~ label {
      color: #deb217;  
  }
  .rate > input:checked + label:hover,
  .rate > input:checked + label:hover ~ label,
  .rate > input:checked ~ label:hover,
  .rate > input:checked ~ label:hover ~ label,
  .rate > label:hover ~ input:checked ~ label {
      color: #c59b08;
  }
    `
  }
}

window.customElements.define('my-element', MyElement)
