create or alter procedure searchCaffine(@product_name varchar(100))
as
begin
select product_name from caffine where product_name like '%' + product_name + '%'
end