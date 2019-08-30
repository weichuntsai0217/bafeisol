'use strict';
/**
  # 3-1 Warmup
  * 一個程式是一系列指令的集合, 這些指令依序執行後可以解決我們的問題.

  * 一個程式可以用很多不同的程式語言來撰寫, 主要是看這個程式是應用在哪個領域,
     例如: 網頁程式的首選就是JavaScript, 電腦遊戲的程式則常使用C/C++,
     數值分析的程式可能常使用Python.

  * 程式在解決問題的過程中必定涉及資料, 常見的情境是我們輸入一些資料,
     這些資料經過程式的處理或運算後, 輸出我們要的資料. 
*/

/**
  範例1: 我們想知道1+2等於多少, 於是我們寫一個程式來解決這個問題.
*/
// var a = 1
// var b = 2
// var c = a + b
// console.log(c)
/**
  console.log(a + b)
  console.log(1 + 2)
*/

/**
  # 3-1 Quiz 1
  請讀者計算 10482.384 和 687362.95 兩數相加的結果並輸出至螢幕上:
  (a) 使用變數來算
  (b) 不使用變數來算
*/


/**
  # 3-2 資料型態(Data Type)
  * 6大資料型態
     1. 數值(number)
        - 數字
        - NaN: 有特別功用, 平常用不到, 後面會講
     2. 字串(string)
     3. 布林值(boolean)
     4. 物件(object), 分三大類
        - 第1類是普通物件(Object) => 用大括號{}宣告
        - 第2類是陣列(Array) => 用中括號[]宣告
        - 第3類空值(null) => 代表什麼都沒有
     5. 未定義(undefined) => 代表未定義
     6. 函數(function) => 拿來包裝重複使用的程式碼

  * 使用 "typeof" 這個關鍵字 來確認資料型態；以上6大資料型態其實是以typeof輸出的結果為準.
*/

/**
  範例1: 所有資料型態的宣告方式
*/
// console.log('我是數值(number) =>', 1)
// console.log('我是數值(number) =>', 0.3) // 整數部分若是0, 也可以簡寫成".3"
// console.log('我是數值(number) =>', -0.3)
// console.log('我是數值(number) =>', 123e-5) // 123 x 10^-5 = 0.00123
// console.log('我是數值(number) =>', NaN)
// console.log('我是字串(string) =>', 'I am Jimmy')
// console.log('我是字串(string) =>', 'I \'am\' Jimmy') // 用單引號宣告的字串若內容有單引號, 則需要加反斜線\, 這個步驟稱為escape
// console.log('我是字串(string) =>', "I am Jimmy") // 建議都用單引號
// console.log('我是字串(string) =>', "I \"am\" Jimmy") // 用雙引號宣告的字串若內容有雙引號, 則需要加反斜線\, 這個步驟稱為escape
/**
  Math.parseInt('123') // 123
  Math.parseInt('abc') // NaN
*/
// console.log('我是布林值(boolean) =>', true)
// console.log('我是布林值(boolean) =>', false)

// var productName = '慢跑鞋'
// var productPrice = 100 // 商品的名稱和價格應該都可以分類到同一個商品底下(因為是同一個商品帶有的屬性, 應該要算在同一組), 有沒有比較精簡的方式來儲存這個商品的相關屬性呢?
// var product = {
//   name: '慢跑鞋',
//   price: 100,
// }
// console.log('我是物件(object) =>', product)
/**
  * 什麼是普通物件?
    普通物件就是1群 key-value pair 的集合, 其實就是一堆資料的集合罷了.

  * 什麼時候要用普通物件呢?
    答案是, 當一個現實生活中的東西, 這個東西身上帶有多個屬性(property/attribute)(屬性就是性質, 特徵的意思),
    而我們在JavaScript中想要儲存這個東西身上的這些屬性時, 就適合用一個普通物件來儲存;

    例如在現實生活中, 一個商品至少有2個屬性, 1個屬性是名稱(慢跑鞋), 另1個屬性是售價(100元), 那就適合用物件來表達這個商品.
    
    換個方向想, 你有一些資料適合分類在同一組, 這些資料就應該歸類在某個物件內(一個物件本身就是一組資料的集合), 例如
    商品的名字是慢跑鞋, 售價是100元, 這兩個資料都屬於同一個商品的特質, 則應該被包在代表那個商品的物件裡面.

  * 不論用多淺顯的比喻, "物件"對初學者來說是個比較難駕馭的概念, 但整件事的重點是,
    我們的資料要存成什麼型態, 才方便我解決程式中問題?
    物件說穿了, 不過是一種存資料的格式罷了;
    那存成物件會比存成其他形態方便嗎? 不見得, 要看你遇到的問題而定.
    寫程式是經驗的累積, 日後我們練習了更多例子和情境後, 你自然會更加理解物件的使用.
*/

