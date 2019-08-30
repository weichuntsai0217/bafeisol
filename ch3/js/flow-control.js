'use strict';
/**
  # 3-12 流程控制(flow control)概觀
  * 程式就是一系列的流程, 流程控制主要分為邏輯和迴圈(loop)

  * 邏輯: 程式要依據當下滿足的不同條件, 來進行不同的任務,
    這時就需要用關鍵字 if else 或 switch 去做邏輯控制.

  * 迴圈(loop): 程式中遇到類似的任務要連續做好多次的情境(而且每次只有資料不同, 但計算流程卻都一樣),
    這時我們需要用關鍵字 for 或 while 或 do while 搭配contiue或break 來建立迴圈去完成這個重複性的任務.

  * 迴圈就是某件事一直做一直做的意思.
*/

/**
  # 3-13 邏輯 - if
*/

/**
  範例1: 練習用 if 判斷包裹是否超重, 若超過400克就印出"超重", 反之則不用印出任何訊息.
*/
// var weight = 401
// if (weight > 400) {
//   console.log('超重')
// }

/**
  範例2: 練習用 if else 判斷包裹是否超重, 若超過400克就印出"超重", 否則就印出"不用加收運費".
*/
// var weight = 401
// if (weight > 400) {
//   console.log('超重')
// } else {
//   console.log('不用加收運費')
// }

/**
  範例3: 練習用 if else if 判斷包裹的重量是否需要加收運費, 加收規則如下
  1. 若 包裹重量 > 1000 則印出"加收運費400元"
  2. 若 包裹重量 <= 1000 但 > 800 則印出"加收運費300元"
  3. 若 包裹重量 <= 800 但 > 600 則印出"加收運費200元"
  4. 若 包裹重量 <= 600 但 > 400 則印出"加收運費100元"
  5. 若 包裹重量 <= 400 則印出"不用加收運費"
*/
// var weight = 1001
// if (weight > 1000) {
//   console.log('加收運費400元')
// } else if (weight <= 1000 && weight > 800) {
//   console.log('加收運費300元')
// } else if (weight <= 800 && weight > 600) {
//   console.log('加收運費200元')
// } else if (weight <= 600 && weight > 400) {
//   console.log('加收運費100元')
// } else if (weight <= 400) {
//   console.log('不用加收運費')
// }

/**
  # 3-13 Quiz 1
  1. 範例3只測了大於1000的條件, 請將其他條件也測完.
  2. 範例3的 if (...) 內的判斷式好像太複雜了, 你能將這些判斷式簡化嗎?
  3. 請回答下列程式會印出什麼值
     ```
     if (0) {
       console.log('Hello') 
     } else {
       console.log('world')
     }

     if (NaN) {
       console.log('See you') 
     } else {
       console.log('later')
     }

     if ('') {
       console.log('Nice to') 
     } else {
       console.log('meet you')
     }

     if (null) {
       console.log('I am') 
     } else {
       console.log('fine')
     }

     if (undefined) {
       console.log('Do you') 
     } else {
       console.log('understand')
     }
     ```
*/

/**
  # 3-14 邏輯 - switch
  switch只能用來做"是否等於"的邏輯判斷, 原則上if可以完全取代switch, 只是面對一些簡單的問題時,
  switch可以讓code看起來簡潔一些.
*/
/**
  範例1: 使用switch 來顯示使用者要去的商店是否有特價商品, 目前各商店的特價情況是
  1. 家樂福: 餅乾在特價
  2. 全聯: 蔬菜在特價
  3. 大潤發: 飲料在特價
  4. 其他商店: 都沒特價
*/
// var storeToGo = '全聯'
// switch (storeToGo) {
//   case '家樂福':
//     console.log('餅乾在特價')
//     break
//   case '全聯':
//     console.log('蔬菜在特價')
//     break
//   case '大潤發':
//     console.log('飲料在特價')
//     break
//   default:
//     console.log('都沒特價')
//     break
// }

/**
  範例2: switch真正的行為是, 一旦某個case有命中(以範例1的程式碼為例, 假設命中的case是"全聯"),
  則全聯之前的case內的程式碼都不會執行, 但全聯之後
  的case內的程式碼都會執行, 直到遇到break為止
*/
// var storeToGo = '全聯'
// switch (storeToGo) {
//   case '家樂福':
//     console.log('餅乾在特價')
//   case '全聯':
//     console.log('蔬菜在特價')
//   case '大潤發':
//     console.log('飲料在特價')
//   default:
//     console.log('都沒特價')
// }

/**
  # 3-14 Quiz 1
  現在假設家樂福也是"蔬菜在特價", 也就是說現在不論去家樂福還是去全聯, 都應該秀出同樣的特價商品資訊,
  請利用範例2學到的switch行為, 將範例1中的`case '家樂福':`區塊內的code改得簡潔一點
*/

/**
  # 3-15 迴圈 (loop) - for
  知道迴圈要重複執行幾次時, 就用for
*/

/**
  範例 1: 印出0 ~ 9
  你當然可以寫出以下程式來滿足需求
  ```
  console.log(0)
  console.log(1)
  console.log(2)
  console.log(3)
  console.log(4)
  console.log(5)
  console.log(6)
  console.log(7)
  console.log(8)
  console.log(9)
  ```
  但顯然上面這個方法太笨啦! 所以我們要用迴圈來完成這個任務
*/
// for (var i = 0; i < 10; i++) { // 3行就完成, 你就不用寫10行程式碼啦!
//   console.log(i)
// }
/**
  如下所示, 終止條件用 "i <= 9" 也行
  ```
  for (var i = 0; i <= 9; i++) {
    console.log(i)
  }
  ```
  只是這個情境大部分的人會傾向用 "i < 10", 因為10 - 0 = 10 剛好就是迴圈執行的次數
*/

