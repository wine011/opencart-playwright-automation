import { faker, Sex } from '@faker-js/faker';

export class RandomData {
    static getFirstName() {
        return faker.person.firstName();
    }

    static getLastName() {
        return faker.person.lastName();
    }

    static getEmail() {
        return faker.internet.email();
    }

    static getRandomPhoneNumber() {
        return faker.phone.number();
    }

    static getPassword(length: number = 10) {
        return faker.internet.password({ length });
    }

    static getCountry() {
        return faker.location.country();
    }

    static getRandomState() {
        return faker.location.state();
    }

    static getRandomZipCode() {
        return faker.location.zipCode();
    }

    static getRandomCity() {
        return faker.location.city();
    }

    static getRandomAddress() {
        return faker.location.streetAddress();
    }
}