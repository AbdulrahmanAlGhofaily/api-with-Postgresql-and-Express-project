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

let testingHashPass: string;

describe('Testing the creation of new User, Product and Order:', () => {
  it('create a new User using create method', async () => {
    const result: User = await storeUser.create({
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
  });

  it('create a new Product using create method', async () => {
    const result: Product = await storeProduct.create({
      name: 'milk',
      price: 12
    });

    expect(result).toEqual({
      id: 1,
      name: 'milk',
      price: 12
    });
  });

  it('create a new Order using create method', async () => {
    const result: Order = await storeOrder.create({
      order_status: true,
      user_id: 1
    });

    expect(result).toEqual({
      id: 1,
      order_status: true,
      user_id: 1
    });
  });
});

describe('Testing indexing (listing) all Users, Products and Orders:', () => {
  it('list all users using index method', async () => {
    const result = await storeUser.index();

    expect(result).toEqual([
      {
        id: 1,
        firstname: 'Khaled',
        lastname: 'Mohammed',
        password: testingHashPass
      }
    ]);
  });

  it('list all products using index method', async () => {
    const result = await storeProduct.index();

    expect(result).toEqual([
      {
        id: 1,
        name: 'milk',
        price: 12
      }
    ]);
  });

  it('list all order using index method', async () => {
    const result = await storeOrder.index();

    expect(result).toEqual([
      {
        id: 1,
        order_status: true,
        user_id: 1
      }
    ]);
  });
});

describe('Testing showing a specific User, Product and Order:', () => {
  it('show a specific user by id using show method', async () => {
    const result = await storeUser.show('1');

    expect(result).toEqual({
      id: 1,
      firstname: 'Khaled',
      lastname: 'Mohammed',
      password: testingHashPass
    });
  });

  it('show a specific product by id using show method', async () => {
    const result = await storeProduct.show('1');

    expect(result).toEqual({
      id: 1,
      name: 'milk',
      price: 12
    });
  });

  it('show a specific order by id using show method', async () => {
    const result = await storeOrder.show('1');

    expect(result).toEqual({
      id: 1,
      order_status: true,
      user_id: 1
    });
  });
});

describe('Testing updating a specific User, Product and Order:', () => {
  it('update user information using update method', async () => {
    const result = await storeUser.update('1', {
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
  });

  it('update product information using update method', async () => {
    const result = await storeProduct.update('1', {
      name: 'Oreo',
      price: 2
    });

    expect(result).toEqual({
      id: 1,
      name: 'Oreo',
      price: 2
    });
  });

  it('update order information using update method', async () => {
    const result = await storeOrder.update('1', {
      id: 1,
      order_status: false,
      user_id: 1
    });

    expect(result).toEqual({
      id: 1,
      order_status: false,
      user_id: 1
    });
  });
});

describe('Testing deleting a specific User, Product and Order:', () => {
  it('delete order using delete method', async () => {
    const result = await storeOrder.delete('1');

    expect(result).toEqual('Order has been deleted successfully');
  });

  it('delete user using delete method', async () => {
    const result = await storeUser.delete('1');

    expect(result).toEqual('User has been deleted successfully');
  });

  it('delete product using delete method', async () => {
    const result = await storeProduct.delete('1');

    expect(result).toEqual('Product has been deleted successfully');
  });
});

describe('Testing adding product to an order:', () => {
  it('Testing addProductToOrder method', async () => {
    await storeUser.create({
      firstname: 'Rasheed',
      lastname: 'Othman',
      password: 'treesAreLovely123'
    });

    await storeProduct.create({
      name: 'Fish',
      price: 22
    });

    await storeOrder.create({
      order_status: true,
      user_id: 2
    });

    const result = await storeOrder.addProductToOrder({
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
  });
});
