
/**
  # 6-1 新的需求又來了
  * 商城客戶在反應, 目前使用上有2個問題
    1. 訂單被使用同一台電腦的人亂改: 家中只有一台電腦, 當家人們都想使用光速買購物時,
    每個人的訂單都混在一起無法區分, 例如: 媽媽訂單中加了2件衣服, 但還沒付款前,
    媽媽就跑去看電視; 就在此時, 爸爸想買3個漢堡, 結果一開網頁, 就看到訂單中有2件衣服(媽媽剛剛訂的, 放在cookie裡),
    但爸爸又沒有要買衣服, 就理所當然地把衣服刪掉, 然後新增3個漢堡, 於是下次媽媽來使用網頁時就發現
    自己先前的訂單都被改變了.
    2. 換成手機, 就要重新建立訂單, 因為原本的訂單是存在電腦的cookie裡:
    我原本在電腦上的瀏覽器建立訂單, 當我換成手機瀏覽器, 訂單就要重新建立.

  * 為了解決上述遇到的問題, 我們決定新增會員制度,
    每個客戶都要先註冊成會員, 會員使用網站建立訂單時要先登入,
    這樣不同會員的訂單就可以存在server端的database裡,
    若會員訂單尚未決定付款但電腦暫時要給別人用,
    此時這個會員只要先登出即可, 因為他的訂單早已存在server端.

  * 請思考一下, 若是你, 你要如何在database存會員資料?
    最簡單的方法是用一張如下的table
    --------------------
    account     password
    --------------------
    abc@g.com   12345678
    pqr@b.com   87654321
    .
    .
    .
    --------------------
    其中
    account是會員帳號(假設要求使用email),
    password是密碼(直接存客戶的原始密碼文字, 沒有任何加工)

    以上做法我們看到密碼欄位是明碼,
    這個做法會有3個問題
    1. 網站管理者可以直接看到會員密碼, 若管理者是不肖員工,
       則他可以直接拿會員密碼登入我們網站做壞事
       (亂下訂, 使用會員的信用卡付錢)
    2. 不肖員工也可以用會員的密碼去其他網站試試看, 一旦成功, 會員在其他網站的註冊資訊就外洩
    3. 若我們的databse被駭客入侵成功, 則會員資料就全部外洩.

    我們要如何解決存明碼的問題?
    一個常見的手法是使用hash(雜湊)搭配salt, hash是密碼學中的一個概念,
    我們在下一節中會簡單介紹一些密碼學的概念,
    並在更後面的章節展示如何使用hash搭配salt來解決存明碼問題

*/

