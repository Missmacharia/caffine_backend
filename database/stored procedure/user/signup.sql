create or alter procedure signUp(@id varchar(200), @username varchar(100), @email varchar(100), @password varchar(200))
as
begin
insert into Caffine_Users(id, username, email, password)
values(@id, @username, @email, @password)
end