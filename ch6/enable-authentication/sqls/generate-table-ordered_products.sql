DROP TABLE `store`.`ordered_products`;

CREATE TABLE `store`.`ordered_products` (
`id` VARCHAR(357) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,
`account` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,
`product_id` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,
`quantity` INT(2) NOT NULL ,
PRIMARY KEY (`id`)
) ENGINE = InnoDB;
