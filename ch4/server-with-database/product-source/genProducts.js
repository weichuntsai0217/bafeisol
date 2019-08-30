var fs = require('fs')
var fileExt = ''
var products = [
  {
    img_src: 'food/food-01.jpg',
    title: '香脆雞腿堡',
    price: 100,
    id: 'FOOD01',
    description: '我是香脆雞腿堡，多汁美味又酥脆，大家都說讚！',
  },
  {
    img_src: 'food/food-02.jpg',
    title: '高纖大麥片',
    price: 200,
    id: 'FOOD02',
    description: '我是高纖大麥片，清爽健康顧腸道，大家都說讚！',
  },
  {
    img_src: 'food/food-03.jpg',
    title: '薑汁啤酒',
    price: 300,
    id: 'FOOD03',
    description: '我是薑汁啤酒，清涼有勁超爽快，大家都說讚！',
  },
  {
    img_src: 'food/food-04.jpg',
    title: '精緻雞腿便當',
    price: 400,
    id: 'FOOD04',
    description: '我是精緻雞腿便當，料多實在又新鮮，大家都說讚！',
  },
  {
    img_src: 'food/food-05.jpg',
    title: '格紋鬆餅',
    price: 500,
    id: 'FOOD05',
    description: '我是格紋鬆餅，香甜可口又酥脆，大家都說讚！',
  },
  {
    img_src: 'food/food-06.jpg',
    title: '檸檬水果茶',
    price: 600,
    id: 'FOOD06',
    description: '我是檸檬水果茶，讓你盡情享受下午時光，大家都說讚！',
  },
  {
    img_src: 'fashion/fashion-01.jpg',
    title: '蕾絲洋裝',
    price: 1000,
    id: 'FASH01',
    description: '我是蕾絲洋裝，優雅大方又好看，大家都說讚！',
  },
  {
    img_src: 'fashion/fashion-02.jpg',
    title: '高領毛衣',
    price: 2000,
    id: 'FASH02',
    description: '我是高領毛衣，保暖又百搭，大家都說讚！',
  },
  {
    img_src: 'fashion/fashion-03.jpg',
    title: '酷炫帽T',
    price: 3000,
    id: 'FASH03',
    description: '我是酷炫帽T，鮮豔又充滿活力，大家都說讚！',
  },
  {
    img_src: 'fashion/fashion-04.jpg',
    title: '皮衣外套',
    price: 4000,
    id: 'FASH04',
    description: '我是皮衣外套，充滿硬派騎士作風，大家都說讚！',
  },
  {
    img_src: 'fashion/fashion-05.jpg',
    title: '休閒襯衫',
    price: 5000,
    id: 'FASH05',
    description: '我是休閒襯衫，俐落隨性又帥氣，大家都說讚！',
  },
  {
    img_src: 'fashion/fashion-06.jpg',
    title: '休閒西裝',
    price: 6000,
    id: 'FASH06',
    description: '我是休閒西裝，經典大方又時尚，大家都說讚！',
  },
]

var product_details = [ // Just want to match SQL's naming rule.
  {
    id: 'FOOD01',
    original_price: 200,
    company: '光速好食有限公司',
    source: '台灣',
    other: '{"製造日期":"2019-07-01","賞味期限":"2020-07-01","容量":"97.3g","成份":"雞腿肉, 蘿美生菜, 糖, 麥芽糊精, 鹽, 辣椒粉, 磷酸二澱粉,棕櫚油, 紅蘿蔔, 檸檬酸鐵, 調味劑(磷酸二鈉,檸檬酸,琥珀酸二鈉),天然香辛料(芥末、薑黃), 維生素E, 維生素A, 維生素B2"}',
  },
  {
    id: 'FOOD02',
    original_price: 200,
    company: '光速好食有限公司',
    source: '台灣',
    other: '{"製造日期":"2019-07-02","賞味期限":"2020-07-02","容量":"98.3g","成份":"大麥片, 糖粉"}',
  },
  {
    id: 'FOOD03',
    original_price: 300,
    company: '光速好食有限公司',
    source: '台灣',
    other: '{"製造日期":"2019-07-03","賞味期限":"2020-07-03","容量":"99.3g","成份":"小麥, 酵母"}',
  },
  {
    id: 'FOOD04',
    original_price: 400,
    company: '光速好食有限公司',
    source: '台灣',
    other: '{"製造日期":"2019-07-04","賞味期限":"2020-07-04","容量":"100.3g","成份":"米, 雞腿肉"}',
  },
  {
    id: 'FOOD05',
    original_price: 500,
    company: '光速好食有限公司',
    source: '台灣',
    other: '{"製造日期":"2019-07-05","賞味期限":"2020-07-05","容量":"101.3g","成份":"麵粉, 雞蛋"}',
  },
  {
    id: 'FOOD06',
    original_price: 600,
    company: '光速好食有限公司',
    source: '台灣',
    other: '{"製造日期":"2019-07-06","賞味期限":"2020-07-06","容量":"102.3g","成份":"檸檬, 茶葉"}',
  },
  {
    id: 'FASH01',
    original_price: 1000,
    company: '光速服飾有限公司',
    source: '美國',
    other: '{"尺寸":"S","顏色":"紫色"}',
  },
  {
    id: 'FASH02',
    original_price: 2000,
    company: '光速服飾有限公司',
    source: '美國',
    other: '{"尺寸":"M","顏色":"淺灰"}',
  },
  {
    id: 'FASH03',
    original_price: 3000,
    company: '光速服飾有限公司',
    source: '美國',
    other: '{"尺寸":"黃色","顏色":"S"}',
  },
  {
    id: 'FASH04',
    original_price: 4000,
    company: '光速服飾有限公司',
    source: '美國',
    other: '{"尺寸":"L","顏色":"咖啡色"}',
  },
  {
    id: 'FASH05',
    original_price: 5000,
    company: '光速服飾有限公司',
    source: '美國',
    other: '{"尺寸":"M","顏色":"灰色"}',
  },
  {
    id: 'FASH06',
    original_price: 6000,
    company: '光速服飾有限公司',
    source: '美國',
    other: '{"尺寸":"M","顏色":"灰和藍"}',
  },
]

if (process.argv.length < 3) {
  console.log('Please provide file extension in the 1st argument.')
  console.log('Allowed file extentions are "csv" or "json".')
} else {
  fileExt = process.argv[2]
  if (['csv', 'json'].indexOf(fileExt) === -1) {
    console.log('The file extention "', fileExt, '" you provide is not allowed.')
    console.log('Allowed file extentions are "csv" or "json".')
  } else {
    if (fileExt === 'csv') {
      function getCsvStr(items) {
        var res = ''
        var row = items[0]
        var tmp = []
        for (key in row) {
          tmp.push(key)
        }
        res += tmp.join(',') + '\n'

        items.forEach(function (item) {
          tmp = []
          for (key in item) {
            var col = typeof item[key] === 'string'
              ? '\'' + item[key] + '\'' // 避免字串出現不預期的 "'" 或 ','
              : item[key]
            tmp.push(col)
          }
          res += tmp.join(',') + '\n'
        })
        return res
      }
      
      fs.writeFileSync('products.' + fileExt, getCsvStr(products))
      fs.writeFileSync('product_details.' + fileExt, getCsvStr(product_details))
    } else {
      fs.writeFileSync('products.' + fileExt, JSON.stringify(products, null, 2))
      fs.writeFileSync('product_details.' + fileExt, JSON.stringify(product_details, null, 2))
    }
  }
}
