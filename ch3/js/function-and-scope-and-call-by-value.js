'use strict';
/**
  # 3-18 函數 (Function)
  若你有一段程式碼區塊需要被重複使用, 那你就需要函數
*/

/**
  範例 1 宣告和使用函數計算2數相加的值
*/

/**
  宣告方法1: 使用 Function declaration 的方式來宣告函數
*/
// function add(a, b) { // 初學者注意, 宣告只是要定義一個函數要做什麼事情, 並不會執行函數喔!
//   var c = a + b
//   return c
//   // return a + b
// }

// console.log(add(1, 2)) // 用小括號()和輸入的參數來執行函數
// var result = add(3, 4) // 也可將函數計算後回傳的結果保存到變數中供日後使用
// console.log(result)
/**
  小提醒
  1. 函數若沒有透過return來回傳值(沒寫return), 則JavaScript預設會回傳undefined.
  2. 函數的return後面若沒有寫任何要回傳的值, 則JavaScript預設會回傳undefined.
  3. 函數要不要回傳值, 完全視你的需求而定.
  4. 函數接受的參數可以有很多個, 但return的值永遠只有1個.
*/

/**
  宣告方法2: 使用 Function expression 的方式來宣告函數, 也就是宣告一個沒有名字的函數然後透過等號將此函數指定給某個變數
*/
// var add = function(a, b) { // 相當於add就是這個函數的名字
//   return a + b
// }

// console.log(add(5, 6))

/**
  # 3-18 Quiz 1
  1. 請使用 Function declaration 的方式來宣告一個函數, 這個函數可以計算2數相減的值
  2. 請使用 Function expression 的方式來宣告一個函數, 這個函數可以計算2數相減的值
*/

/**
  範例 2: 若使用Function declaration 宣告函數, 則這個函數可以在宣告前執行, 也可以在宣告後執行.
*/
// var result = add(7, 8)
// console.log(result)

// function add(a, b) {
//   return a + b
// }

/**
  範例 3: 若使用Function expression 宣告函數, 則這個函數一定要在宣告後才能執行.
*/
// var c = add(9, 10) // 瀏覽器會報錯, 因為var add 那行還沒執行, 瀏覽器根本不知道有add這個函數的存在.
// console.log(c)

// var add = function(a, b) {
//   return a + b
// }

/**
  範例 4: 傳變數進function時, 發生了什麼事? 傳進去的變數的值會被函數改掉嗎?
*/
// var a = 2 // 這是外界宣告的a
// function add1(a) { // 這是函數內部宣告的a, 只給內部使用, 和外界無關.
//   // 在執行add1時, add1函數會把外界餵進來的值複製一份給內部的a, 這個a和外界的a完全無關(他們是不同的2個櫃子).
//   // 因此, 函數在宣告自己的參數時, 用什麼名字都沒關係, 就算用的名字和外界重複也沒差, 因為與外界根本無關.
//   a = a + 1
//   console.log('函數內部的a =', a)
// }
// add1(a)
// console.log('外部的a =', a) // 在函數外面宣告的a的值完全不會被函數改到.

/**
  # 3-18 Quiz 2
  請說明下列程式碼會印出什麼東西
  ```
  var a = 1
  function add2(a) {
    a = a + 2
    return a
  }
  console.log(add2(a))
  console.log(a)
  ```
*/

/**
  範例 5: 這個範例是要讓大家感覺使用function的好處;
  我有4個不同的直角三角形底邊和對邊資料且單位為公分(cm), 請幫我計算這4個直角三角形的斜邊並印出來
  * 第1個三角形: 底邊 1, 對邊 1
  * 第2個三角形: 底邊 3, 對邊 4
  * 第3個三角形: 底邊 5, 對邊 12
  * 第4個三角形: 底邊 7, 對邊 24
*/

/**
  法1: 不使用function, 直接1個1個算, 程式碼很冗長, 指數和加法和小括號的部分也必須重複寫好幾次
*/
// console.log((1**2 + 1**2)**0.5)
// console.log((3**2 + 4**2)**0.5)
// console.log((5**2 + 12**2)**0.5)
// console.log((7**2 + 24**2)**0.5)

/**
  法2: 使用function
*/
// function len(a, b) {
//   return (a**2 + b**2)**0.5
// }

