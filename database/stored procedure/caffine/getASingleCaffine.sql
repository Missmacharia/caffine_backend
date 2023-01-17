create or alter procedure getASingleCaffine(@id varchar(200))
as
begin
select *from caffine where id= @id
end