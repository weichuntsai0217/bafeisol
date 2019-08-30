DROP TABLE `store`.`contacts`;

CREATE TABLE `store`.`contacts` (
`account` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,
`name` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
`mobile` VARCHAR(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
`email` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
`address` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
`card_zone1` VARCHAR(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
`card_zone2` VARCHAR(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
`card_zone3` VARCHAR(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
`card_zone4` VARCHAR(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
`card_sec` VARCHAR(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
`card_exp_month` VARCHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
`card_exp_year` VARCHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,
PRIMARY KEY (`account`)
) ENGINE = InnoDB;