// var productShoesPrice = 100
// var productTshirtPrice = 200
// var productPantsPrice = 300 // 這三個變數全都是指價格, 全部都是類似的東西, 我要怎麼表達一群價格?
// var prices = [100, 200, 300]
// console.log('我是物件(object)中的array =>', prices)
/**
  * 什麼時候要用陣列呢?
    宣告一群同性質的資料, 就適合用array, 例如一堆商品的價格. 每筆在陣列中的資料又稱為元素(element)
*/

/**
  我們規定一下用語, 以後講物件(object)通常指的就是普通物件 (例如"{ name: '鞋子', price: 100 }"),
  講陣列(array)指的就是array (例如"[1,2,3]")
*/

// console.log('我是物件(object)中的空值 =>', null)

// console.log('我是未定義(undefined) =>', undefined)

// console.log('我是函數(function) =>', function() {}) // 此處先有個初步概念, 日後的章節會再詳細講解.

/**
  範例2: 使用 "typeof" 這個關鍵字 來確認資料型態
*/
// console.log(typeof 1)
// console.log(typeof 0.3) // 整數部分若是0, 也可以簡寫成".3"
// console.log(typeof -0.3)
// console.log(typeof 123e-5) // 123 x 10^-5 = 0.00123
// console.log(typeof NaN)
// console.log(typeof 'I am Jimmy')
// console.log(typeof 'I \'am\' Jimmy')
// console.log(typeof "I am Jimmy")
// console.log(typeof "I \"am\" Jimmy")
// console.log(typeof true)
// console.log(typeof false)
// console.log(typeof { name: '慢跑鞋', price: 100 })
// console.log(typeof [100, 200, 300])
// console.log(typeof null)
// console.log(typeof undefined)
// console.log(typeof function() {})

/**
  順帶一提:
  普通物件和陣列的宣告方式差這麼多, 竟然都被typeof歸類到object, 日後我如果想分辨
  普通物件和陣列, 我該怎麼做呢?
  我們將在章節3-9的範例5來解答這個問題
*/

/**
  # 3-2 Quiz 1
  (a). 我有個資料想要拿來做加減乘除運算, 請問該使用何種資料型態代表這個資料?
  (b). 我有個資料代表一段文字, 請問該使用何種資料型態代表這個資料?
  (c). 我有個資料只有兩種值, 一種值是"正在特價", 另一種值是"非特價", 請問該使用何種資料型態代表這個資料?
  (d). 我有個資料代表一件商品, 這個商品名稱是"牛仔褲", 售價為200元, 請問該使用何種資料型態代表這個資料?
  (e). 我有個資料代表3個商品價格(分別是100, 200, 300元), 請問該使用何種資料型態代表這個資料?
  (f). 我有個資料代表什麼都沒有, 請問該使用何種資料型態代表這個資料?
  (g). 我有個資料代表什麼未定義, 請問該使用何種資料型態代表這個資料?
  (h). 我有一段10行的程式碼常常要被重複使用, 請問該使用何種資料型態來包裝這10行程式碼?
*/