/**
  # 6-2 基本密碼學
  * 很粗略的說, 密碼學是在討論把一段文字變成另一段文字的各種手法.

  * 密碼學想解決的問題
    - 如何防止偽造, 例如防止別人偽裝成我們.
    - 機密資訊若外洩, 怎樣才能將傷害降到最低.
    
  * 把一段文字轉換成另一段文字的手法有百百種(你也可以自己隨便想一種), 這些手法大致上可分為3大類
    那就是encode (編碼), encrypt (加密), 和hash (雜湊), 差異如下:
    - Encode / Endoding (編碼): encode後的文字可逆推; 只要知道encode演算法(轉換規則),
      任何人都可以從encode後的文字逆推回原始文字,
      常見的encode有: ASCII, Unicode, Base64, urlencode.

    - Encrypt / Encryption (加密): 加密後的文字可逆推, 但條件是你除了要知道加密演算法外,
      還必須有密鑰(secret key, 常簡稱為key, 密鑰其實是另一段文字, 只是用了個華麗的名稱).
      沒有密鑰的話就無法逆推回原始文字.
      講白話一點, 密鑰就是鑰匙, 可將原始文字上鎖(加密)也可解鎖(解密).
      常見的經典encrypt演算法又分2類:
      1. Symmetric Encryption (對稱式加密), 例如 AES, DES, 3DES
      2. Asymmetric Encryption (非對稱式加密), 例如 RSA, DSA, ECC

      對稱式加密指的是加密和解密用同一把密鑰(secret key).

      非對稱式加密指的是加密和解密用的是不同鑰匙,
      以習慣上來說,
      用來加密的鑰匙稱為公鑰(public key),
      而用來解密的則稱為私鑰(private key).
      (你想反過來用私鑰加密, 公鑰解密, 也可以)

    - Hash (雜湊): hash過的文字(雜湊值)無法逆推; 就算知道hash演算法, 你仍無法從hash過的文字逆推回原始文字.
      不同的文字用同一個hash方法(hash function)作用後, 若得到同一個雜湊值, 這種情況稱為collision (碰撞),
      例如:
        'abc' hash後得到   '123'
        'def' hash後也得到 '123'
      
      所以好的hash function應該要
      1. 不可逆, 不能從雜湊值中推出原始文字為何.
      2. 只要是不一樣的輸入, 就應該有不一樣的雜湊值 (或者說發生collision的機率要很小).
      3. 雜湊值的長度要保持一樣, 不會因為輸入的原始文字長度不同而改變輸出的雜湊值長度.
      
      常見的經典hash function有
      1. MD5 (MD = Message-Digest Algorithm): 已被證明會產生collision, 安全性較低
      2. SHA-0 (SHA = Secure Hash Algorithm): SHA-1的前身, 已被證明會產生collision
      3. SHA-1: 已被證明會產生collision, 是2011 ~ 2015主流使用在SSL 數位簽章的演算法
      4. SHA-2: 是SHA-1的下一代演算法,
         也是2017以後主流使用在SSL 數位簽章的演算法. SHA-2其實本身是個演算法的小家族,
         這個家族旗下又分6種演算法(以雜湊值的輸出長度來命名)
         1. SHA-224: 雜湊值的長度是224位元.
         2. SHA-256: 雜湊值的長度是256位元.
         3. SHA-384: 雜湊值的長度是384位元.
         4. SHA-512: 雜湊值的長度是512位元.
         5. SHA-512/224: 雜湊值的長度是224位元.
         6. SHA-512/256: 雜湊值的長度是256位元.
      5. SHA-3: 是SHA-2的下一代演算法, 使用情況目前(2019)並不普及. SHA-3也是一個演算法的小家族,
         這個家族旗下又分6種演算法(以雜湊值的輸出長度來命名)
         1. SHA3-224: 雜湊值的長度是224位元.
         2. SHA3-256: 雜湊值的長度是256位元.
         3. SHA3-384: 雜湊值的長度是384位元.
         4. SHA3-512: 雜湊值的長度是512位元.
         5. SHAKE128: 雜湊值的長度可以是任意位元.
         6. SHAKE256: 雜湊值的長度可以是任意位元.

      雜湊函數是不需要密鑰的, 一旦選定Hash function, 則輸出結果只跟輸入文字有關,
      例如我固定使用SHA-1做hash, 則只要輸入的文字是'00000000', 輸出結果就一定是
      '70352f41061eda4ff3c322094af068ba70c3b38b'
      
      但近年來常有這樣的需求:
      "在使用固定的hash function的情況下(例如固定使用SHA-1),
      我們希望同樣的輸入文字可以搭配不同的密鑰, 來產生不同的輸出文字"
      因此發展出HMAC (keyed-Hash Message Authentication Code)
      的技術: 在給定Hash function和文字輸入的情況下, HMAC可以用不同的密鑰產生不同輸出.
      也就是說 雜湊值 = HMAC(key, hash function, original text)

      HMAC最大的功用就是在驗證核發單位, 我們會在後面的Quiz看到.

  * encode的相反是decode, decode就是逆推回原始文字的過程;
    encrypt的相反是decrypt (解密), decrypt就是還原加密文字的過程.
*/

/**
  ## 6-2 範例1: 簡單的encryption
  寫一個function, 可以將英文單字的每個字母按照英文字母順序表往後移k個順位,
  這個function的input有2個參數, 一個代表單字, 另一個代表順位k
  例如:
  輸入 單字'car' 和 順位k = 3, 輸出為 'fdu' (因為c -> f, a -> d, r -> u)
*/
// function encrypt(word, k) {
//   // Caesar Cipher
//   var res = []
//   for (var i = 0; i < word.length; i++) {
//     var n = word.charCodeAt(i) + (k % 26)
//     if ((n > 122) || (n > 90 && n < 97)) {
//       n -= 26
//     }
//     res.push(String.fromCharCode(n))
//   }
//   return res.join('')
// }
// console.log(encrypt('car', 3))

