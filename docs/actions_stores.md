# Schema Information

## pictures
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
url         | string    | not null
author_id   | integer   | not null, foreign key (references users), indexed

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | string    | not null
picture_id  | integer   | not null, foreign key (references notes), indexed
commenter_id| integer   | not null, foreign key (references notes), indexed

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
picture_id  | integer   | not null, foreign key (references notes), indexed
liker_id    | integer   | not null, foreign key (references notes), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
