import { User, UserStore } from '../models/user';
import { Product, ProductStore } from '../models/product';
import { Order, OrderStore } from '../models/order';

const storeUser = new UserStore();
const storeProduct = new ProductStore();
const storeOrder = new OrderStore();

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
  it('create a user and add an order to that user using create method', async () => {
    const userObj: User = {
      firstname: 'Khaled',
      lastname: 'Mohammed',
      password: 'ASm123kqweo'
    };
    const newUserId = (await storeUser.create(userObj)).id;

    const orderObj: Order = {
      user_id: newUserId,
      order_status: true
    };

    const result = await storeOrder.create(orderObj);

    expect(result).toEqual({
      id: 1,
      order_status: true,
      user_id: '1'
    });
  });

  it('create a product using create method', async () => {
    const productObj: Product = {
      name: 'Milk',
      price: 11
    };
    const result = await storeProduct.create(productObj);

    expect(result).toEqual({
      id: 1,
      name: 'Milk',
      price: 11
    });
  });

  it('show list of orders using index method', async () => {
    const result = await storeOrder.index();
    expect(result).toEqual([
      {
        id: 1,
        order_status: true,
        user_id: '1'
      }
    ]);
  });

  it('shows a specific order based on passed id using show method', async () => {
    const result = await storeOrder.show('1');
    expect(result).toEqual({
      id: 1,
      order_status: true,
      user_id: '1'
    });
  });

  it('add a product to an order using addProductToOrder method', async () => {
    const orderObj: Order = {
      quantity: 4,
      order_id: '1',
      product_id: '1'
    };
    const result = await storeOrder.addProductToOrder(orderObj);

    expect(result).toEqual({
      id: 1,
      quantity: 4,
      order_id: '1',
      product_id: '1'
    });
  });

  it('update a specific order based on passed id and new data using update method', async () => {
    const result = await storeOrder.update('1', { user_id: '1', order_status: false });
    expect(result).toEqual({
      id: 1,
      order_status: false,
      user_id: '1'
    });
  });
});