/**
  # 3-3 變數(Variable)
  * 變數就是拿來儲存資料；或者說, 幫資料取個容易記住的名字

  * 宣告一個變數就是幫一塊記憶體取名字, 一塊記憶體就像一個櫃子,
    拿到這個有名字的櫃子後我們可以放各種不同的資料(用一張圖給讀者看).

  * 變數命名限制

  * 常用的命名規則
    - 小駝峰 (JavaScript的一般變數)
    - 大駝峰, 又稱Pascal規則 (JavaScript的類別(class), 以後的章節會解釋class)
    - snake case
*/

/**
  範例1: 宣告變數及相關使用
*/
// var a = 1 // 將1這個值存進a這個變數; 我們使用等號來賦值, 等號右邊的值會被存進等號左邊; 一個變數第一次出現, 一定要透過var這個關鍵字宣告.
// console.log(a)

// a = 3 // 修改a這個變數的值成3
// console.log(a)

// // var a = 4 // 已宣告過的變數請不要重複宣告(a這個名字已經宣告過了); 雖然瀏覽器不一定會報錯, 但重複宣告會讓人搞不清楚邏輯.

// var b = a + 4 // 運算式中a的值會被提取出來做運算, 然後因爲有等號, 所以運算完後的結果會再賦值給變數b
// console.log(b)

// b = b + 2 // 將原本b的值提取出來加2後, 再存回變數b
// console.log(b)

// var c // 宣告變數c, 但先不給特定的值, 日後再給
// console.log(c) // 宣告時沒給值, JavaScript預設會給undefined

// var x = 1, y = 2, z = 3 // 宣告多個變數在同一行(看個人習慣使用)

// e = 100 // e這個變數第一次出現卻沒有用var宣告, 瀏覽器會報錯.

// var myLovelyCat = 'Cathy' // 小駝峰
// var MyLovelyCat = 'Cathy' // 大駝峰
// var my_lovely_cat = 'Cathy' // snake case

/**
  # 3-3 Quiz 1
  請說明下列程式中console.log會印出什麼值?
  ```
  var x = 2
  var y = 3
  var z = 5
  z = x + y + z
  console.log(z)
  ```
*/

/**
  * 為什麼需要宣告變數？
    - 簡單說, 為了改一次就完成
    - 簡單說, 為了程式碼的可讀性, 讓程式碼好看一點.
    - 範例2, 3, 4, 5, 6會展示宣告變數的好處.
*/
/**
  範例2: 我想買一件100元的襯衫, 店家說買2件的話每件可以打95折, 
        那我想在螢幕上印出賣2件總共多少錢, 以及買2件的話平均1件多少錢
        (使用"*"進行乘法運算, "/"進行除法運算)
*/
// console.log(100 * 2 * 0.95)
// console.log(100 * 2 * 0.95 / 2)

/**
  範例3: 如果襯衫變成200元, 打折的規則同範例2, 我要問的問題相同, 則我的程式碼必須改2次
*/ 
// console.log(200 * 2 * 0.95) // 這行要改
// console.log(200 * 2 * 0.95 / 2) // 這行也要改

/**
  範例4: 承範例2, 如果我一開始就將價錢存成1個變數如下
*/
// var price = 100
// console.log(price * 2 * 0.95)
// console.log(price * 2 * 0.95 / 2)

/**
  範例5: 承範例4, 則當價錢變成200元時, 程式碼我只需要改1次就好
*/
// var price = 200 // 只要改這行
// console.log(price * 2 * 0.95)
// console.log(price * 2 * 0.95 / 2)

/**
  範例6: 承範例2, 假設今天改成買100件有打95折, 透過宣告變數,
        我們也可以清楚知道程式碼的意義而不會被混淆
*/
// var price = 100
// var quantity = 100
// console.log(price * quantity * 0.95)
// 若沒宣告變數, 上面這行會變成 console.log(100 * 100 * 0.95), 你根本搞不清楚哪個100是單價, 哪個100是數量
// console.log(price * quantity * 0.95 / quantity)
// 若沒宣告變數, 上面這行會變成 console.log(100 * 100 * 0.95 / 100), 你根本搞不清楚哪個100是單價, 哪個100是數量


/**
  # 3-3 Quiz 2
  請將下列程式中的"0.95"宣告成1個變數
  ```
  var price = 100
  var quantity = 100
  console.log(price * quantity * 0.95)
  console.log(price * quantity * 0.95 / quantity)
  ```
*/