// console.log(len(1, 1)) // 每行程式都變短, 而且也好看很多
// console.log(len(3, 4))
// console.log(len(5, 12))
// console.log(len(7, 24))

/**
  範例 6: 剛範例4給的資料的單位是公分(cm), 假設我希望斜邊顯示的單位是公釐(mm),
  請比較範例4的法1和法2會有什麼區別.
  1公分 = 10公釐
*/
/**
  法1: 直接1個1個算的話, 要改4行, 如果今天有100個三角形的斜邊要算, 就要改100行...
*/
// console.log((1**2 + 1**2)**0.5 * 10)
// console.log((3**2 + 4**2)**0.5 * 10)
// console.log((5**2 + 12**2)**0.5 * 10)
// console.log((7**2 + 24**2)**0.5 * 10)

/**
  法2: 只要改function的內容即可, 一次搞定.
*/
// function len(a, b) {
//   return (a**2 + b**2)**0.5 * 10 // 改一次就搞定.
// }

// console.log(len(1, 1))
// console.log(len(3, 4))
// console.log(len(5, 12))
// console.log(len(7, 24))

/**
  範例 7: function接受的參數可以是六大資料型態中的任何一種,
         所以你也可以將function作為參數傳進另一個function.
*/
// welcome('John', popupMessage)

// function welcome(name, doSomething) {
//   console.log('Hello,', name)
//   doSomething(name)
// }

// function popupMessage(name) {
//   alert('歡迎' + name + '光臨!')
// }

/**
  範例 8: JavaScript是很自由的, 物件的屬性對應的值也可以是function, array中的元素也可以是function.
*/
// var product = {
//   name: 'Apple Juice',
//   price: 100,
//   getOnSalePrice: function(discount) {
//     return 100 * (1 - discount)
//   },
// }
// console.log(product.getOnSalePrice(0.1))

// var differentWelcomes = [
//   function(name) {
//     console.log('Hi,', name)
//   },
//   function(name) {
//     console.log('Hello,', name)
//   },
//   function(name) {
//     console.log('Nice to meet you,', name)
//   }
// ]
// differentWelcomes[0]('Jimmy')
// differentWelcomes[1]('Jimmy')
// differentWelcomes[2]('Jimmy')

/**
  # 3-18 Quiz 3
  1. 請判斷以下程式會印出什麼結果
     ```
     var x = 1
     var result = showText(x)
     console.log(result)

     function showText(a) {
       if (a > 1) {
         return 'Hello World'
       }
     }
     ```
  2. 請判斷以下程式會發生什麼事
     ```
     var x = 1
     var result = showText(x)
     console.log(result)

     var showText = function(a) {
       if (a > 1) {
         return 'Hello World'
       }
     }
     ```
*/

/**
  # 3-18 Quiz 4
  寫一個function會印出歡迎某人的訊息.
  例如: function輸入的參數為'John', 則要印出'Hi John, nice to meet you.'

  function 接受的參數只有一個, 也就是人的姓名,
  function 不用return值.
*/

/**
  # 3-18 Quiz 5
  寫一個function 判斷包裹的重量要加收多少運費.
  function 接受的參數只有一個, 也就是包裹重量,
  function return的值則是要加收的運費(number 型態).

  加收運費的規則如下
  1. 若 包裹重量 > 1000 則加收運費400元
  2. 若 包裹重量 <= 1000 但 > 800 則加收運費300元
  3. 若 包裹重量 <= 800 但 > 600 則加收運費200元
  4. 若 包裹重量 <= 600 但 > 400 則加收運費100元
  5. 若 包裹重量 <= 400 則不用加收運費
*/

/**
  # 3-18 Quiz 6
  寫一個function印出指定的整數區間(整數包含負整數, 0 , 和正整數), 而且要由小印到大.
  function 接受的參數有2個, 第1個參數是區間起點的整數, 第2個參數是區間終點的整數
  function 不用return值.
  一旦function輸入的終點小於起點, 則印出'輸入錯誤.'
*/

/**
  # 3-18 Quiz 7
  寫一個function將物件內所有的key和對應的value都印出來.
  function 接受的參數為1個物件.
  function 不用return值.
*/

/**
  # 3-18 Quiz 8
  我有個array存了幾個商品的價錢(也就是陣列內所有的元素都是數值型態),
  寫一個function將這幾個商品加總後的價錢算出來.
  function 接受的參數為1個array.
  function return的值為總價錢.
*/

