/**
  # 4-5 資料庫(database)
  (要用張圖跟讀者介紹)
  1. 資料庫就是存放資料的地方
  2. 若我把需要的資料(可能是商品資料)存成一堆.txt的文字檔,
     則存放這群文字檔的資料夾也可以稱為一個資料庫; 例如,
     
     我將食品類商品的資料存在"food.txt"如下
     ```
     1. 商品名稱: 香脆雞腿堡
        商品售價: 100
     2. 商品名稱: 高纖大麥片
        商品售價: 200
     ```
     
     我也可以將服飾類商品的資料存在"fashion.txt"如下
     ```
     1. 商品名稱: 蕾絲洋裝
        商品售價: 1000
     2. 商品名稱: 高領毛衣
        商品售價: 2000
     ```
  3. 若用上述方法存資料, 則當資料越來越多, 程式查找/更新這些資料的速度就會很慢, 因此我們需要更快更有效率的做法.
     於是人們發明了關聯式資料庫(relational database), 關聯式資料庫用了特殊的方法將資料存成檔案,
     這些檔案的內部結構像表格一樣, 可以讓資料的查詢和更新變得很快.
  4. 關聯式資料庫也提供了一套語言方便人們對資料庫進行查找/更新,
     這個語言叫做SQL (Structured Query Language 結構化查詢語言)
  5. 不管是資料庫或者關聯式資料庫, 指的其實都是概念而已, 將這種概念化為實作後, 才成了我們使用的關聯式資料庫產品. 關聯式資料庫的產品很多,
     例如: MySQL, Microsoft SQL etc., 這些都是實作關聯式資料庫的產品.
  6. 我們將使用MySQL - 一個老牌又免費的關聯式資料庫來讓大家練習操作.
  7. 待會兒的demo你會發現, 一言以敝之, 關聯式資料庫其實就是個放了一堆表格的倉庫.
*/

