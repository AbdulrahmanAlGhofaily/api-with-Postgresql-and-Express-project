CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_status BOOLEAN,
    user_id bigint REFERENCES users(id)
);