/**
  # 3-19 視野 (Scope)
  * 視野(Scope)指的是瀏覽器執行JavaScript時所能看到的變數的範圍;
    視野要解決的問題是, 當瀏覽器執行到某一行時
    1. 到底看得到哪些變數?
    2. 遇到同名變數, 要取哪一個?

  * 視野分兩種
    1. global scope: 在function外部的程式碼範圍.
    2. local scope (或稱function scope): 在function內部的程式碼範圍.

  * 在global scope宣告的變數叫做global variable;
    在local/function scope宣告的變數叫做local variable

  * 瀏覽器執行JavaScript時, 是怎麼找到變數的呢?
    簡單講就是滿足3大規則
    1. 先找裡面, 再找外面.
    2. 在function裡面看得到外面, 但在function外面看不到裡面
    3. 若變數真的找不到, 會被設定成undefined

    講詳細一點是這樣:
    1. 執行的指令若在function內, 則從function內(已經執行過的程式碼)開始找變數,
       若找到就取值; 若沒找到, 就一路往function的外面找直至找到global的scope為止.
    2. 執行的指令若在global, 則只會在global的scope尋找變數.
*/

/**
  範例 1: 此a非彼a
*/
// var a = '我是global a' // 是global的a
// function fn1() {
//   var a = '我是local a' // 是local的a, 和global的a是兩個完全不一樣的櫃子, 只是這兩個櫃子的名字都叫a
//   console.log(a)
// }

// fn1()
// console.log(a)

/**
  # 3-19 Quiz 1
  請說明下面程式碼會印出什麼值, 並說明為什麼
  ```
  var a = 9
  function fn1() {
    var a = 3
    a += 5
    console.log(a + 4)
  }

  fn1()
  console.log(a)
  ```
*/

/**
  範例 2: function宣告的參數也是local variable
*/
// var a = '我是global a' // 是global的a
// function fn1(a) { // 是local的a
//   console.log(a)
// }

// fn1('仍是local呦')
// console.log(a)

/**
  # 3-19 Quiz 2
  請說明下面程式碼宣告的function fn1中, 總共宣告了幾個local variable
  ```
  var x = 9
  function fn1(a, b, c) {
    var d = 20
    var e = 15
  }
  ```
*/

/**
  範例 3: 在function裡面看得到function外面
*/
// var a = '我是global a' // 是global的a
// function fn1() {
//   console.log('裡面找不到a, 就只好找外面有沒有a, 外面的a =', a)
// }

// fn1()
// console.log(a)

/**
  # 3-19 Quiz 3
  請說明下面程式碼執行後會印出什麼結果
  ```
  var a = 1
  var b = 2
  function fn1() {
    var b = 3
    console.log(a)
    console.log(b)
  }

  fn1()
  ```
*/

/**
  範例 4: 在function外面看不到function裡面
*/
// var a = '我是global a' // 是global的a
// function fn1() {
//   var a = '我是local a'
//   console.log(a)
// }

// console.log(a)

/**
  # 3-19 Quiz 4
  請說明下面程式碼執行後會印出什麼結果
  ```
  var a = 1
  var b = 2
  function fn1() {
    var a = 3
    var b = 4
  }

  console.log(a)
  console.log(b)
  ```
*/

/**
  範例 5: 在同個scope尋找時, 只會找執行過的程式碼(往上找)
*/
// var a = '我是a'
// console.log(a)
// console.log(b) // 執行到這行時b根本還沒宣告.
// var b = '我是b'

/**
  # 3-19 Quiz 5
  請說明下面程式碼執行後會印出什麼結果
  ```
  function fn1() {
    var a = 'Hello'
    console.log(a)
    console.log(b)
    var b = 'World'
  }

  fn1()
  ```
*/

/**
  範例 6: 既然在function裡面看的到外面, 那其實就可以改變function外面的變數的值
*/
// var a = '原本的a'
// console.log(a)

// function fn1() {
//   a = '被改掉啦!'
// }
// fn1()
// console.log(a)

/**
  # 3-19 Quiz 6
  1. 請說明下面程式碼執行後會印出什麼結果並解釋原因
     ```
     var a = 1
     console.log(a)

     function fn1() {
       a += 3
     }
     fn1()
     console.log(a)
     ```
  2. 請說明下面程式碼執行後會印出什麼結果並解釋原因
     ```
     var a = 1
     console.log(a)

     function fn1(a) {
       a += 3
     }
     fn1(a)
     console.log(a)
     ```
  3. 請說明下面程式碼執行後會印出什麼結果並解釋原因
     ```
     var a = 1
     console.log(a)

     function fn1(a) {
       a += 3
       return a
     }
     a = fn1(a)
     console.log(a)
     ```
*/

