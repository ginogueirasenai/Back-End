use biblioteca;

alter table usuario modify id_usuario int not null auto_increment;

alter table usuario add password varchar(8) not null;

insert into usuario(nome, email, password) values 
('Giovanna', 'gibruna@gmail.com', 'gi2006');

UPDATE usuario SET password = 'lavinia1' WHERE id_usuario=1;
UPDATE usuario SET password = 'wash123' WHERE id_usuario=2;
UPDATE usuario SET password = 'helo123' WHERE id_usuario=4;
UPDATE usuario SET password = 'ju123' WHERE id_usuario=5;



