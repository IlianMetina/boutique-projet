export class OrderItem {

    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;

    getID(): number{

        return this.id;
    }

    getOrderItemID(): number{

        return this.orderId;
    }

    setOrderID(orderId: number){

        this.orderId = orderId;
    }

    getProductItemID(): number{

        return this.productId;
    }

    setProductItemID(productID: number){

        this.productId = productID;
    }

    getQuantity(): number{

        return this.quantity;
    }

    setQuantity(quantity: number){

        this.quantity = quantity;
    }

    getPrice(): number{

        return this.price;
    }

    setPrice(price: number){

        this.price = price;
    }
}
