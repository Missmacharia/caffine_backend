create or alter procedure deleteCaffineProduct(@id varchar(200))
as
begin
select *from caffine where id= @id
end