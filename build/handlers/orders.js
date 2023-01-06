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
const order_1 = require("../models/order");
const verifyAuthToken_1 = require("../middleware/verifyAuthToken");
const store = new order_1.OrderStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield store.index();
    res.json(orders);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.show(req.params.id);
    res.json(order);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        order_status: req.body.order_status,
        user_id: req.body.user_id
    };
    const newOrder = yield store.create(order);
    console.log(newOrder);
    res.json(newOrder);
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const order = {
        order_status: req.body.order_status,
        user_id: req.body.user_id
    };
    const updateOrder = yield store.update(orderId, order);
    res.json(updateOrder);
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(req.params.id);
    res.json(deleted);
});
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        quantity: req.body.quantity,
        product_id: req.body.product_id,
        order_id: req.body.order_id
    };
    console.log(order);
    const newProductToOrder = yield store.addProductToOrder(order);
    res.json(newProductToOrder);
});
const order_routes = (app) => {
    app.get('/orders', verifyAuthToken_1.verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken_1.verifyAuthToken, show);
    app.post('/orders', verifyAuthToken_1.verifyAuthToken, create);
    app.put('/orders/:id', verifyAuthToken_1.verifyAuthToken, update);
    app.delete('/orders/:id', verifyAuthToken_1.verifyAuthToken, deleteOrder);
    app.post('/addProduct', verifyAuthToken_1.verifyAuthToken, addProductToOrder);
};
exports.default = order_routes;