/**
  # 3-4 運算子(Operators)概觀
  * 運算子就是可以讓變數做計算的關鍵字
  
  * 其實每行程式碼都只不過是一條算式(expression), 而每條算式
    都是由運算子(operator)和運算元(operand)構成的, 例如:
    ```
    var x = 1 + 2
    ```
    上面那行程式碼就是一個expression, 而 x 和 1 和 2 就是運算元, 至於 = 和 + 則是運算子

  * 運算子大致上分6大類
    1. 算數運算子(Arithmetic Operators)
    2. 賦值運算子(Assignment Operators)
    3. 比較運算子(Comparison Operators)
    4. 邏輯運算子(Logical Operators)
    5. 其他運算子
       - 確認資料型態
       - 三元運算子(Ternary Operator)
       - 存取屬性(Property accessors)
       - 刪除屬性
       - 確認類別
       - 建立新物件    
    6. [選讀] 位元運算子(Bitwise Operators)

  * 位元運算子對初學者可能比較困難, 讀者可以先跳過位元運算子的影片, 日後若有空可再回來學習這塊.
*/

/**
  # 3-5 算數運算子(Arithmetic Operators): +, -, *, /, %, **, ++, --
*/

/**
  範例1
*/
// var x = 7
// var y = 4
// var z = 50
// console.log(x + y)
// console.log(x - y)
// console.log(x * y)
// console.log(x / y)
// console.log(x % y) // 取餘數(Modulus operator)
// console.log(x ** y) // 指數運算(Exponentiation operator), 計算x的y次方

// ++z // Increment operator, 相當於z = z + 1
// console.log(z)

// z = 50
// z++
// console.log(z) // 乍看之下先++或後++好像沒有差別

// z = 50
// --z // Decrement operator, 相當於z = z - 1
// console.log(z)

// z = 50
// z--
// console.log(z) // 乍看之下先--或後--好像沒有差別

// z = 50
// console.log(++z) // 先進行z = z + 1 後, 再將新的z餵給console.log 印出來
/**
  console.log(++z)相當於依序執行以下2行:
  ```
  z = z + 1
  console.log(z)
  ```
*/

// z = 50
// console.log(z++) // 先將舊的z餵給console.log 印出來後, 才進行 z = z + 1
/**
  console.log(z++)相當於依序執行以下2行:
  ```
  console.log(z)
  z = z + 1
  ```
*/

// z = 50
// console.log(--z) // 先進行z = z - 1 後, 再將新的z餵給console.log 印出來

// z = 50
// console.log(z--) // 先將舊的z餵給console.log 印出來後, 才進行 z = z - 1

// var s1 = 'I am '
// var s2 = 'Jimmy'
// var res = s1 + s2
// console.log(res) // 字串(string)也可以進行加法, 此時+的功能是將2個字串聯接在一起.

/**
  # 3-5 Quiz 1
  請說出下列程式中console.log會印出什麼東西
  ```
  var x = 5
  var y = 3
  var z = 2
  var s1 = 'You are '
  var s2 = 'Dora'
  console.log(x + y - z)
  console.log(x * y / z)
  console.log(x % y)
  console.log(y ** z)
  console.log(x++)
  console.log(++y)
  console.log(s1 + s2)
  ```
*/

/**
  # 3-6 賦值運算子(Assignment Operators): =, +=, -=, *=, /=, %=, **=
*/

/**
  範例 1
*/
// var x = 2 // 我們學過了, 1個等號代表賦值
// var y = 3

// x += y // x = x + y
// console.log(x)

// x = 2
// x -= y // x = x - y
// console.log(x)

// x = 2
// x *= y // x = x * y
// console.log(x)

// x = 2
// x /= y // x = x / y
// console.log(x)

// x = 2
// x %= y // x = x % y
// console.log(x)

// x = 2
// x **= y // x = x ** y
// console.log(x)