/**
  範例 7: 函數內可以繼續宣告函數
*/
// var x = 1
// function outer() {
//   var y = 2
//   function inner() {
//     var z = 3
//     console.log(z)
//     console.log(y)
//     console.log(x)
//   }
//   inner() 
// }
// outer()

/**
  # 3-19 Quiz 7
  1. 請說明下面程式碼執行後會印出什麼結果並解釋原因
     ```
     var x = 1
     function outer() {
       var y = 2
       inner()
       function inner() {
         var z = 3
         console.log(z)
         console.log(y)
         console.log(x)
       }
     }
     outer()
     ```
  2. 請說明下面程式碼執行後會印出什麼結果並解釋原因
     ```
     var x = 1
     function outer() {
       function inner() {
         var z = 3
         console.log(z)
         console.log(y)
         console.log(x)
       }
       var y = 2
       inner()
     }
     outer()
     ```
  3. 請說明下面程式碼執行後會印出什麼結果並解釋原因
     ```
     var x = 1
     function outer() {
       inner()
       var y = 2
       function inner() {
         var z = 3
         console.log(z)
         console.log(y)
         console.log(x)
       }
     }
     outer()
     ```
  4. 請說明下面程式碼執行後會印出什麼結果並解釋原因
     ```
     var x = 1
     function outer() {
       var y = 2
       inner()
       console.log(z)
       function inner() {
         var z = 3
         console.log(z)
         console.log(y)
         console.log(x)
       }
     }
     outer()
     ```
*/

/**
  # 3-20 Call by value
  整件事的核心在於"複製"到底都複製了什麼(用圖解釋每個範例)
*/

/**
  範例 1: 說好的複製呢? - 物件篇
*/
// var product = {
//   name: '慢跑鞋',
//   price: 100,
// }

// console.log('傳進fn1前, product =', product)
// fn1(product)
// console.log('傳進fn1後, product =', product)

// console.log('傳進fn2前, product =', product)
// fn2(product)
// console.log('傳進fn2後, product =', product)

// function fn1(obj) {
//   obj = 'Hello'
// }
// function fn2(obj) {
//   obj.name = '被改掉了'
// }

/**
  範例 2: 說好的複製呢? - 陣列篇
*/
// var prices = [100, 200, 300]

// console.log('傳進fn1前, prices =', prices)
// fn1(prices)
// console.log('傳進fn1後, prices =', prices)

// console.log('傳進fn2前, prices =', prices)
// fn2(prices)
// console.log('傳進fn2後, prices =', prices)

// function fn1(array) {
//   array = 'World'
// }
// function fn2(array) {
//   array[1] = -50
// }

/**
  範例 3: 說好的相等呢? - 物件篇
*/
// var product1 = {
//   name: '慢跑鞋',
//   price: 100,
// }
// var product2 = product1
// var product3 = {
//   name: '慢跑鞋',
//   price: 100,
// }
// console.log(product1 === product2)
// console.log(product1 === product3)

/**
  範例 4: 說好的相等呢? - 陣列篇
*/
// var prices1 = [100, 200, 300]
// var prices2 = prices1
// var prices3 = [100, 200, 300]
// console.log(prices1 === prices2)
// console.log(prices1 === prices3)

/**
  # 3-20 Quiz 1
  請說明下面程式碼執行後會印出什麼結果, 並解釋為什麼
  ```
  var product1 = {
    name: 'Apple Juice',
    price: 50,
    dateInfo: {
      manufacturingDate: '2019-09-01', // 製造日期
      expirationDate: '2020-01-01', // 有效日期
    },
  }

  var product2 = copyProduct(product1)
  product2.dateInfo.expirationDate = '2020-02-28'

  console.log('product1 過期日 =', product1.dateInfo.expirationDate)
  console.log('product2 過期日 =', product2.dateInfo.expirationDate)

  function copyProduct(product) {
    var result = {}
    result.name = product.name
    result.price = product.price
    result.dateInfo = product.dateInfo
    return result
  }
  ```
*/