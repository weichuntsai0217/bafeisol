DROP DATABASE `store`;

CREATE DATABASE `store` DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `store`.`products` ( 
`img_src` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
`title` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
`price` INT(9) UNSIGNED NOT NULL ,  
`id` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
`description` VARCHAR(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,    
PRIMARY KEY  (`id`)) 
ENGINE = InnoDB;
LOAD DATA INFILE '/products.csv' 
INTO TABLE `store`.`products`
CHARACTER SET utf8mb4 # 這行非常重要, 沒設定的話MySQL會以預設的編碼讀入, 然後在MySQL中, 中文會變亂碼
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '\''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

CREATE TABLE `store`.`product_details` ( 
`id` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
`original_price` INT(9) UNSIGNED NOT NULL ,  
`company` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
`source` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
`other` VARCHAR(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
PRIMARY KEY  (`id`)) 
ENGINE = InnoDB;
LOAD DATA INFILE '/product_details.csv' 
INTO TABLE `store`.`product_details`
CHARACTER SET utf8mb4 # 這行非常重要, 沒設定的話MySQL會以預設的編碼讀入, 然後在MySQL中, 中文會變亂碼
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '\''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