/**
  # 3-15 Quiz 1
  1. 請用迴圈印出7 ~ 14
  2. 請用迴圈印出14 ~ 7 (從大印到小)
  3. 有個陣列資料如下
     ```
     var names = ['John', 'Mary', 'Bob']
     ```
     請用迴圈將names中的每個元素印出來.
*/

/**
  範例 2: 印出0 ~ 8, 但只印偶數
*/
// for (var i = 0; i < 9; i += 2) {
//   console.log(i)
// }

/**
  # 3-15 Quiz 2
  請用迴圈印出0 ~ 9, 但只印3的倍數(包含0)
*/

/**
  範例 3 練習用break中斷迴圈: 印出0 ~ 指定的數字, 但最大就印到10
*/
// var end = 120
// for (var i = 0; i <= end; i++) {
//   if (i > 10) {
//     break
//   }
//   console.log(i)
// }

/**
  範例 4 練習用continue跳過目前迴圈至下個迴圈: 印出0 ~ 9, 但不要印出2和7
*/
// for (var i = 0; i < 10; i++) {
//   if (i === 2 || i === 7) {
//     continue
//   }
//   console.log(i)
// }

/**
  # 3-15 Quiz 3
  印出0 ~ 指定的數字, 最大就印到12, 但不要印出4和11
*/

/**
  範例 5 練習使用for ... in: 將物件內所有的key都印出來
*/
// var product = {
//   name: '慢跑鞋',
//   price: 100,
//   color: 'black',
// }
// for (var key in product) {
//   console.log(key)
// }

/**
  # 3-15 Quiz 4
  將物件內所有的key和對應的value都印出來
*/

/**
  # 3-15 Quiz 5
  有個array `products`包含3個元素如下所示(每個元素都是一個物件, 代表一個商品):
  ```
  var products = [
    {
      name: '慢跑鞋',
      price: 500,
    },
    {
      name: '蘋果汁',
      price: 200,
    },
    {
      name: '洋芋片',
      price: 100,
    },
  ]
  ```
  請練習用迴圈將`products`內含的商品資訊印出, 如下所示(包含表頭也要):
  ```
  ----------
  商品名  價錢
  ----------
  慢跑鞋  500
  蘋果汁  200
  洋芋片  100
  ```
*/

/**
  # 3-16 迴圈 (loop) - while
  迴圈執行的次數不確定時, 就用while
*/

/**
  範例 1: 猜數字遊戲, 電腦擲一個3面的骰子(點數為0, 1, 2)讓你猜點數, 你猜中遊戲就結束,
  若沒猜中, 電腦就重新擲骰, 重複這個步驟直到你猜中為止
*/
// while (true) {
//   var point = Math.floor(Math.random()*3)
//   var yourGuess = parseInt(prompt('猜猜看骰子點數是1或2或3'))
//   if (point === yourGuess) {
//     alert('恭喜猜中! 遊戲結束.')
//     break
//   }
//   alert('沒猜中QQ, 遊戲繼續')
// }

/**
  範例 2: 印出0 ~ 9
  while當然也可以用在"知道迴圈要執行幾次"的情境, 先前說的原則只是一種建議.
*/
// var i = 0
// while (i < 10) { // 若使用for, 則 這行 和 上一行 以及 i++那行 可以寫成同一行, 這就是為什麼迴圈次數若確定, 比較建議用for
//   console.log(i)
//   i++
// }

/**
  # 3-16 Quiz 1
  給定任意正整數, 請用while計算該正整數是否為2的k次方(k為大於等於0的整數), 若是就印出true, 否則印出false
  
  答案如下
  ```
  var n = 16
  var ans = true
  while (n > 1) {
    var r = n % 2
    if (r !== 0) {
      ans = false
      break
    }
    n = Math.floor(n / 2)
  }
  console.log(ans)
  ```
*/

/**
  範例 3: 你以為 for 真的不能用在 迴圈執行次數不確定 的 情境嗎?
  當然可以, 我們可以將範例1的猜數字遊戲用 for 改寫如下
*/
// for (; true ;) {
//   var point = Math.floor(Math.random()*3)
//   var yourGuess = parseInt(prompt('猜猜看骰子點數是1或2或3'))
//   if (point === yourGuess) {
//     alert('恭喜猜中! 遊戲結束.')
//     break
//   }
//   alert('沒猜中QQ, 遊戲繼續')
// }

/**
  # 3-17 迴圈 (loop) - do while
  迴圈執行的次數不明確但至少要執行一次, 就用do while
*/

/**
  範例 1: 印出 指定的數字 ~ 5, 若指定的數字超過5, 那印出指定的數字就好
*/
// var i = 7
// do {
//   console.log(i)
//   i++
// }
// while (i <= 5)

/**
  # 3-17 Quiz 1
  印出 指定的數字 ~ 8, 但只有偶數要被印出來; 若指定的數字超過8 或 指定的數字是奇數, 則印出指定的數字就好

  答案如下
  ```
  var i = 2
  do {
    console.log(i)
    i+=2
  }
  while (i <= 8 && (i % 2 === 0))
  ```
*/
