/* Fichier à intégrer Front/Back ? */

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ICart {
  items: Product[];
}

const testProduit: Product[] = [
  {
    id: 2,
    name: 'Meuble déco',
    price: 23.99,
    description: 'Meuble décoratif pour salons',
  },

  {
    id: 3,
    name: 'Meuble tendance',
    price: 124,
    description: 'Meuble décoratif pour salons',
  },

  {
    id: 4,
    name: 'Meuble déco',
    price: 234,
    description: 'Meuble décoratif pour salons',
  },
];

class CartItem implements Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;

  constructor(product: Product, quantity: number) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.quantity = quantity;
    this.description = product.description;
  }

  calculateTotalHT(): number {
    console.log('Prix Total : ' + this.price * this.quantity);
    return this.price * this.quantity;
  }
}

class Cart implements ICart {
  items: CartItem[] = [];
  priceHT: number;
  tax: number = 0.2;

  getTotalHT(items: CartItem[]): number {
    this.items = items;

    const prix: number = this.items.reduce((acc: number, item: CartItem) => {
      return acc + item.quantity * item.price;
    }, 0);

    this.priceHT = prix;

    console.log('Prix = ' + prix);

    return prix;
  }

  getTotalTTC(): number {
    return this.priceHT * (this.tax + 1);
  }
}

const miniTest = new CartItem(testProduit[0], 2);
miniTest.calculateTotalHT();

const test2 = new CartItem(testProduit[1], 3);
const test3 = new CartItem(testProduit[2], 2);
const test4 = new CartItem(testProduit[1], 3);
const test5 = new CartItem(testProduit[2], 2);

const testArray = [test2, test3, test4, test5];

const testing = new Cart();
const totalht = testing.getTotalHT(testArray);
console.log('Total HT : ' + totalht);
