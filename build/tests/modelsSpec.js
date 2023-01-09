"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const product_1 = require("../models/product");
const order_1 = require("../models/order");
const storeUser = new user_1.UserStore();
const storeProduct = new product_1.ProductStore();
const storeOrder = new order_1.OrderStore();
describe('Testing User Model methods if they were defined', () => {
    it('check whether index method is defined', () => {
        expect(storeUser.index).toBeDefined();
    });
    it('check whether show method is defined', () => {
        expect(storeUser.show).toBeDefined();
    });
    it('check whether create method is defined', () => {
        expect(storeUser.create).toBeDefined();
    });
    it('check whether update method is defined', () => {
        expect(storeUser.update).toBeDefined();
    });
    it('check whether delete method is defined', () => {
        expect(storeUser.delete).toBeDefined();
    });
});
describe('Testing Product Model methods if they were defined', () => {
    it('check whether index method is defined', () => {
        expect(storeProduct.index).toBeDefined();
    });
    it('check whether show method is defined', () => {
        expect(storeProduct.show).toBeDefined();
    });
    it('check whether create method is defined', () => {
        expect(storeProduct.create).toBeDefined();
    });
    it('check whether update method is defined', () => {
        expect(storeProduct.update).toBeDefined();
    });
    it('check whether delete method is defined', () => {
        expect(storeProduct.delete).toBeDefined();
    });
});
describe('Testing Order Model methods if they were defined', () => {
    it('check whether index method is defined', () => {
        expect(storeOrder.index).toBeDefined();
    });
    it('check whether show method is defined', () => {
        expect(storeOrder.show).toBeDefined();
    });
    it('check whether create method is defined', () => {
        expect(storeOrder.create).toBeDefined();
    });
    it('check whether update method is defined', () => {
        expect(storeOrder.update).toBeDefined();
    });
    it('check whether delete method is defined', () => {
        expect(storeOrder.delete).toBeDefined();
    });
    it('check whether addProductToOrder method is defined', () => {
        expect(storeOrder.addProductToOrder).toBeDefined();
    });
});
let testingHashPass;
describe('Testing the creation of new User, Product and Order:', () => {
    it('create a new User using create method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeUser.create({
            firstname: 'Khaled',
            lastname: 'Mohammed',
            password: 'ASm123kqweo'
        });
        testingHashPass = result.password;
        expect(result).toEqual({
            id: 1,
            firstname: 'Khaled',
            lastname: 'Mohammed',
            password: testingHashPass
        });
    }));
    it('create a new Product using create method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeProduct.create({
            name: 'milk',
            price: 12
        });
        expect(result).toEqual({
            id: 1,
            name: 'milk',
            price: 12
        });
    }));
    it('create a new Order using create method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeOrder.create({
            order_status: true,
            user_id: 1
        });
        expect(result).toEqual({
            id: 1,
            order_status: true,
            user_id: 1
        });
    }));
});
describe('Testing indexing (listing) all Users, Products and Orders:', () => {
    it('list all users using index method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeUser.index();
        expect(result).toEqual([
            {
                id: 1,
                firstname: 'Khaled',
                lastname: 'Mohammed',
                password: testingHashPass
            }
        ]);
    }));
    it('list all products using index method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeProduct.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'milk',
                price: 12
            }
        ]);
    }));
    it('list all order using index method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeOrder.index();
        expect(result).toEqual([
            {
                id: 1,
                order_status: true,
                user_id: 1
            }
        ]);
    }));
});
describe('Testing showing a specific User, Product and Order:', () => {
    it('show a specific user by id using show method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeUser.show('1');
        expect(result).toEqual({
            id: 1,
            firstname: 'Khaled',
            lastname: 'Mohammed',
            password: testingHashPass
        });
    }));
    it('show a specific product by id using show method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeProduct.show('1');
        expect(result).toEqual({
            id: 1,
            name: 'milk',
            price: 12
        });
    }));
    it('show a specific order by id using show method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeOrder.show('1');
        expect(result).toEqual({
            id: 1,
            order_status: true,
            user_id: 1
        });
    }));
});
describe('Testing updating a specific User, Product and Order:', () => {
    it('update user information using update method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeUser.update('1', {
            firstname: 'Saleh',
            lastname: 'Ahmed',
            password: 'NewPass123'
        });
        expect(result).toEqual({
            id: 1,
            firstname: 'Saleh',
            lastname: 'Ahmed',
            password: result.password
        });
    }));
    it('update product information using update method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeProduct.update('1', {
            name: 'Oreo',
            price: 2
        });
        expect(result).toEqual({
            id: 1,
            name: 'Oreo',
            price: 2
        });
    }));
    it('update order information using update method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeOrder.update('1', {
            id: 1,
            order_status: false,
            user_id: 1
        });
        expect(result).toEqual({
            id: 1,
            order_status: false,
            user_id: 1
        });
    }));
});
describe('Testing deleting a specific User, Product and Order:', () => {
    it('delete order using delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeOrder.delete('1');
        expect(result).toEqual('Order has been deleted successfully');
    }));
    it('delete user using delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeUser.delete('1');
        expect(result).toEqual('User has been deleted successfully');
    }));
    it('delete product using delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeProduct.delete('1');
        expect(result).toEqual('Product has been deleted successfully');
    }));
});
describe('Testing adding product to an order:', () => {
    it('Testing addProductToOrder method', () => __awaiter(void 0, void 0, void 0, function* () {
        yield storeUser.create({
            firstname: 'Rasheed',
            lastname: 'Othman',
            password: 'treesAreLovely123'
        });
        yield storeProduct.create({
            name: 'Fish',
            price: 22
        });
        yield storeOrder.create({
            order_status: true,
            user_id: 2
        });
        const result = yield storeOrder.addProductToOrder({
            product_id: 2,
            order_id: 2,
            quantity: 3
        });
        expect(result).toEqual({
            id: 1,
            product_id: 2,
            order_id: 2,
            quantity: 3
        });
    }));
});
