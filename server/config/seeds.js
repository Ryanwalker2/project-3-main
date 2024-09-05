const db = require('./connection');
const {User, Product} = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {

    await cleanDB('Product', 'products');
    await cleanDB('User', 'users');

    //Product Seeds
    const products = await Product.insertMany([
        {
            name: 'Magazine',
            description: 'Limited Ed. Autographed magazine',
            image: '/client/public/images/magazine.webp',
            price: 14.99,
            quantity: 400,
        },
        {
            name: 'T-Shirt',
            description: 'One size fits all T-shirts',
            image: '/client/public/images/tshirt.png',
            price: 19.99,
            quantity: 450,
        },
        {
            name: 'CD',
            description: 'Sound of a Seed physical album',
            image: '/client/public/images/cd.png',
            price: 9.99,
            quantity: 250,
        },
        {
            name: 'Mug',
            description: 'Stainless steel hot beverage cup',
            image: '/client/public/images/mug.png',
            price: 4.99,
            quantity: 150,
        },
        {
            name: 'Hoodie',
            description: 'One size fits all hoodie',
            image: '/client/public/images/hoodie.jpg',
            price: 24.99,
            quantity: 200,
        },
        {
            name: 'Sticker',
            description: 'Bubble-free stickers',
            image: '/client/public/images/sticker.jpg',
            price: 0.99,
            quantity: 500,
        },
    ]);

    console.log('Products Seeded');

    // User Seeds
    await User.create({
        firstName: 'Joe',
        lastName: 'York',
        email: 'joe@foo.com',
        password: 'abc123',
        orders: [
            {
                products: [products[0]._id, products[1]._id, products[1]._id]
            }
        ]
    });

    await User.create({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@foo.com',
        password: 'abc123',
        orders: [
            {
                products: [products[2]._id, products[5]._id, products[5]._id, products[5]._id]
            }
        ]
    });

    await User.create({
        firstName: 'Laura',
        lastName: 'Washington',
        email: 'laura@foo.com',
        password: 'abc123',
        orders: [
            {
                products: [products[3]._id, products[3]._id, products[4]._id]
            }
        ]
    });

    await User.create({
        firstName: 'Harry',
        lastName: 'Jones',
        email: 'harry@foo.com',
        password: 'abc123',
        orders: [
            {
                products: [products[0]._id, products[2]._id, products[4]._id, products[3]._id]
            }
        ]
    });

    console.log('Users Seeded');

    process.exit();

});