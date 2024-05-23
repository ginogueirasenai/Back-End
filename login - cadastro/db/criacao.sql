create database login;

use login;

create table user(
id_user int primary key,
username varchar(20) not null,
password varchar(8) not null
);

insert into user(id_user, username, password) values 
(1, 'GiovannaNogueira', 'gi2006');