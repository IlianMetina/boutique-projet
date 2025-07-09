export class Product {

    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    categoryId: number;

    getProductName(): string{

        return this.name;
    }

    setProductName(name: string): Product{

        this.name = name; 
        return this;
    }

    getProductDescription(): string{

        return this.description;
    }

    setProductDescription(description: string): Product{

        this.description = description;
        return this;
    }

    getProductPrice(): number{

        return this.price;
    }

    setProductPrice(price: number){

        this.price = price;
    }

    getImageUrl(): string{

        return this.imageUrl;
    }

    setImageUrl(imageUrl: string){

        this.imageUrl = imageUrl;

    }

    getProductStock(): number {

        return this.stock;
    }

    setProductStock(stock: number){

        this.stock = stock;
    }

    getCategoryId(): number{

        return this.categoryId;
    }

    setCategoryId(categoryId: number){

        this.categoryId = categoryId;
    }

}