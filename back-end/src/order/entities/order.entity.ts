import { OrderStatus } from "@prisma/client";

export class Order {

    id: number;
    userId: number;
    status: OrderStatus;
    total: number;
    createdAt: Date;
    
    getID(): number{

        return this.id;
    }

    getUserID(): number{

        return this.userId;
    }

    setUserID(userID: number){

        this.userId = userID;
    }

    getStatus(): string{

        return this.status;
    }

    setStatus(status: OrderStatus){

        this.status = status;
    }

    getTotal(): number{

        return this.total;
    }

    setTotal(total: number){

        this.total = total;
    }

    getCreatedAt(): Date{

        return this.createdAt;
    }
}