/**
  # 3-6 Quiz 1
  請說出下列程式中console.log會印出什麼東西
  ```
  var x = 4
  x += 3
  x *= 5
  console.log(x)

  var s1 = 'Hello '
  console.log(s1 += 'World')
  ```
*/

/**
  # 3-7 比較運算子(Comparison Operators)
  * 用來比大小, 比較是否相等, 比完的結果會是布林值true或false
*/

/**
  範例 1
*/
// var a = 5
// var b = 10
// var c = '5'
// var x = a
// console.log(a == c) // 不看資料型態, 只看值是否相等; 若==的兩邊的data不是同型態, 會嘗試將其中一邊轉成和另一邊同樣型態後再比較值
// console.log(a === c) // 會看資料型態, 必須型態相同且值相同才會回傳true
// console.log(a != c) // 不看資料型態, 只看值是否不相等
// console.log(a !== c) // 會看資料型態, 只要資料型態或值其中一種不相等, 就會回傳true
// console.log(a > b)
// console.log(a < b)
// console.log(b > c) // 不看資料型態, 只看左邊值是否大於右邊
// console.log(b < c) // 不看資料型態, 只看左邊值是否小於右邊
// console.log(a >= b)
// console.log(a <= b)
// console.log(a <= x)
// console.log(a >= c) // 不看資料型態, 只看左邊值是否大於等於右邊
// console.log(a <= c) // 不看資料型態, 只看左邊值是否小於等於右邊

/**
  # 3-7 Quiz 1
  請說出下列程式中console.log會印出什麼東西
  ```
  console.log(true == 'true')
  console.log(false === false)
  console.log('' < 'a')
  console.log('a' < 'b')
  console.log('a' < 'aa')
  console.log('aa' < 'b')
  console.log('aba' < 'baa')
  console.log('aaa' < 'bbbb')
  ```
*/

/**
  # 3-8 邏輯運算子(Logical Operators)
  * `&&` => AND operator, 兩邊都true才會回傳true
  * `||` => OR operator, 只要其中一邊是true, 就會回傳true
  * `!` => NOT operator, true變false, false變true

  * 邏輯運算子作用的運算元可以是變數或算式且希望是布林值;
    如果餵進去的變數不是布林值, 就會被邏輯運算子強迫轉成布林值再運算;
    同理, 若算式算出來的不是布林值, 也會被邏輯運算子強迫轉成布林值後再進行運算.
*/

/**
  範例1: 餵變數
*/
// var x = true
// var y = false

// console.log(x && y)
// console.log(x && x)
// console.log(x || y)
// console.log(y || y)
// console.log(!x)
// console.log(!y)

/**
  範例2: 餵算式
*/
// var a = 5
// var b = 10

// console.log(a !== 2 && b > 6)
// console.log(a !== 2 && b < 6)
// console.log(a === 2 && b > 6)
// console.log(a === 2 && b < 6)

// console.log(a !== 2 || b > 6)
// console.log(a !== 2 || b < 6)
// console.log(a === 2 || b > 6)
// console.log(a === 2 || b < 6)

// console.log(!(a < b))
// console.log(!(a > b))

/**
  範例3: 非布林值的資料一旦轉成布林值會是什麼樣子?

  你可以用JavaScript的內建函數Boolean, 來看看非布林的值在JavaScript中會對應到哪個布林值.

  其他資料型態對應的布林值整理如下:
  * 數值(number):
    - 0 會被視為 false
    - 非0的數字不論正負都會被視為 true
  * 字串(string):
    - 空字串 '' 或 "" 會被視為 false
    - 有內容的字串 會被視為 true
  * 物件(object):
    - null 會被視為 false
    - 其他非null的物件(不論是普通物件{} 或 陣列[]) 都被視為 true
  * 未定義(undefined):
    undefined 被視為 false
  * 函數(function):
    只要是function都會被視為 true
*/
// console.log('0變成', Boolean(0) )
// console.log('1變成', Boolean(1) )
// console.log('-1變成', Boolean(-1) )
// console.log('空字串變成', Boolean('') )
// console.log('1個空格的字串變成', Boolean(' ') )
// console.log('John這個字串變成', Boolean('John') )
// console.log('null變成', Boolean(null) )
// console.log('{}變成', Boolean({}) )
// console.log('[]變成', Boolean([]) )
// console.log('{ name: \'John\' }變成', Boolean({ name: 'John' }) )
// console.log('[1, 2, 3]變成', Boolean([1, 2, 3]) )
// console.log('undefined變成', Boolean(undefined) )
// console.log('函數變成', Boolean(function () {}) )
// console.log('true本來就是', Boolean(true) )
// console.log('false本來就是', Boolean(false) )

