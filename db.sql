CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE provinces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    full_name TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    display_order INT
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    id_province INT REFERENCES provinces(id),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

CREATE TABLE event_locations (
   id SERIAL PRIMARY KEY,
   id_location INT REFERENCES locations(id),
   name VARCHAR(255) NOT NULL,
   full_address TEXT NOT NULL,
   max_capacity INT NOT NULL,
   latitude DECIMAL (9, 6),
   longitude DECIMAL (9, 6), 
   id_creator_user INT REFERENCES users(id)
);

CREATE TABLE event_categories (
     id SERIAL PRIMARY KEY,
     name VARCHAR (255) NOT NULL, 
     display_order INT
);

CREATE TABLE events (
     id SERIAL PRIMARY KEY, 
     name VARCHAR (255) NOT NULL, 
     description TEXT,
     id_event_category INT REFERENCES event_categories(id), 
     id_event_location INT REFERENCES event_locations(id), 
     start_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
     duration_in_minutes INT,
     price DECIMAL (9, 6),
	 enabled_for_enrollment BOOLEAN DEFAULT TRUE ,
	 max_assistance INTEGER,  
	 id_creator_user INTEGER REFERENCES users(id)
); 

CREATE TABLE tags(
	id serial primary key ,
	name varchar not null
);
create table events_tags(
	id serial primary key ,
	id_event integer references events(id) ,
	id_tag integer references tags(id)
);
create table events_enrollments(
	id serial primary key,
	id_event integer references events(id),
	id_user integer references users(id),	
	description text,	
	registration_date_time timestamp without time zone not null ,
	attended BOOLEAN,
	observations text,
	rating decimal
);
