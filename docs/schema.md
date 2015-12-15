# Schema Information

## poems
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key, indexed
passage     | text      | not null
book_id     | integer   | not null, foreign key, indexed

## styles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
poem_id     | integer   | not null, foreign key, indexed
centered    | boolean   | not null, default false
background  | integer   | not null, default 1
color       | integer   | not null, default 1
font        | integer   | not null, default 1

## selectedTexts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
poem_id     | integer   | not null, foreign key, indexed
start_idx   | integer   | not null
start_idx   | integer   | not null
italicized  | boolean   | not null, default false

## books
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author      | string    | not null
title       | text      | not null
text        | integer   | not null

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
