SELECT * FROM POST;

SELECT * FROM CATEGORY;

SELECT * FROM USER_COMMENT;

SELECT ID FROM USER_COMMENT ORDER BY ID DESC LIMIT 0;

SELECT table_schema AS "Database", SUM(data_length + index_length) / 1024 / 1024 AS "Size (MB)" FROM information_schema.TABLES GROUP BY table_schema;