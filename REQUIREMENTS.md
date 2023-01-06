# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.
<br>

## API Endpoints

### **Users**

-- To **create** a new user access `/users` using **POST** http request.

**Request values:**
|Arguments|Type|
|:--:|:--:|
|firstname |string|
|lastname|string|
|password|string|
<br>

**Response values:**
|Arguments|Type|
|:--:|:--:|
|token|string|

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
|Arguments|Type|
|:--:|:--:|
|id|string|
|firstname|string|
|lastname|string|
|password_digest|string|
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
|Arguments|Type|
|:--:|:--:|
|id|string|
|name|string|
|price|number|
<br>

---

-- To **delete** a specific product access `/products:id` using **DELETE** http request.

**Request values:**
|Parameter|Type|
|:--:|:--:|
|id|string|

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
|Arguments|Type|
|:--:|:--:|
|id|string|
|user_id|string|
|order_status|boolean|

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
|Arguments|Type|
|:--:|:--:|
|id|string|
|user_id|string|
|order_status|boolean|
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
|Arguments|Type|
|:--:|:--:|
|id|string|
|quantity|number|
|product_id|string|
|order_id|string|