/**
  範例4: && 和 || 運算後的回傳值
  
  && 和 || 運算後回傳的真的是布林值嗎? 答案是 No!
  
  && 的運算規則其實是這樣, 假設我要算 a && b , 那會有2種狀況:
  1. 如果a對應的布林值是false, 則回傳a
  2. 如果a對應的布林值是true, 則不論b對應的布林值是什麼, 都會直接回傳b
  
  || 的運算規則其實是這樣, 假設我要算 a || b , 那會有2種狀況:
  1. 如果a對應的布林值是true, 則回傳a
  2. 如果a對應的布林值是false, 則不論b對應的布林值是什麼, 都會直接回傳b
*/
// console.log(0 && 1)
// console.log(0 && null)
// console.log(1 && 0)
// console.log(1 && 2)

// console.log(1 || 0)
// console.log(1 || 2)
// console.log(0 || 1)
// console.log(0 || null)

// console.log(1 || false)
// console.log(2 && true )

/**
  # 3-8 Quiz 1
  請說出下列程式中console.log會印出什麼東西
  ```
  var a = 7
  var b = 3
  var c = 1
  console.log(a < 10 && b < 5 && c < 1 )
  console.log(a < 10 && b < 5 || c < 1 )

  var d = undefined || {}
  var e = undefined || []
  var f = '' && 'John'
  var g = '' || 'John'
  console.log(d)
  console.log(e)
  console.log(f)
  console.log(g)
  ```
*/

/**
  # 3-9 存取屬性(Property accessors)運算子
  1. 物件可以使用關鍵字 "[]" 或 "." 存取值.
  2. 陣列只能使用關鍵字 "[]" 存取值.
  3. 字串只能使用關鍵字 "[]" 取值, 但無法存值.
  
*/

/**
  範例 1: 物件
*/
// var product1 = {
//   name: 'Apple Juice',
//   price: 50,
//   dateInfo: {
//     manufacturingDate: '2019-09-01', // 製造日期
//     expirationDate: '2020-01-01', // 有效日期
//   },
// }
// var key1 = 'name'
// var key2 = 'price'

/**
  取(讀)物件屬性的值
*/
// console.log(product1.name)
// console.log(product1['name'])
// console.log(product1[key1])
// console.log(product1.country) // 取不存在的屬性, 會得到undefined

/**
  # 3-9 Quiz 1
  請用剛剛學到的3種取值方法, 取出product1的price屬性的值
*/

/**
  取(讀)深層物件屬性的值; 深層就是說物件屬性對應的值仍是個物件;
*/
// product1.dateInfo是個物件, 因此可以繼續使用"[]" 或 "."取值
// console.log(product1.dateInfo.manufacturingDate)
// console.log(product1.dateInfo.expirationDate)
// 你也可以這樣取
// var info = product1.dateInfo
// console.log(info.manufacturingDate)
// console.log(info.expirationDate)

/**
  # 3-9 Quiz 2
  假設有個物件長這樣
  ```
  var obj = {
    aa: {
      bb: {
        cc: 'Hello World'
      }
    }
  }
  ```
  請取出最內層屬性"cc"的值
*/

/**
  存(改)物件屬性的值
*/
// product1.price = 100 // 修改price的值
// console.log(product1.price)
// product1['price'] = 100 // 也可以這樣寫
// product1[key2] = 100 // 也可以這樣寫
// product1.discount = 0.1 // 新增屬性"discount"且值為0.1
// console.log(product1.discount)

