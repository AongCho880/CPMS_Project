

-- ------ Create Shop Table -----
DROP TABLE IF EXISTS shops;
DROP SEQUENCE IF EXISTS shops_id_seq;
CREATE SEQUENCE shops_id_seq START WITH 10001;
CREATE TABLE shops (
    s_id BIGINT PRIMARY KEY DEFAULT nextval('shops_id_seq'),
    s_name VARCHAR(255) NOT NULL,
    s_phone VARCHAR(255) NOT NULL,
    s_password VARCHAR(255) NOT NULL,
    s_div VARCHAR(255) NOT NULL,
    s_dist VARCHAR(255) NOT NULL,
    s_subdist VARCHAR(255) NOT NULL,
    s_union VARCHAR(255) NOT NULL,
	s_word VARCHAR(255) NOT NULL,
    s_road VARCHAR(255) NOT NULL,
    s_frontNID TEXT,
    s_backNID TEXT,
    s_Photo TEXT,
    s_selfiePhoto TEXT,
    s_location TEXT NOT NULL
);




-- ------ Create Product Table for admin-----
DROP TABLE IF EXISTS products;
DROP SEQUENCE IF EXISTS p_id_seq;
CREATE SEQUENCE p_id_seq START WITH 20001;
CREATE TABLE products (
    p_id BIGINT PRIMARY KEY DEFAULT nextval('p_id_seq'),
    p_name VARCHAR(255) NOT NULL,
    r_price TEXT,
    w_price TEXT,
    p_category VARCHAR(100) NOT NULL,
    image_data TEXT NOT NULL
);


-- Create Available Product Table ---
DROP TABLE IF EXISTS available;
CREATE TABLE available (
    p_id BIGINT NOT NULL,
    s_id BIGINT NOT NULL
);


-- Create Admin Table ---
DROP TABLE IF EXISTS admin;
CREATE TABLE admin (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(1000) NOT NULL
);


-- Create Customer Table ---
DROP TABLE IF EXISTS customers;
DROP SEQUENCE IF EXISTS c_id_seq;
CREATE SEQUENCE c_id_seq START WITH 60001;
CREATE TABLE customers (
    c_id BIGINT PRIMARY KEY DEFAULT nextval('c_id_seq'),
    c_name VARCHAR(100) NOT NULL,
    c_phone VARCHAR(20) UNIQUE NOT NULL,
    c_password VARCHAR(100) NOT NULL,
    c_frontNID TEXT, -- Store front NID image as binary data
    c_backNID TEXT, -- Store back NID image as binary data
    c_selfiePhoto TEXT -- Store selfie photo as binary data
);




-- Submit Registerd Shop Report Against Reg-Shop --
DROP TABLE IF EXISTS reports;

CREATE TABLE reports (
    r_id SERIAL PRIMARY KEY,
    s_id VARCHAR(255) NOT NULL,
    s_name VARCHAR(255),
    s_phone VARCHAR(20),
    s_div VARCHAR(100),
    s_dist VARCHAR(100),
    s_subdist VARCHAR(100),
    s_union VARCHAR(100),
	s_word VARCHAR(255),
    s_road VARCHAR(255),
    s_location VARCHAR(255),
    c_phone VARCHAR(20),
    c_name VARCHAR(255),
    c_frontNID TEXT, -- Store front NID image as binary data
    c_backNID TEXT, -- Store back NID image as binary data
    c_selfiePhoto TEXT, -- Store selfie photo as binary data
    s_report_description TEXT,
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    p_name VARCHAR(30),
    p_photo TEXT,
	s_photo TEXT,
	status VARCHAR(30)
);




-- Submit Non-Registerd Shop Report Against Reg-Shop --

DROP TABLE IF EXISTS nonregreports;
CREATE TABLE nonregreports (
    r_id SERIAL PRIMARY KEY,
    s_name VARCHAR(255),
    s_div VARCHAR(255),
    s_dist VARCHAR(255),
    s_subdist VARCHAR(255),
    s_union VARCHAR(255),
    s_word VARCHAR(255),
    s_road VARCHAR(255),
    s_location VARCHAR(255),
    s_photo TEXT,
    p_name VARCHAR(255),
    p_photo TEXT,
    c_phone VARCHAR(20),
    c_name VARCHAR(255),
    c_frontnid TEXT, -- Store front NID image as binary data
    c_backnid TEXT, -- Store back NID image as binary data
    c_selfiephoto TEXT, -- Store selfie photo as binary data
    s_report_description TEXT,
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	status VARCHAR(30)
);



-- INSERT INTO reports (s_id,s_name,s_phone,s_location,s_div,s_dist,s_subdist,s_union,s_road,p_id, p_name, r_price, w_price, tr_price, tw_price, r_status)
-- VALUES (10002,'minhaj','+801860919987','abcd,sadff,gas',' Chattogarm','cahttogram','hathazari','fatehpur','102 hellal',20001,  'Shirt', '20.50', '18.99', '25.00', '22.50','us'),
--        (10002,'minhaj','+801860919987','abcd,sadff,gas',' Chattogarm','cahttogram','hathazari','fatehpur','102 hellal',20002,  'pant', '50', '99', '250.00', '', 'us'),
--    		(10003,'raju','+801860919988','abcd,gas',' Dhaka','Dhaka','mirpur','fatehpur','105 abc',20001,  'pant', '50', '99', '', '100', 'us');


-- ---------Create table for Location------------

DROP TABLE IF EXISTS locations;
CREATE TABLE locations (
	unions VARCHAR(255),
	upazila VARCHAR(255),
	district VARCHAR(255),
    division VARCHAR(255) 
);
