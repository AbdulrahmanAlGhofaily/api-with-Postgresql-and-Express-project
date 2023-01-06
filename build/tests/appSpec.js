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
describe('Testing App Models methods functionality', () => {
    it('create a user and add an order to that user using create method', () => __awaiter(void 0, void 0, void 0, function* () {
        const userObj = {
            firstname: 'Khaled',
            lastname: 'Mohammed',
            password: 'ASm123kqweo'
        };
        const newUserId = (yield storeUser.create(userObj)).id;
        const orderObj = {
            user_id: newUserId,
            order_status: true
        };
        const result = yield storeOrder.create(orderObj);
        expect(result).toEqual({
            id: 1,
            order_status: true,
            user_id: '1'
        });
    }));
    it('create a product using create method', () => __awaiter(void 0, void 0, void 0, function* () {
        const productObj = {
            name: 'Milk',
            price: 11
        };
        const result = yield storeProduct.create(productObj);
        expect(result).toEqual({
            id: 1,
            name: 'Milk',
            price: 11
        });
    }));
    it('show list of orders using index method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeOrder.index();
        expect(result).toEqual([
            {
                id: 1,
                order_status: true,
                user_id: '1'
            }
        ]);
    }));
    it('shows a specific order based on passed id using show method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeOrder.show('1');
        expect(result).toEqual({
            id: 1,
            order_status: true,
            user_id: '1'
        });
    }));
    it('add a product to an order using addProductToOrder method', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderObj = {
            quantity: 4,
            order_id: '1',
            product_id: '1'
        };
        const result = yield storeOrder.addProductToOrder(orderObj);
        expect(result).toEqual({
            id: 1,
            quantity: 4,
            order_id: '1',
            product_id: '1'
        });
    }));
    it('update a specific order based on passed id and new data using update method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeOrder.update('1', { user_id: '1', order_status: false });
        expect(result).toEqual({
            id: 1,
            order_status: false,
            user_id: '1'
        });
    }));
});
