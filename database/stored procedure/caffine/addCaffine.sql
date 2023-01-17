create or alter procedure addCaffine
(@id varchar(200), @username varchar(100), @product_name varchar(100), @product_details varchar(500),@product_price varchar(10))
as
begin
insert into caffine(id, username, product_name, product_details, product_price)
values(@id, @username, @product_name, @product_details, @product_price)
end