import { LitElement, css, html } from 'lit'

export class MyElement extends LitElement {
  static get properties() {
    return {
      stars: { type: Number },
      price: { type: Number },
      discountPrice: { type: Number },
      discount: { type: Number },
    }
  }


  constructor() {
    super()
    this.stars = 0;
    this.price = 0;
    this.discountPrice = 0;
    this.discount = 0;
  }

  updated(changedProperties) {
    if (changedProperties.has('price') || changedProperties.has('discountPrice')) {
      this.discount = (this.price-this.discountPrice)/this.price;
    }
  }

  setStar(star) {
    this.stars = Math.floor((this.stars + star)/2);
  }


  render() {
    return html`
    <html>

    <head>
      <meta charset="UTF-8">
      <title>Elementos with</title>
    </head>
    
    <body>
    <div class="container">
      <div class = "price">
        <p>${Math.floor(this.discount * 100)}% OFF</p>
      </div>
      <br>
     <slot></slot>
        <div class="rate">
        <input type="radio" id="star5" name="rate" value="5" @click="${() => this.setStar(5)}" ?checked="${this.stars === 5}"/>
        <label for="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" @click="${() => this.setStar(4)}" ?checked="${this.stars === 4}"/>
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" @click="${() => this.setStar(3)}" ?checked="${this.stars === 3}"/>
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" @click="${() => this.setStar(2)}" ?checked="${this.stars === 2}"/>
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" @click="${() => this.setStar(1)}" ?checked="${this.stars === 1}"/>
        <label for="star1" title="text">1 star</label>
      </div>
      
    </body>
    </div>
    </html>
    `
  }

  static get styles() {
    return css`
    *{
      margin: 0;
      padding: 0;
      
  }
  .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      padding: 2rem;
      border: 1px solid black;
      border-radius: 10px;
      flex-wrap: wrap;
      color: black;
      width: 20rem;
      height: 45rem;
  }
  .rate {
      height: 2rem;
      padding: 0 10px;
      margin: 2rem;
  }
  .price {
    height: 2rem;
    padding: 0 10px;
    background-color: lightgreen;
    justify-content: center;
    color: black;
}
  .rate:not(:checked) > input {
      position:absolute;
      left:-9999px;
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
