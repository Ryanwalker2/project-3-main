const {Product, User, Order, ShoppingCart} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        products: async (parent, {name}) => {
            const params = {};

            if(name){
                params.name = { $regex: new RegExp("^" + name.toLowerCase(), "i") };
            }
            
            return await Product.find(params);
        },
        product: async (parent, {_id}) => {
            return await Product.findById(_id);
        },
        user: async (parent, args, context) =>{
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path: 'orders',
                    populate: {path: 'products'} 
                });

                console.log('Populated user orders:', user.orders);

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw AuthenticationError;
        },
        order: async (parent, {_id}, context) => {
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path:'orders',
                    populate: {path: 'products'} 
                });

                return user.orders.id(_id);
            }

            throw AuthenticationError;

        },
        // allOrders: async (parent, args, context) => {
        //     return Order.find({});
        // },
        shoppingCart: async (parent, {_id}, context) => {
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path: 'shoppingCart',
                    populate: {path: 'products'}
                });

                return user.shoppingCart.id(_id);
            };

            throw AuthenticationError;
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            //const order = new Order({ products: args.products});
            const products = await Product.find({ _id: { $in: args.products }});
            const line_items = [];

            for(const product of products){

                const stripeProduct = await stripe.products.create({
                    name: product.name,
                    description: product.description,
                    images: [`${url}/images/${product.image}`]
                });

                const price = await stripe.prices.create({
                    product: stripeProduct.id,
                    unit_amount: product.price * 100,
                    currency: 'cad',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });

            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return {session: session.id};

        }
    },
    Mutation: {
        updateProduct: async (parent, {_id, quantity }) => {
            const subtractOne = Math.abs(quantity) * -1;

            return await Product.findByIdAndUpdate(_id, { $inc: {quantity: subtractOne}}, {new: true});
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email})/// TODO: .populate('O');

            if(!user){
                throw AuthenticationError;
            }

            const correctPass = await user.isCorrectPassword(password);

            if(!correctPass){
                throw AuthenticationError;
            }

            const token = signToken(user);

            return {token};

        },
        updateUser: async (parent, args, context) => {
            if(context.user){
                return await User.findByIdAndUpdate(context.user._id, args, {new: true});
            }

            throw AuthenticationError;

        },
        addOrder: async (parent, {products}, context) => {
            if(context.user){
                const order = new Order({products});

                await User.findByIdAndUpdate(context.user._id, { $push: {orders: order}});

                return order;

            }

            throw AuthenticationError;
        },
        addToCart: async (parent, args, context) => {
            if (context.user){
                return await User.findByIdAndUpdate(context.user._id, args, {new: true});
            }

            throw AuthenticationError;
        }

    }
};

module.exports = resolvers;
