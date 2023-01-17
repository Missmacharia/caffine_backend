create table Caffine_Users(
id varchar(200) not null,
username varchar(100) primary key not null,
email varchar(100) unique not null,
[password] varchar(200) not null
)

insert into Caffine_Users(id, username, email, password)
values('wrryuiopogf', 'yvonne', 'yvonne@gmail.com', '12345678')