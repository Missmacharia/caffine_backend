create table caffine(
id varchar(200) primary key not null,
username varchar(100) foreign key references Caffine_Users not null,
product_name varchar(100) not null,
product_details varchar(500) not null,
product_price varchar(10) not null,
isDelete bit default 0
)

insert into caffine(id, username, product_name, product_details, product_price)
values('ikjuyhtgrfedws', 'yvonne', 'flat white', 'l098k7j6yht5rvc', '500')