/**
  # 4-6 先demo一下透過網頁操縱MySQL
  * 每個指令用網頁phpmyadmin GUI操作後, 要show對應的SQL指令(告訴讀者, 可以透過這個方法找出你不知道的指令);
    網頁部分都demo完, 再示範command line (但command line只要示範幾個指令即可)

  * 資料庫, 資料表格, 以及表格欄位名稱, 一律小寫且用snake_case ,
    原因: 因為不同作業系統對檔案名稱大小寫的敏感程度不同,
    例如windows和Mac OSX對檔名大小寫不敏感(a和A視為一樣), 但Linux對檔名大小寫敏感(a和A視為不一樣)
    一些整理請見 https://codertw.com/%E4%BC%BA%E6%9C%8D%E5%99%A8/172938/

  * 要跟讀者說建立的資料庫相關檔案放在哪

  * MySQL可以建好幾個資料庫, 每個資料庫用來放不同類的資料.
  * 每個資料庫都可以包含多個資料表格(table)

  * SQL指令中的關鍵字大小寫都可以, 我們一律用大寫

  * 自定義的名稱(資料庫名稱, table名稱, 欄位名稱), 一律用``包住, 每個SQL語句的結尾一定要用分號(;)

  要帶過的SQL指令
  * 顯示目前電腦上有哪些資料庫:
    ```
    SHOW DATABASES;
    ```

  * 建立新的資料庫:
    ```
    # 法1: 指定編碼
    CREATE DATABASE `store` DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

    # 法2: 不指定編碼(編碼使用MySQL預設值)
    CREATE DATABASE `store`;
    ```

  * 看MySQL目前的編碼狀況
    ```
    SHOW VARIABLES LIKE '%char%';
    ```

  * 改變資料庫`store`的編碼
    ```
    ALTER DATABASE `store` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    ```

  * 改變資料庫`store`的table `products`編碼
    ```
    ALTER TABLE `store`.`products` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    ```

  * Table相關操作 (以`store`的table `products`為例)
    - 在資料庫`store`中建立一個新的table `products`, 且
      `products`包含 `img_src`, `title`, `price`, `id`, `description` 這5個欄位,
      只有`description`可以填入空值(NULL, 代表無資料的意思):
      ```
      CREATE TABLE `store`.`products` ( 
      `img_src` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
      `title` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
      `price` INT(9) UNSIGNED NOT NULL ,  
      `id` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,  
      `description` VARCHAR(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL ,    
      PRIMARY KEY  (`id`)) 
      ENGINE = InnoDB;
      ```

    - 列出table的欄位資訊
      ```
      DESCRIBE `store`.`products`;
      ```

    - 新增(Create)一筆資料到table中
      ```
      INSERT INTO `store`.`products` (`img_src`, `title`, `price`, `id`, `description`)
      VALUES ('food/food-07.jpg', '香脆雞腿堡', '700', 'FOOD07', '我是不辣的香脆雞腿堡');
      ```

    - 將從csv檔匯入已存在的table
      ```
      # 請先將products.csv放到根目錄再執行
      LOAD DATA INFILE '/products.csv' 
      INTO TABLE `store`.`products`
      CHARACTER SET utf8mb4 # 這行非常重要, 沒設定的話MySQL會以預設的編碼讀入, 然後在MySQL中, 中文會變亂碼
      FIELDS TERMINATED BY ',' 
      OPTIONALLY ENCLOSED BY '\''
      LINES TERMINATED BY '\n'
      IGNORE 1 ROWS;
      ```
      csv檔案的第一列通常是欄位名稱, `IGNORE 1 ROWS`就是忽略檔案的前1列, 讓第一列不要被匯入MySQL.

    - 查詢(Read) table的所有資料, 且所有欄位都要看.
      ```
      SELECT * FROM `store`.`products`;
      ```
    
    - 查詢(Read) table的前4筆資料, 且所有欄位都要看.
      ```
      SELECT * FROM `store`.`products` LIMIT 4;
      ```

    - 查詢(Read) table的第2筆到第5筆資料(共4筆), 且所有欄位都要看.
      ```
      # MySQL會有一個內建的資料順序的編號, 這個編號從0開始(跟JavaScript array元素的編號從0開始是一樣的),
      # 所以第2筆的編號其實是1
      SELECT * FROM `store`.`products` LIMIT 1, 4;
      ```

    - 查詢(Read) table的所有資料, 但只看title, 和price這2個欄位
      ```
      SELECT `title`, `price` FROM `store`.`products`;
      ```

    - 查詢(Read) table中title為'香脆雞腿堡'的資料, 所有欄位都要看.
      ```
      SELECT * FROM `store`.`products` WHERE `title` = '香脆雞腿堡';
      ```

    - 查詢(Read) table中title不為'香脆雞腿堡'的資料, 所有欄位都要看.
      ```
      SELECT * FROM `store`.`products` WHERE `title` != '香脆雞腿堡';
      ```

    - 查詢(Read) table中price >= 200 且 price <= 600 的資料, 所有欄位都要看.
      ```
      # 法1
      SELECT * FROM `store`.`products` WHERE `price` >= 200 AND `price` <= 600;

      # 法2
      SELECT * FROM `store`.`products` WHERE `price` BETWEEN 200 AND 600;
      ```

    - 查詢(Read) table中price < 200 或 price > 600 的資料, 所有欄位都要看.
      ```
      SELECT * FROM `store`.`products` WHERE `price` < 200 OR `price` > 600;
      ```
    
    - Quiz: 查詢 title不是'香脆雞腿堡', 且price >= 100 但 < 600 的前3筆資料, 只看title, 和price這2個欄位
      ```
      SELECT `title`, `price` FROM `store`.`products` WHERE `title` != '香脆雞腿堡' AND `price` >= 100 AND `price` < 600 LIMIT 3;
      ```

    - 查詢(Read) table的所有資料且顯示所有欄位, 但要用price遞增(價格由小到大)排序
      ```
      SELECT * FROM `store`.`products` ORDER BY `price`;
      ```

    - 查詢(Read) table的所有資料且顯示所有欄位, 但要用price遞減(價格由大到小)排序
      ```
      # DESC 是 descending (遞減) 的意思
      SELECT * FROM `store`.`products` ORDER BY `price` DESC;
      ```

    - 查詢(Read) table中description 包含'大方'這個字串 的資料, 所有欄位都要看.
      ```
      SELECT * FROM `store`.`products` WHERE `description` LIKE '%大方%';
      ```

    - Quiz: 查詢description包含 '大方' 或 description包含'酥脆' 的資料, 所有欄位都要看
      ```
      SELECT * FROM `store`.`products` WHERE `description` LIKE '%大方%' OR `description` LIKE '%酥脆%';
      ```

    - 更新(Update) table中符合特定條件的資料
      ```
      # 假設title是香脆雞腿堡的資料有2筆, 則這2筆資料都會被更新
      UPDATE `store`.`products` SET `price` = 150, `img_src` = 'food/food-08.jpg'
      WHERE `title` = '香脆雞腿堡';
      ```

    - Quiz: 將id為'FOOD07'的資料的price改成900, img_src改成'food/food-09.jpg'
      ```
      UPDATE `store`.`products` SET `price` = 900, `img_src` = 'food/food-09.jpg'
      WHERE `id` = 'FOOD07';
      ```

    - 刪除(Delete) table中符合特定條件的資料
      ```
      # 假設title是香脆雞腿堡的資料有2筆, 則這2筆資料都會被刪除
      DELETE FROM `store`.`products` WHERE `store`.`products`.`title` = '香脆雞腿堡';
      ```

    - 一直要打 `store`.`資料表格名稱` 很累, 有沒有什麼方法可以讓我不用一直打`store`?
      ```
      USE `store`; # 指定使用哪個資料庫, 接下來你就可以只打table名稱
      SELECT * FROM `products`;
      ```

    - 新增table欄位 'category', 且允許空值(NULL)
      ```
      ALTER TABLE `store`.`products` ADD
      `category` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL
      AFTER `description`;
      ```

    - Step 1. 將id=FASH01的資料的category欄位值改成'abc'
      Step 2. 將table欄位 'category' 的資料型態從VARCHAR改成INT(9), 並且欄位名稱改成'cat_id'
      ```
      ALTER TABLE `store`.`products` CHANGE `category` `cat_id` INT(9) NULL;
      ```
      你會發現錯誤, 因為id=FASH01的資料的category欄位值'abc' 是無法轉成INT的.
      category欄位的資料必須是整數數字的字串(例如: 1234) 或者 NULL (因為這個欄位允許NULL),
      之後將此欄位的資料型態改成INT才不會有問題

    - Quiz: 請將id=FASH01的資料的category欄位值改成'1234', 然後再執行
      ```
      ALTER TABLE `store`.`products` CHANGE `category` `cat_id` INT(9) NULL;
      ```
      看會不會成功

    - 刪除table欄位 'category'
      ```
      ALTER TABLE `store`.`products` DROP `category`;
      ```

  * 刪除資料庫 `store`的table `products`
    ```
    DROP TABLE `store`.`products`;
    ```

  * 刪除資料庫 `store`
    ```
    DROP DATABASE `store`;
    ```

  * join
    - 要用一張圖解釋inner join是怎麼執行的
    - join就是將2個以上的表格資料透過相關的欄位結合在一起, 變成一張新的大表格.
    - 何時要用join? 當你要查的資料落在2個以上的表格時, 你就要使用join
    - join的種類有inner join, outer join, left join, right, join.
      在此我們只討論inner join

    - 直接看範例最快: 
      我想要從products 和 product_details這兩個表格中,
      查詢 title, price, company, source
      我該怎麼做呢?
      ```
      USE `store`;
      SELECT `products`.`title`, `products`.`price`, `product_details`.`company`, `product_details`.`source`
      FROM `products`, `product_details`
      WHERE `products`.`id` = `product_details`.`id`;
*/

/**
  # 4-6 用Nodejs來操作我們需要的db
  * 法1和法2下SQL語句, 挑方便的用即可
  * 請讀者猜猜看A, B, C, D印出的順序
*/
var mysql = require('mysql')

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'store', // assign the database you want to use, and you can query with table name only.
  port: 3306,
})

con.connect(function(err) {
  if (err) throw err
  // console.log('A')
  console.log("MySQL Connected!")
  
  // SQL 法1:
  var sql = 'SELECT `title`, `price` FROM `products` WHERE `price` >= 100 AND `price` <= 600'
  
  // SQL 法2:
  // var sql = mysql.format(
  //   'SELECT `title`, `price` FROM `products` WHERE `price` >= ? AND `price` <= ?',
  //   [100, 600]
  // )
  con.query(sql, function (err, result, fields) {
    if (err) throw err
    // console.log('B')
    console.log('result =', result)
  })
  // console.log('C')
})
// console.log('D')
