create or alter procedure getUserById (@id varchar(200))
as
begin
insert into Caffine_Users(id) 
values(@id)
end