/**
  # 3-9 Quiz 3
  1. 請用剛剛學到的3種存值方法, 將product1最內層屬性"expirationDate"的值改成'2020-01-31'
  2. 請幫product1新增一個屬性"company"代表商品出品公司的資訊, 屬性"company"對應的值是個物件如下:
     ```
     {
       name: 'Big Apple Company',
       phone: '123-456-789',
     }
     ```
*/

/**
  範例 2: 陣列(array)
*/
// var prices = [100, 200, 300]
// console.log(prices[0]) // 從0開始編號(index)
// console.log(prices[1])
// console.log(prices[2])
// console.log(prices[3]) // 會得到undefined, 因為陣列元素的編號最大只到2, 編號3以後都是不存在的元素
// console.log('prices的長度(length, 也就是prices包含的元素數量):', prices.length)
// prices[1] = 50 // 修改編號1的元素的值
// console.log(prices[1])
// prices[3] = 400 // 幫陣列新增一個元素, 一定要從原本最大的index的下一號開始新增
// console.log(prices)
// console.log(prices.0) // 瀏覽器會報錯, 因為陣列的元素不能用.來取值
/**
  # 3-9 Quiz 4
  給定一個陣列叫`names`如下
  ```
  var names = ['John', 'Mary', 'Bob']
  ```
  1. 請將`names`的編號1的元素改成'Alice'
  2. 請幫`names`新增一個元素'Rose'
*/

/**
  範例 3: 字串(string)
*/
// var text = 'cafe'
// console.log(text[0])
// console.log(text[1])
// console.log(text[2])
// console.log(text[3])
// console.log(text[4]) // 會得到undefined, 因為字元的編號最大只到3, 編號4以後都是不存在的字元
// console.log('text的長度(length, 也就是text包含的字元數量):', text.length)
// console.log(text.0) // 瀏覽器會報錯, 因為字串中的字元不能用.來取值
/**
  # 3-9 Quiz 5
  給定下面程式碼
  ```
  var fruit = 'apple'
  console.log(fruit[3])
  fruit[0] = 'b'
  console.log(fruit)
  ```
  1. 請問第一個`console.log` => `console.log(fruit[3])`會印出什麼?
  2. 請問第二個`console.log` => `console.log(fruit)`會印出什麼?
*/

/**
  # 3-9 Quiz 6 綜合練習
  1. 你想將John這個人的資料輸入JavaScript程式來使用,
    John的資料如下:
      1. Name: John
      2. Age: 40
    John有個孩子, 資料如下:
      1. Name: Alice
      2. Age: 10
    請問你會怎麼存John的資料呢(要包含John的孩子)?
  2. 你有4個人的姓名資料, 分別是John, Mary, Alice, Bob,
    現在你想將這群類似的資料輸入JavaScript程式來使用,
    請問你會怎麼存這群資料呢?
  3. 陣列裡的每個元素一定都要是相同的資料型態嗎(例如, 都是string或都是number)?
*/

/**
  # 3-10 其他運算子
  1. 確認資料型態
  2. 三元運算子(Ternary Operator)
  4. 刪除屬性
  5. 確認類別
  6. [選讀] 建立新物件
*/

/**
  範例 1: 確認資料型態 typeof
*/
// var a = '之前就學過了, 使用我們的老朋友typeof來確認型態'
// console.log(typeof a)

/**
  # 3-10 Quiz 1
  請寫出一個邏輯判斷式, 判斷變數a的資料型態是否為string; 若是則印出true; 若不是, 則印出false.
*/

/**
  範例 2: 三元運算子(Ternary Operator): 使用關鍵字 "?" 和 ":"
*/
// var a = 5
// var b = a < 6 ? 'Yes' : 'No'
// var c = a > 6 ? 'Yes' : 'No'
// console.log(b)
// console.log(c)

/**
  # 3-10 Quiz 2
  請寫出一個程式, 若變數a的資料型態為string, 則變數b的值則設定成'Yes',
  若a不是string, 則變數b的值則設定成'No'
*/

/**
  範例 3: 刪除屬性: 使用關鍵字 "delete"
*/
// var product1 = {
//   name: 'Shoes',
//   price: 100,
// }
// console.log('product1被刪除屬性price前:', product1)

