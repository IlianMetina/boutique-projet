export class Category {

    name: string;
    description: string;

    getNameCategory(): string{
        
        return this.name;
    }

    setNameCategory(name: string){

        this.name = name;
    }

    getCategoryDescription(): string{

        return this.description;
    }

    setCategoryDescription(description: string){

        this.description = description;
    }
}
