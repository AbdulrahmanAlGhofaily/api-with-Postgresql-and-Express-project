CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    quantity integer,
    product_id int REFERENCES products(id),
    order_id int REFERENCES orders(id)
)