// delete product1.price
// console.log('product1被刪除屬性price後:', product1)

// var prices = [100, 200, 300]
// console.log('prices被刪除編號1的元素前:', prices)
// console.log('prices被刪除編號1的元素前的長度:', prices.length)

// delete prices[1]
// console.log('prices被刪除編號1的元素後:', prices)
// console.log('prices被刪除編號1的元素後的長度:', prices.length)

/**
  # 3-10 Quiz 3
  嘗試刪除一個不存在的屬性, 看看會發生什麼事
*/

/**
  範例 4: 確認類別: 使用關鍵字 "instanceof"
  你還記得typeof沒辦法辨認普通物件和陣列嗎? 我們來解決這個問題
*/
// var a = [100, 200, 300]
// var b = {} // 空物件
// console.log('a的資料型態:', typeof a)
// console.log('b的資料型態:', typeof b)
// console.log('a是陣列嗎?', a instanceof Array)
// console.log('b是陣列嗎?', b instanceof Array)

/**
  Array是JavaScript中的關鍵字, 代表陣列的類別(class),
  我們日後還會詳細討論類別的使用, 讀者此處只要有基本認知即可.
*/

/**
  # 3-10 Quiz 4
  請說明下列程式會印出什麼值
  ```
  console.log([] instanceof Array)
  console.log({} instanceof Array)
  ```
*/

/**
  範例 5: [選讀] 建立新物件: 使用關鍵字 "new"
*/
// var person = new Object({name: 'John', age: 40}) // 脫褲子放屁, 有點多餘R....
/**
  上面這行等效於
  ```
  var person = {name: 'John', age: 100}
  ```
*/
// console.log(person)
/**
  Object是JavaScript中的關鍵字, 代表最基本的類別(class),
  我們日後還會詳細討論類別的使用, 讀者此處只要有基本認知即可.
*/

/**
  # 3-10 Quiz 5
  猜猜看我們如何用Array這個關鍵字來建立陣列?
*/

/**
  # 3-11 運算子優先權 (Operator precedence)
  * 運算子的優先權決定哪個運算子先算, 哪個運算子後算
    例如, 當一行程式碼有加減乘除的運算子時, JavaScript會先乘除後加減

  * 如果你希望某個運算子優先運算, 請使用小括號()把該運算子和資料包起來

  * 初學時要記住所有的運算子優先權並不容易(你要常常寫code, 才真的會記起來),
    你只要記得, 當算式複雜時, 你想要優先計算的部分用小括號包起來就沒問題了.
  
  * 下列網頁有列出所有運算子的優先權比較:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
*/

/**
  範例 1: 基本的數值運算中, ** 高於 * / % 高於 + - 高於 =
*/
// var x = 7
// var y = 2
// var z = 3
// var w = 9 + x * y % z ** y / 2 // 這行會先計算指數(**)部分, 再算*%/(由左到右), 然後算"9 + "的部分, 最後算完的結果才賦值給變數w
// var u = (9 + x * y % z) ** y / 2 // 小括號內的會優先計算
// console.log(w)
// console.log(u)
// console.log( ((2 + 3) * 4 + 6) ** 2 ) // 小括號有2層, 內層的先算

/**
  # 3-10 Quiz 1
  請說出下列程式中console.log會印出什麼東西(請善用先前給的mozilla網頁)
  ```
  var x = 5
  var y = 3
  var z = 2
  console.log(x !== 2 && y > 1)
  console.log(x !== (2 && y) > 1)
  console.log( x + y * z )
  console.log( (x + y) * z )
  console.log( x / z + y / z )
  console.log( x / (z + y) / z )
  console.log( x * y ** z )
  console.log( (x * y) ** z )
  console.log( x * y % z ** y )
  console.log( (x * y % z) ** y )
  console.log( x * ++y )
  y = 3
  console.log( x * y++ )
  console.log( ++x**2 )
  x = 5
  console.log( x++**2 )
  x = 5
  console.log( (x++)**2 )
  ```
*/
