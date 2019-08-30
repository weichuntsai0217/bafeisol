# DROP TABLE `store`.`users`;

CREATE TABLE `store`.`users` (
`account` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,
`passhash` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,
`salt` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,
PRIMARY KEY (`account`)
) ENGINE = InnoDB;