/**
  6-2 範例1 是一個古老的加密方法, 稱為凱薩密碼, 據說是古羅馬共和時期的凱薩所發明用來和軍隊溝通.
  這個加密方法需要知道順序k的值才能解密, 因此順序k可以看成是一個密鑰.

  凱薩密碼顯然很簡單也容易破解, 密鑰k的值是0 ~ 25, 很容易窮舉.
*/

/**
  ## 6-2 範例2
  寫一個function可以decrypt凱薩密碼
*/
// function decrypt(word, k) {
//   // Caesar Cipher decryption
//   var res = []
//   for (var i = 0; i < word.length; i++) {
//     var n = word.charCodeAt(i) - (k % 26)
//     if ((n > 122) || (n > 90 && n < 97)) {
//       n -= 26
//     }
//     res.push(String.fromCharCode(n))
//   }
//   return res.join('')
// }
// console.log(decrypt('fdu', 3))

/**
  ## 6-2 範例3: 簡單的hash function
  寫一個function, 可以將英文單字的每個字母轉成ASCII code相加後再除以100
  這個function的input只有1個參數, 代表單字.
*/
// function hash(word) {
//   var res = 0
//   for (var i = 0; i < word.length; i++) {
//     res += word.charCodeAt(i)
//   }
//   return res % 100
// }
// 
// console.log('jimmy =>', hash('jimmy'))
// console.log('car =>', hash('car'))
// console.log('arc =>', hash('arc'))
// console.log('home =>', hash('home'))
// console.log('rod =>', hash('rod'))

/**
  小結: 6-2 範例3 顯然是個缺點很多的hash function
  1. 因為是對100取餘數, 雜湊值只有 0 ~ 99 這100種可能.
  2. 只要相加完的數字末2位一樣, 就一定會collision.
*/

/**
  # 6-3 請使用經典的密碼學演算法
  好的encrypt演算法或hash function都是資訊學家/數學家殫精竭慮的成果,
  當你需要使用這類功能時, 請使用前面所述的經典演算法, 而不要使用自己寫的(例如6-2的範例1和3).
  在本節範例我們將練習使用經典的演算法.
*/

/**
  ## 6-3 範例1: Symmetry Encryption - AES演算法
*/
// console.log('===練習Symmetry Encryption: AES演算法===')
// var crypto = require('crypto')
// var key = 'qweasd'
// var text = 'car'
// var cipher = crypto.createCipher('aes-256-ctr', key) // key就是密鑰的角色
// var encrypted = cipher.update(text, 'utf8', 'hex') // 將'car'加密
// 
// var decipher = crypto.createDecipher('aes-256-ctr', key) // key就是密鑰的角色
// var decrypted = decipher.update(encrypted, 'hex', 'utf8') // 將encrypted解密回'car'
// 
// console.log('原始文字:', text)
// console.log('所使用密鑰: ', key)
// console.log('加密後:', encrypted)
// console.log('解密後:', decrypted)

/**
  ## 6-3 範例2: Asymmetry Encryption - RSA演算法
*/
// console.log('===練習Asymmetry Encryption: RSA演算法===')
// var crypto = require('crypto')
// var text = 'Hello World!'
// var keys = crypto.generateKeyPairSync('rsa', {
//   modulusLength: 4096,
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'pem', // 資料格式
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'pem', // 資料格式
//   }
// })
// 
// var encrypted = crypto.publicEncrypt(keys.publicKey, Buffer.from(text))
// var decrypted = crypto.privateDecrypt(keys.privateKey, encrypted)
// 
// console.log('\n原始文字:', text)
// console.log('\n所使用公鑰:')
// console.log(keys.publicKey)
// console.log('\n所使用私鑰:')
// console.log(keys.privateKey)
// console.log('\n加密後:')
// console.log(encrypted.toString('hex'))
// console.log('\n解密後:')
// console.log(decrypted.toString('utf8'))

