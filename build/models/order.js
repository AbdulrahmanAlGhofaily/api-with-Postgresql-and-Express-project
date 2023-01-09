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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Unable to get orders: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to get order: ${error}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *';
                const result = yield connection.query(sql, [o.user_id, o.order_status]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to add order: ${error}`);
            }
        });
    }
    update(id, o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'UPDATE orders SET order_status = $2, user_id = $3 WHERE id = $1 RETURNING *';
                const result = yield connection.query(sql, [id, o.order_status, o.user_id]);
                connection.release();
                if (result.rowCount === 0)
                    throw new Error(`Order with the id ${id} doesn't exist`);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to update order with id ${id}:`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                yield connection.query(sql, [id]);
                connection.release();
                return 'Order has been deleted successfully';
            }
            catch (error) {
                throw new Error(`Unable to delete order with the id of:${id}. Error type: ${error}`);
            }
        });
    }
    addProductToOrder(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO order_product (quantity, product_id, order_id) VALUES ($1, $2, $3) RETURNING *';
                const result = yield connection.query(sql, [o.quantity, o.product_id, o.order_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to add a product to the order: ${error}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
