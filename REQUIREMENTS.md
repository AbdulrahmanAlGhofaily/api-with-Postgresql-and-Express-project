# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.
<br>

## Database schema

---

               List of relations

| Schema |     Name      | Type  |     Owner     |
| :----: | :-----------: | :---: | :-----------: |
| public |  migrations   | table | project_admin |
| public | order_product | table | project_admin |
| public |    orders     | table | project_admin |
| public |   products    | table | project_admin |
| public |     users     | table | project_admin |

<br>

                                Table "public.users":

|     Column      |          Type          | Collation | Nullable |              Default              |
| :-------------: | :--------------------: | :-------: | :------: | :-------------------------------: |
|       id        |        integer         |     /     | not null | nextval('users_id_seq'::regclass) |
|    firstname    | character varying(100) |     /     |    /     |                                   |
|    lastname     | character varying(100) |     /     |    /     |                                   |
| password_digest |   character varying    |     /     |    /     |                                   |

<br>

Indexes: <br>
"users_pkey" PRIMARY KEY, btree (id) <br>
Referenced by: <br>
TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

<br>

                                    Table "public.products"

| Column |          Type          | Collation | Nullable |               Default                |
| :----: | :--------------------: | :-------: | :------: | :----------------------------------: |
|   id   |        integer         |           | not null | nextval('products_id_seq'::regclass) |
|  name  | character varying(100) |           |          |
| price  |        integer         |           |          |

Indexes: <br>
"products_pkey" PRIMARY KEY, btree (id) <br>
Referenced by: <br>
TABLE "order_product" CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

<br>

                            Table "public.orders"

|    Column    |  Type   | Collation | Nullable |              Default               |
| :----------: | :-----: | :-------: | :------: | :--------------------------------: |
|      id      | integer |           | not null | nextval('orders_id_seq'::regclass) |
| order_status | boolean |           |          |
|   user_id    | bigint  |           |          |

Indexes: <br>
"orders_pkey" PRIMARY KEY, btree (id) <br>
Foreign-key constraints: <br>
"orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) <br>
Referenced by: <br>
TABLE "order_product" CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

 <br>

                              Table "public.order_product"

|   Column   |  Type   | Collation | Nullable |                  Default                  |
| :--------: | :-----: | :-------: | :------: | :---------------------------------------: |
|     id     | integer |           | not null | nextval('order_product_id_seq'::regclass) |
|  quantity  | integer |           |          |
| product_id | bigint  |           |          |
|  order_id  | bigint  |           |          |

Indexes: <br>
"order_product_pkey" PRIMARY KEY, btree (id) <br>
Foreign-key constraints: <br>
"order_product_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) <br>
"order_product_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

<br>

## API Endpoints

---

### **Users**

-- To **create** a new user access `/users` using **POST** http request.

**Request values:**

| Arguments |  Type  |
| :-------: | :----: |
| firstname | string |
| lastname  | string |
| password  | string |

<br>

**Response values:**

| Arguments |  Type  |
| :-------: | :----: |
|   token   | string |

<br>
___

-- To **list** all users access `/users` using **GET** http request.

**Request values:**

- _Token Required_

| Arguments | Type |
| :-------: | :--: |
|     /     |  /   |

<br>

**Response values:**
-- Array of objects, each object is of type **user**

<br>
___

-- To **show** a specific user access `/users:id` using **GET** http request.

**Request values:**

- _Token Required_

| Parameter |  Type  |
| :-------: | :----: |
|    id     | string |

<br>

**Response values:**
-- Object of type **user**

<br>
___
-- To **update** a specific user access `/users:id` using **PUT** http request.

**Request values:**

- _Token Required_

| Arguments |  Type  |
| :-------: | :----: |
| firstname | string |
| lastname  | string |
| password  | string |

<br>

**Response values:**

|    Arguments    |  Type  |
| :-------------: | :----: |
|       id        | string |
|    firstname    | string |
|    lastname     | string |
| password_digest | string |

<br>

---

-- To **delete** a specific user access `/users:id` using **DELETE** http request.

**Request values:**

- _Token Required_

| Parameter |  Type  |
| :-------: | :----: |
|    id     | string |

<br>

**Response values:**
-- Object of type user (Deleted user).

---

### **Products**

-- To **create** a new product access `/products` using **POST** http request.

**Request values:**

- _Token Required_

| Arguments |  Type  |
| :-------: | :----: |
|   name    | string |
|   price   | number |

<br>

**Response values:**
|Arguments|Type|
|:--:|:--:|
|id|string|
|name|string|
|price|number|

<br>
___

-- To **list** all products access `/products` using **GET** http request.

**Request values:**

| Arguments | Type |
| :-------: | :--: |
|     /     |  /   |

<br>

**Response values:**
-- Array of objects, each object is of type **product**

<br>
___

-- To **show** a specific product access `/products:id` using **GET** http request.

**Request values:**

| Parameter |  Type  |
| :-------: | :----: |
|    id     | string |

<br>

**Response values:**
-- Object of type **product**.

<br>
___
-- To **update** a specific product access `/products:id` using **PUT** http request.

**Request values:**

- _Token Required_

| Arguments |  Type  |
| :-------: | :----: |
|   name    | string |
|   price   | number |

<br>

**Response values:**

| Arguments |  Type  |
| :-------: | :----: |
|    id     | string |
|   name    | string |
|   price   | number |

<br>

---

-- To **delete** a specific product access `/products:id` using **DELETE** http request.

**Request values:**

| Parameter |  Type  |
| :-------: | :----: |
|    id     | string |

<br>

**Response values:**
-- Object of type product (Deleted product).

---

### **Orders**

-- To **create** a new order access `/orders` using **POST** http request.

**Request values:**

- _Token Required_

|  Arguments   |  Type   |
| :----------: | :-----: |
|   user_id    | string  |
| order_status | boolean |

<br>

**Response values:**

|  Arguments   |  Type   |
| :----------: | :-----: |
|      id      | string  |
|   user_id    | string  |
| order_status | boolean |

<br>
___

-- To **list** all orders access `/orders` using **GET** http request.

**Request values:**

- _Token Required_

| Arguments | Type |
| :-------: | :--: |
|     /     |  /   |

<br>

**Response values:**
-- Array of objects, each object is of type **orders**

<br>
___

-- To **show** a specific order access `/orders:id` using **GET** http request.

**Request values:**

| Parameter |  Type  |
| :-------: | :----: |
|    id     | string |

<br>

**Response values:**
-- Object of type **order**.

<br>
___
-- To **update** a specific order access `/order:id` using **PUT** http request.

**Request values:**

- _Token Required_

|  Arguments   |  Type   |
| :----------: | :-----: |
|   user_id    | string  |
| order_status | boolean |

<br>

**Response values:**

|  Arguments   |  Type   |
| :----------: | :-----: |
|      id      | string  |
|   user_id    | string  |
| order_status | boolean |

<br>

---

-- To **delete** a specific order access `/orders:id` using **DELETE** http request.

**Request values:**

- _Token Required_

| Parameter |  Type  |
| :-------: | :----: |
|    id     | string |

<br>

**Response values:**
-- Object of type order (Deleted product).
<br>

---

-- To **add product ** to a specific order access `/addProduct` using **POST** http request.

**Request values:**

- _Token Required_

| Arguments  |  Type  |
| :--------: | :----: |
|  quantity  | number |
| product_id | string |
|  order_id  | string |

<br>

**Response values:**

| Arguments  |  Type  |
| :--------: | :----: |
|     id     | string |
|  quantity  | number |
| product_id | string |
|  order_id  | string |
