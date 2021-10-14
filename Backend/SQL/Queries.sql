SELECT * FROM POST;
SELECT * FROM CATEGORY;
SELECT * FROM USER_COMMENT ORDER BY Country;
SELECT * FROM BLOG_ADMIN;

SET time_zone = '+03:00'; /* Clients comments quota */
SELECT (SELECT COUNT(*) FROM USER_COMMENT WHERE IP = 'X.X.X.X' DATE(CommentDate) = DATE(NOW())  ) <=2;

SELECT ID FROM USER_COMMENT ORDER BY ID DESC LIMIT 0;

SELECT EXISTS(SELECT NameOfCategory FROM CATEGORY WHERE NameOfCategory='Null');

SELECT Country, COUNT(*) AS CommentsCount FROM USER_COMMENT GROUP BY Country ORDER BY Country ASC;

SELECT USER_COMMENT.ID AS UserCommentID, POST.Title AS PostTitle, USER_COMMENT.Nick AS UserCommentNick, /* Comments of per post*/
USER_COMMENT.Content AS UserCommentContent FROM USER_COMMENT, POST WHERE USER_COMMENT.PostID=POST.ID ORDER BY USER_COMMENT.CommentDate DESC;

SELECT POST.ID AS PostID, POST.Content AS PostContent, POST.Category AS PostCategory, POST.CoverPhotoLink AS PostCoverPhotoLink, /*Number of comments for per post*/
POST.Title AS PostTitle, POST.PostDate, COUNT(USER_COMMENT.PostID) AS NumberOfComments 
FROM POST LEFT OUTER JOIN USER_COMMENT ON USER_COMMENT.PostID=POST.ID GROUP BY POST.ID ORDER BY POST.PostDate DESC;

SELECT MONTH(CAST(CommentDate AS DATE)) AS CommentMonth, YEAR(CAST(CommentDate AS DATE)) AS CommentYear, COUNT(*) /* Number of comments for per month */
FROM USER_COMMENT 
GROUP BY CommentMonth, CommentYear ORDER BY CommentMonth, CommentYear;

SELECT NameOfCategory AS id, NameOfCategory, COUNT(POST.Category) AS NumberOfPosts /* Number of posts for per category*/
FROM CATEGORY LEFT OUTER JOIN POST ON POST.Category=NameOfCategory GROUP BY NameOfCategory;

SELECT table_schema AS "Database", SUM(data_length + index_length) / 1024 / 1024 AS "Size (MB)" /* size of dbs */
FROM information_schema.TABLES GROUP BY table_schema;