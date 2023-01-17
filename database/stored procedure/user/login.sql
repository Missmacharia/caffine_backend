create or alter procedure login(@id varchar(200), @email varchar(100), @password varchar(200))
as
begin
insert into Caffine_Users(id, email, password)
values(@id, @email, @password)
end