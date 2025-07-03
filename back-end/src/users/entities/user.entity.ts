export class User {

    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    city: string;
    street: string;
    zipCode: string;
    country: string;
    conditions: boolean;
    newsletter: boolean;

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string): User {
        this.username = username;
        return this;
    }

    getFirstName(): string {

        return this.firstName;
    }

    setFirstName(firstName: string): User{

        this.firstName = firstName;
        return this;

    }

    getLastName(): string{

        return this.lastName;
    }

    setLastName(lastName: string): User{

        this.lastName = lastName;
        return this;

    }

    getEmail(): string{

        return this.email;
    }

    setEmail(email: string) : User{

        this.email = email;
        return this;

    }

    getPhoneNumber() : string{

        return this.phoneNumber;
    }

    setPhoneNumber(phoneNumber: string): User{

        this.phoneNumber = phoneNumber;
        return this;

    }

    getPassword(): string{

        return this.password;
    }

    setPassword(password: string): User{

        
        this.password = password;
        return this;

    }

    getCity(): string {

        return this.city;
    }

    setCity(city: string): User{

        this.city = city; 
        return this;

    }

    getStreet(): string {

        return this.street;
    }

    setStreet(street: string): User{

        this.street = street;
        return this;

    }

    getZipCode(): string {

        return this.zipCode;
    }

    setZipCode(zipCode:string): User {

        this.zipCode = zipCode;
        return this;

    }

    getCountry(): string {

        return this.country;
    }

    setCountry(country: string): User {

        this.country = country;
        return this;

    }
    
    getConditions(): boolean {

        return this.conditions;
    }

    setConditions(conditions: boolean): User {

        this.conditions = conditions;
        return this;

    }

    getNewsletter(): boolean {

        return this.newsletter;
    }

    setNewsletter(newsletter: boolean): User {

        this.newsletter = newsletter;
        return this;

    }
}
