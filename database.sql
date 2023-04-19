-- database todo
create database todo;

-- table users
create table users (
    id serial primary key,
    login varchar(255) unique not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    date_of_creation date default current_date
);

-- table posts
create table posts (
    id serial primary key,
    title varchar(255) not null,
    description varchar(255) not null,
    completed boolean not null default false,
    date_of_creation date default current_date,
    user_of_creation varchar(255) not null,
    foreign key (user_of_creation) references users (login)
);