/**
  ## 6-3 範例3: Asymmetry Encryption - RSA演算法, 幫私鑰上個鎖
*/
// console.log('===練習Asymmetry Encryption: RSA演算法 - 幫私鑰上個鎖(加密)===')
// console.log('當私鑰被加密, 就算私鑰外洩, 壞人也無法直接使用"被加密的私鑰"解出你的原始文字.')
// var crypto = require('crypto')
// var key = 'top secret'
// var text = 'Nice to meet you!'
// var keys = crypto.generateKeyPairSync('rsa', {
//   modulusLength: 4096,
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'pem', // 資料格式
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'pem', // 資料格式
//     cipher: 'aes-256-cbc', // 用來加密私鑰的演算法
//     passphrase: key, // 對應上面那行演算法所用的密鑰
//   }
// })
// 
// var privateKeyObj = {
//   key: keys.privateKey,
//   passphrase: key, // 解密privateKey要用的密鑰
// }
// 
// var encrypted = crypto.publicEncrypt(keys.publicKey, Buffer.from(text))
// var decrypted = crypto.privateDecrypt(privateKeyObj, encrypted)
// 
// console.log('\n原始文字:', text)
// console.log('\n所使用公鑰:')
// console.log(keys.publicKey)
// console.log('\n所使用私鑰(顯示的是私鑰被加密後的結果):')
// console.log(keys.privateKey)
// console.log('\n加密後:')
// console.log(encrypted.toString('hex'))
// console.log('\n解密後(私鑰會先用"top secret"這個密碼解密後, 然後才被丟進RSA演算法去解出原始文字):')
// console.log(decrypted.toString('utf8'))

/**
  ## 6-3 範例4: Hash Function: SHA系列
*/
// console.log('===練習Hash Function: SHA系列===')
// var crypto = require('crypto')
// var text = 'Jimmy'
// var sha1sum = crypto.createHash('sha1') // 使用SHA-1演算法
// var sha1res = sha1sum.update(text).digest('hex') // 對'boat'字串進行hash, 'hex'表示算出的雜湊值以16進位表示
// 
// var sha256sum = crypto.createHash('sha256') // 使用SHA-2家族的SHA-256演算法
// var sha256res = sha256sum.update(text).digest('hex')
// 
// console.log('原始文字:', text)
// console.log('使用SHA-1做hash:', sha1res)
// console.log('使用SHA-256做hash:', sha256res) 

/**
  ## 6-3 範例5: HMAC (keyed-Hash Message Authentication Code)
*/
// console.log('===練習HMAC===')
// var crypto = require('crypto')
// var key = 'a secret' // key就是密鑰
// var text = 'It is a good day.'
// var hmac = crypto.createHmac('sha256', key)
// var res = hmac.update(text).digest('hex')
// console.log('原始文字:', text)
// console.log('使用SHA-256 和 密鑰"' + key + '"進行hash:', res)

