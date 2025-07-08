export class CreateProductDto{

    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    category: {
        connect: {id: number}
    }
}