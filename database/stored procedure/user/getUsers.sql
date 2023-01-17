create or alter procedure getUsers(@id varchar(200), @username varchar(100), @email varchar(100), @password varchar(200))
as
begin
select *from Caffine_Users
end