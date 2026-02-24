export class TestConfig {
    //appUrl = 'http://localhost/opencart/';
    //appUrl = 'http://opencartdemo.free.nf/';
    appUrl = process.env.APP_URL || 'http://localhost/opencart/';

    // Valid login credentials
    email = "user1@gmail.com"
    password = "asdf123"; // 7 characters : software limit- should between 4 and 20 characters

    // Product details
    productName = "macbook"
    productQuantity = "1"
    totalPrice = "$602.00"
    updateQty = "3"
    updatedTotalPrice = "$1,806.00"
}
