echo "
INSERT INTO vue_spa.public.users(name, email, email_verified_at, password, remember_token, is_admin, created_at, updated_at) VALUES
(E'Михаил Тукшов', E'man24@yandex.ru', null, E'\$2y\$10\$Qm2a3miAEnuxPGHYm3C\/Eu84xMGpXsSpaue2ltwIXzvScKDT6GDuK', null, 0, '09.08.2021 5:51:46.000000 AD', '09.08.2021 5:55:04.000000 AD');
INSERT INTO vue_spa.public.users(name, email, email_verified_at, password, remember_token, is_admin, created_at, updated_at) VALUES
(E'Брагин Антон', E'man25@yandex.ru', null, E'\$2y\$10\$m3Zitfc7cWXPbaJp3c486uUa6.H\/EIJgrFxYJprubbg5Tcb5bAdFS', null, 1, '09.08.2021 6:08:53.000000 AD', '09.08.2021 6:08:53.000000 AD');
" | psql "dbname='vue_spa' user='ruser' password='123qwe' host='dbpostgresql'"
