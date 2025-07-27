export class OrderItem {

    id?: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;

    getID(){

        return this.id;
    }

    getOrderItemID(): number{

        return this.orderId;
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


}
