CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_status BOOLEAN,
    user_id int REFERENCES users(id)
);