/**
  ## 6-3 Quiz 1
  Jimmy住的大樓叫做光速大樓, 大樓內有健身房.
  每個大樓住戶都要用大樓管理員發的通行證才能使用健身房.
  以Jimmy為例, Jimmy的通行證如下所示:
  ```
  姓名: Jimmy
  號碼: d8ae61c3073497de06409948e2082123b725db1f
  ```
  每次住戶要使用健身房, 就給管理員看通行證, 管理員將通行證上的姓名輸入電腦後
  電腦會先核對此姓名是否在住戶名單內, 若是, 則再用此姓名算出號碼,
  若算出的號碼和通行證上的號碼一樣, 則放行此住戶使用健身房.
  Jimmy有個朋友Mike以前也住過光速大樓,
  Mike根據自己以前拿過的通行證猜測, 核發號碼可能就是將住戶姓名用SHA-1做hash的結果;
  因為Mike住處沒有健身房, Mike就動了歪腦筋想偽造Jimmy的通行證來使用光速大樓的健身房

  於是Mike就將Jimmy的姓名進行SHA-1 hash後造了個通行證如下
  ```
  姓名: Jimmy
  號碼: d8ae61c3073497de06409948e2082123b725db1f
  ```
  沒想到真的被Mike猜中, 管理員的電腦的確是用住戶姓名的SHA-1 hash作為通行證的號碼.
  結果, Mike沒有繳大樓管理費卻可以快樂地使用光速大樓健身房, 相當不公平.
  
  關於這個案例, 請問我們要怎樣用HMAC來解決?
*/
/**
  6-3 Quiz 1 答: 整件問題的關鍵在於, Mike偽造的通行證, 不是管理員所核發的.
  管理員要想辦法驗證通行證的確是管理員本人核發的而不是別人偽造的.
  要達成這個目的, 管理員得用住戶姓名和一個只有管理員自己才知道的資訊(我們稱為特徵)
  來產生通行證號碼, 這個號碼無法被偽造(因為沒有人知道管理員的特徵),
  因此整個驗證流程應該要變成:
  每次住戶給管理員看通行證, 管理員就將通行證上的姓名 以及 只有管理員自己才知道的資訊(特徵) 輸入電腦,
  電腦會先核對此姓名是否在住戶名單內, 若是, 則再用 此姓名 + 管理員的特徵 算出號碼,
  若算出的號碼和通行證上的號碼一樣, 則放行此住戶使用健身房.
  別人想偽造管理員核發的通行證是不可能的, 因爲別人不知道管理員的特徵.
*/
// var crypto = require('crypto')
// var key = '光速大樓super good!' // 管理員的特徵(其實就是密鑰), 只有管理員自己知道.
// var text = 'Jimmy'
// var hmac = crypto.createHmac('sha1', key)
// var res = hmac.update(text).digest('hex')
// console.log('姓名:', text)
// console.log('號碼:', res)
/**
	號碼這個hash是由住戶姓名和管理員的特徵"光速大樓super good!"共同產生的;
	就算Mike知道住戶姓名Jimmy, 但只要他不知道管理員的特徵
	就無法偽造出特定住戶的通行證.
	另外, hash過的文字是無法逆推的, 所以原則上Mike無法逆推出管理員的特徵.
*/

/**
  # 6-4 我們應該選擇hash
  * 想好要如何解決6-1的問題了嗎?
    看來解決方向有2個,
    法1. 將密碼encrypt後再存入database
    法2. 將密碼hash後再存入database

    法1的問題, 解密的密鑰仍掌握在我們網站管理人員手中, 並無法防止有內鬼的問題; 另外若駭客攻進我們的資料庫
    server並找到密鑰, 則駭客最終可以解出密碼的原始明文.

    法2看起來有解到問題, 壞人就算拿到資料庫中那些hash過的密碼也沒用, 原因如下:
    假設會員(abc@g.com)的註冊時輸入的密碼是'12345678', 而'12345678'會先被hash成'abbacddc' (只是舉例)
    才存進會員table, 因此我們的會員table長得如下:
    --------------------
    account     passhash
    --------------------
    abc@g.com   abbacddc

    日後會員登入時, server驗證會員身份的流程如下:
    每次會員(假設是abc@g.com)登入時, server會將會員輸入的密碼hash過, 再看看得到的雜湊值是否等於'abbacddc',
    若是, 就登入成功.
    
    因此當壞人看到我們的會員table, 則
    1. 因為hash是單向不可逆, 壞人無法逆推原本的密碼
    2. 壞人企圖用'abbacddc'來登入是沒有用的,
       因為根據我們驗證登入的流程, 當他輸入'abbacddc', 'abbacddc'會先被server hash過, 然後才和會員table的紀錄比對,
       但'abbacddc'被hash後又會變成別的值(例如 'effedccd')而不會是自己('abbacddc'), 因此比對後會登入失敗.

    總結會員和壞人的登入的狀況如下:
    會員輸入'12345678' --> '12345678'被server hash成'abbacddc' --> 'abbacddc'和會員table中的'abbacddc'相符, 登入成功
    壞人輸入'abbacddc' --> 'abbacddc'被server hash成'effedccd' --> 'effedccd'和會員table中的'abbacddc'不相等, 登入失敗
*/

/**
  # 6-4 Quiz 1
  日常生活中, 很多網站都是採取會員制, 假設你忘記某個你有在用的網站的會員密碼, 你點了該網站的"忘記密碼"
  希望取得協助, 結果網站工作人員就寄了你原本的密碼(明碼)到你的信箱, 請問
  1. 這個網站這樣處理合理嗎?
  2. 你是否能猜測到他們是如何存客戶的密碼?
*/

/**
  # 6-5 Hash還不夠, 你得在傷口上灑鹽
  使用Hash幾乎解決了問題, 但還有一件事要考慮, 那就是使用者都是懶惰的, 很多使用者會設定過度簡單的密碼
  避免自己忘記.
  假設網站對會員密碼的要求是"至少8碼, 英文或數字或英數混雜都可以", 這時就會有一堆使用者設定
  '12345678', '00000000', 或 '99999999' 這類純數字的簡單密碼.

  針對這類"純數字"的簡單密碼, 壞人此時就有機可趁, 壞人可以事先做好一個常用密碼對照表, 裡面記錄了
  '00000000' ~ '99999999' 對應到的所有SHA-1 hash值如下:
  (假設壞人知道網站使用SHA-1做hash)
  ---------------------------------------------------
  常用密碼   SHA-1雜湊值
  ---------------------------------------------------
  00000000   70352f41061eda4ff3c322094af068ba70c3b38b
  00000001   1d102a8cf9879ceec3a7b26104b12e875c13d6a7
  00000002   a8eddff2ec7d016b82d3e187c86b100e11502aaa
  .
  .
  .
  99999998   a4b699f4c02fd5b7ae7cd2fa07d329581a736529
  99999999   d528fca3b163c05703e88b5285440bec28ecf185
  ---------------------------------------------------
  這種常用密碼對照表又稱為彩虹表(rainbow table), 要製作上面這個表, 壞人要計算10^8次SHA-1, 然後需使用
  大約4GB來儲存這個表, 以現在(2019)的硬體而言是非常容易的事.

  壞人一旦入侵到資料庫, 就可以從"SHA-1雜湊值"反查出使用者的原始密碼.
  所以, 為了增加壞人製作對照表的難度, 我們可以幫使用者的密碼隨機加個字串後再進行hash, 然後才存進資料庫
  (隨機字串也要存), 也就是說
  ```
  存進資料庫的passhash = hash(使用者密碼 + 隨機字串)
  ```
  
  如下所示(passhash的值並非真的SHA-1, 僅是示意圖)
  -------------------------------
  account     passhash   salt
  -------------------------------
  abc@g.com   effeabcd   ef3d47a6
  -------------------------------
  隨機加入的字串我們稱為salt(鹽)
  
  這樣壞人就無法用常用密碼對照表來反查出使用者的密碼.
  壞人若想反查, 只得做一個更大的表, 付出更多代價.

  總結一下有salt的流程:
  1. 註冊:
    假設客戶(abc@g.com)使用密碼12345678來註冊會員
    --> server隨機產生salt 'ef3d47a6', 並將此salt附加在'12345678'之後再進行hash,
        假設 hash('12345678' + 'ef3d47a6') = 'effeabcd'
    --> server將'effeabcd'和salt都存入會員table.

  2. 登入:
    會員(abc@g.com)使用密碼12345678來登入
    --> server從會員table取出此會員的salt ('ef3d47a6'), 並將這個salt附加在'12345678'之後再進行hash,
        假設 hash('12345678' + 'ef3d47a6') = 'effeabcd'
    --> server去比對剛剛產生的雜湊值'effeabcd'是否等於會員table中此會員的passhash值
    --> 若相等, 則登入成功.

*/

/**
  ## 6-5 範例1
  鹽也不是隨便產生的, 一般來說我們會用crypto.randomBytes來產生
*/
// var crypto = require('crypto')
// console.log(crypto.randomBytes(64).toString('hex'))
