'use strict';


// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  app = express().use(bodyParser.json()); // creates express http server

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

var reg_code = [
   null,
   {
      "name":"台北市",
      "reg":[
         {
            "name":"中山區",
            "id":"3"
         },
         {
            "name":"大安區",
            "id":"5"
         },
         {
            "name":"信義區",
            "id":"7"
         },
         {
            "name":"士林區",
            "id":"8"
         },
         {
            "name":"內湖區",
            "id":"10"
         },
         {
            "name":"北投區",
            "id":"9"
         },
         {
            "name":"中正區",
            "id":"1"
         },
         {
            "name":"松山區",
            "id":"4"
         },
         {
            "name":"大同區",
            "id":"2"
         },
         {
            "name":"南港區",
            "id":"11"
         },
         {
            "name":"萬華區",
            "id":"6"
         },
         {
            "name":"文山區",
            "id":"12"
         }
      ]
   },
   {
      "name":"基隆市",
      "reg":[
         {
            "name":"中正區",
            "id":"15"
         },
         {
            "name":"仁愛區",
            "id":"13"
         },
         {
            "name":"安樂區",
            "id":"17"
         },
         {
            "name":"信義區",
            "id":"14"
         },
         {
            "name":"中山區",
            "id":"16"
         },
         {
            "name":"七堵區",
            "id":"19"
         },
         {
            "name":"暖暖區",
            "id":"18"
         }
      ]
   },
   {
      "name":"新北市",
      "reg":[
         {
            "name":"板橋區",
            "id":"26"
         },
         {
            "name":"淡水區",
            "id":"50"
         },
         {
            "name":"新莊區",
            "id":"44"
         },
         {
            "name":"三重區",
            "id":"43"
         },
         {
            "name":"中和區",
            "id":"38"
         },
         {
            "name":"永和區",
            "id":"37"
         },
         {
            "name":"新店區",
            "id":"34"
         },
         {
            "name":"汐止區",
            "id":"27"
         },
         {
            "name":"三峽區",
            "id":"40"
         },
         {
            "name":"蘆洲區",
            "id":"47"
         },
         {
            "name":"土城區",
            "id":"39"
         },
         {
            "name":"林口區",
            "id":"46"
         },
         {
            "name":"五股區",
            "id":"48"
         },
         {
            "name":"樹林區",
            "id":"41"
         },
         {
            "name":"鶯歌區",
            "id":"42"
         },
         {
            "name":"泰山區",
            "id":"45"
         },
         {
            "name":"八里區",
            "id":"49"
         },
         {
            "name":"深坑區",
            "id":"28"
         },
         {
            "name":"三芝區",
            "id":"51"
         },
         {
            "name":"瑞芳區",
            "id":"30"
         },
         {
            "name":"萬里區",
            "id":"20"
         },
         {
            "name":"金山區",
            "id":"21"
         },
         {
            "name":"貢寮區",
            "id":"33"
         },
         {
            "name":"石碇區",
            "id":"29"
         },
         {
            "name":"坪林區",
            "id":"35"
         },
         {
            "name":"石門區",
            "id":"52"
         },
         {
            "name":"平溪區",
            "id":"31"
         },
         {
            "name":"雙溪區",
            "id":"32"
         },
         {
            "name":"烏來區",
            "id":"36"
         }
      ]
   },
   {
      "name":"新竹市",
      "reg":[
         {
            "name":"東區",
            "id":"371"
         },
         {
            "name":"北區",
            "id":"372"
         },
         {
            "name":"香山區",
            "id":"370"
         }
      ]
   },
   {
      "name":"新竹縣",
      "reg":[
         {
            "name":"竹北市",
            "id":"54"
         },
         {
            "name":"湖口鄉",
            "id":"55"
         },
         {
            "name":"竹東鎮",
            "id":"61"
         },
         {
            "name":"新豐鄉",
            "id":"56"
         },
         {
            "name":"寶山鄉",
            "id":"60"
         },
         {
            "name":"芎林鄉",
            "id":"59"
         },
         {
            "name":"新埔鎮",
            "id":"57"
         },
         {
            "name":"關西鎮",
            "id":"58"
         },
         {
            "name":"橫山鄉",
            "id":"63"
         },
         {
            "name":"峨嵋鄉",
            "id":"66"
         },
         {
            "name":"五峰鄉",
            "id":"62"
         },
         {
            "name":"尖石鄉",
            "id":"64"
         },
         {
            "name":"北埔鄉",
            "id":"65"
         }
      ]
   },
   {
      "name":"桃園市",
      "reg":[
         {
            "name":"中壢區",
            "id":"67"
         },
         {
            "name":"桃園區",
            "id":"73"
         },
         {
            "name":"平鎮區",
            "id":"68"
         },
         {
            "name":"蘆竹區",
            "id":"79"
         },
         {
            "name":"龜山區",
            "id":"74"
         },
         {
            "name":"八德區",
            "id":"75"
         },
         {
            "name":"楊梅區",
            "id":"70"
         },
         {
            "name":"大園區",
            "id":"78"
         },
         {
            "name":"龍潭區",
            "id":"69"
         },
         {
            "name":"觀音區",
            "id":"72"
         },
         {
            "name":"大溪區",
            "id":"76"
         },
         {
            "name":"新屋區",
            "id":"71"
         },
         {
            "name":"復興區",
            "id":"77"
         }
      ]
   },
   {
      "name":"苗栗縣",
      "reg":[
         {
            "name":"竹南鎮",
            "id":"80"
         },
         {
            "name":"頭份市",
            "id":"81"
         },
         {
            "name":"苗栗市",
            "id":"88"
         },
         {
            "name":"苑裡鎮",
            "id":"87"
         },
         {
            "name":"銅鑼鄉",
            "id":"94"
         },
         {
            "name":"後龍鎮",
            "id":"85"
         },
         {
            "name":"造橋鄉",
            "id":"89"
         },
         {
            "name":"三義鄉",
            "id":"95"
         },
         {
            "name":"通霄鎮",
            "id":"86"
         },
         {
            "name":"南庄鄉",
            "id":"83"
         },
         {
            "name":"大湖鄉",
            "id":"92"
         },
         {
            "name":"三灣鄉",
            "id":"82"
         },
         {
            "name":"獅潭鄉",
            "id":"84"
         },
         {
            "name":"公館鄉",
            "id":"91"
         },
         {
            "name":"頭屋鄉",
            "id":"90"
         },
         {
            "name":"泰安鄉",
            "id":"93"
         },
         {
            "name":"西湖鄉",
            "id":"96"
         },
         {
            "name":"卓蘭鎮",
            "id":"97"
         }
      ]
   },
   {
      "name":"台中市",
      "reg":[
         {
            "name":"西屯區",
            "id":"104"
         },
         {
            "name":"北區",
            "id":"102"
         },
         {
            "name":"北屯區",
            "id":"103"
         },
         {
            "name":"西區",
            "id":"101"
         },
         {
            "name":"南區",
            "id":"100"
         },
         {
            "name":"南屯區",
            "id":"105"
         },
         {
            "name":"中區",
            "id":"98"
         },
         {
            "name":"東區",
            "id":"99"
         },
         {
            "name":"大里區",
            "id":"107"
         },
         {
            "name":"龍井區",
            "id":"121"
         },
         {
            "name":"太平區",
            "id":"106"
         },
         {
            "name":"沙鹿區",
            "id":"120"
         },
         {
            "name":"潭子區",
            "id":"116"
         },
         {
            "name":"豐原區",
            "id":"110"
         },
         {
            "name":"大雅區",
            "id":"117"
         },
         {
            "name":"霧峰區",
            "id":"108"
         },
         {
            "name":"烏日區",
            "id":"109"
         },
         {
            "name":"大甲區",
            "id":"124"
         },
         {
            "name":"梧棲區",
            "id":"122"
         },
         {
            "name":"后里區",
            "id":"111"
         },
         {
            "name":"清水區",
            "id":"123"
         },
         {
            "name":"大肚區",
            "id":"119"
         },
         {
            "name":"神岡區",
            "id":"118"
         },
         {
            "name":"外埔區",
            "id":"125"
         },
         {
            "name":"東勢區",
            "id":"113"
         },
         {
            "name":"新社區",
            "id":"115"
         },
         {
            "name":"石岡區",
            "id":"112"
         },
         {
            "name":"和平區",
            "id":"114"
         },
         {
            "name":"大安區",
            "id":"126"
         }
      ]
   },
   null,
   {
      "name":"彰化縣",
      "reg":[
         {
            "name":"彰化市",
            "id":"127"
         },
         {
            "name":"員林市",
            "id":"136"
         },
         {
            "name":"鹿港鎮",
            "id":"131"
         },
         {
            "name":"和美鎮",
            "id":"134"
         },
         {
            "name":"大村鄉",
            "id":"141"
         },
         {
            "name":"伸港鄉",
            "id":"135"
         },
         {
            "name":"北斗鎮",
            "id":"144"
         },
         {
            "name":"二林鎮",
            "id":"149"
         },
         {
            "name":"溪湖鎮",
            "id":"140"
         },
         {
            "name":"溪州鄉",
            "id":"147"
         },
         {
            "name":"秀水鄉",
            "id":"130"
         },
         {
            "name":"田中鎮",
            "id":"143"
         },
         {
            "name":"花壇鄉",
            "id":"129"
         },
         {
            "name":"線西鄉",
            "id":"133"
         },
         {
            "name":"埤頭鄉",
            "id":"146"
         },
         {
            "name":"福興鄉",
            "id":"132"
         },
         {
            "name":"芳苑鄉",
            "id":"151"
         },
         {
            "name":"社頭鄉",
            "id":"137"
         },
         {
            "name":"永靖鄉",
            "id":"138"
         },
         {
            "name":"埔心鄉",
            "id":"139"
         },
         {
            "name":"芬園鄉",
            "id":"128"
         },
         {
            "name":"埔鹽鄉",
            "id":"142"
         },
         {
            "name":"田尾鄉",
            "id":"145"
         },
         {
            "name":"竹塘鄉",
            "id":"148"
         },
         {
            "name":"大城鄉",
            "id":"150"
         },
         {
            "name":"二水鄉",
            "id":"152"
         }
      ]
   },
   {
      "name":"南投縣",
      "reg":[
         {
            "name":"南投市",
            "id":"153"
         },
         {
            "name":"草屯鎮",
            "id":"155"
         },
         {
            "name":"埔里鎮",
            "id":"157"
         },
         {
            "name":"名間鄉",
            "id":"159"
         },
         {
            "name":"竹山鎮",
            "id":"164"
         },
         {
            "name":"國姓鄉",
            "id":"156"
         },
         {
            "name":"魚池鄉",
            "id":"162"
         },
         {
            "name":"中寮鄉",
            "id":"154"
         },
         {
            "name":"仁愛鄉",
            "id":"158"
         },
         {
            "name":"集集鎮",
            "id":"160"
         },
         {
            "name":"水里鄉",
            "id":"161"
         },
         {
            "name":"信義鄉",
            "id":"163"
         },
         {
            "name":"鹿谷鄉",
            "id":"165"
         }
      ]
   },
   {
      "name":"嘉義市",
      "reg":[
         {
            "name":"西區",
            "id":"373"
         },
         {
            "name":"東區",
            "id":"374"
         }
      ]
   },
   {
      "name":"嘉義縣",
      "reg":[
         {
            "name":"民雄鄉",
            "id":"180"
         },
         {
            "name":"太保市",
            "id":"175"
         },
         {
            "name":"朴子市",
            "id":"176"
         },
         {
            "name":"大林鎮",
            "id":"181"
         },
         {
            "name":"中埔鄉",
            "id":"171"
         },
         {
            "name":"新港鄉",
            "id":"179"
         },
         {
            "name":"竹崎鄉",
            "id":"169"
         },
         {
            "name":"番路鄉",
            "id":"167"
         },
         {
            "name":"水上鄉",
            "id":"173"
         },
         {
            "name":"六腳鄉",
            "id":"178"
         },
         {
            "name":"梅山鄉",
            "id":"168"
         },
         {
            "name":"阿里山鄉",
            "id":"170"
         },
         {
            "name":"大埔鄉",
            "id":"172"
         },
         {
            "name":"鹿草鄉",
            "id":"174"
         },
         {
            "name":"東石鄉",
            "id":"177"
         },
         {
            "name":"溪口鄉",
            "id":"182"
         },
         {
            "name":"義竹鄉",
            "id":"183"
         },
         {
            "name":"布袋鎮",
            "id":"184"
         }
      ]
   },
   {
      "name":"雲林縣",
      "reg":[
         {
            "name":"斗六市",
            "id":"194"
         },
         {
            "name":"虎尾鎮",
            "id":"187"
         },
         {
            "name":"北港鎮",
            "id":"200"
         },
         {
            "name":"斗南鎮",
            "id":"185"
         },
         {
            "name":"土庫鎮",
            "id":"188"
         },
         {
            "name":"西螺鎮",
            "id":"198"
         },
         {
            "name":"崙背鄉",
            "id":"192"
         },
         {
            "name":"麥寮鄉",
            "id":"193"
         },
         {
            "name":"林內鄉",
            "id":"195"
         },
         {
            "name":"元長鄉",
            "id":"204"
         },
         {
            "name":"東勢鄉",
            "id":"190"
         },
         {
            "name":"古坑鄉",
            "id":"196"
         },
         {
            "name":"大埤鄉",
            "id":"186"
         },
         {
            "name":"褒忠鄉",
            "id":"189"
         },
         {
            "name":"臺西鄉",
            "id":"191"
         },
         {
            "name":"莿桐鄉",
            "id":"197"
         },
         {
            "name":"二崙鄉",
            "id":"199"
         },
         {
            "name":"水林鄉",
            "id":"201"
         },
         {
            "name":"口湖鄉",
            "id":"202"
         },
         {
            "name":"四湖鄉",
            "id":"203"
         }
      ]
   },
   {
      "name":"台南市",
      "reg":[
         {
            "name":"永康區",
            "id":"212"
         },
         {
            "name":"東區",
            "id":"206"
         },
         {
            "name":"北區",
            "id":"209"
         },
         {
            "name":"新市區",
            "id":"241"
         },
         {
            "name":"善化區",
            "id":"238"
         },
         {
            "name":"安平區",
            "id":"210"
         },
         {
            "name":"中西區",
            "id":"208"
         },
         {
            "name":"仁德區",
            "id":"219"
         },
         {
            "name":"南區",
            "id":"207"
         },
         {
            "name":"安南區",
            "id":"211"
         },
         {
            "name":"新營區",
            "id":"230"
         },
         {
            "name":"安定區",
            "id":"242"
         },
         {
            "name":"新化區",
            "id":"214"
         },
         {
            "name":"歸仁區",
            "id":"213"
         },
         {
            "name":"麻豆區",
            "id":"223"
         },
         {
            "name":"柳營區",
            "id":"236"
         },
         {
            "name":"佳里區",
            "id":"224"
         },
         {
            "name":"鹽水區",
            "id":"237"
         },
         {
            "name":"官田區",
            "id":"222"
         },
         {
            "name":"玉井區",
            "id":"216"
         },
         {
            "name":"六甲區",
            "id":"234"
         },
         {
            "name":"東山區",
            "id":"233"
         },
         {
            "name":"後壁區",
            "id":"231"
         },
         {
            "name":"白河區",
            "id":"232"
         },
         {
            "name":"七股區",
            "id":"226"
         },
         {
            "name":"山上區",
            "id":"240"
         },
         {
            "name":"學甲區",
            "id":"228"
         },
         {
            "name":"下營區",
            "id":"235"
         },
         {
            "name":"關廟區",
            "id":"220"
         },
         {
            "name":"西港區",
            "id":"225"
         },
         {
            "name":"左鎮區",
            "id":"215"
         },
         {
            "name":"楠西區",
            "id":"217"
         },
         {
            "name":"南化區",
            "id":"218"
         },
         {
            "name":"龍崎區",
            "id":"221"
         },
         {
            "name":"將軍區",
            "id":"227"
         },
         {
            "name":"北門區",
            "id":"229"
         },
         {
            "name":"大內區",
            "id":"239"
         }
      ]
   },
   null,
   {
      "name":"高雄市",
      "reg":[
         {
            "name":"三民區",
            "id":"250"
         },
         {
            "name":"苓雅區",
            "id":"245"
         },
         {
            "name":"左營區",
            "id":"253"
         },
         {
            "name":"楠梓區",
            "id":"251"
         },
         {
            "name":"鼓山區",
            "id":"247"
         },
         {
            "name":"鳳山區",
            "id":"268"
         },
         {
            "name":"前鎮區",
            "id":"249"
         },
         {
            "name":"新興區",
            "id":"243"
         },
         {
            "name":"小港區",
            "id":"252"
         },
         {
            "name":"前金區",
            "id":"244"
         },
         {
            "name":"鹽埕區",
            "id":"246"
         },
         {
            "name":"大寮區",
            "id":"269"
         },
         {
            "name":"大社區",
            "id":"255"
         },
         {
            "name":"岡山區",
            "id":"258"
         },
         {
            "name":"仁武區",
            "id":"254"
         },
         {
            "name":"鳥松區",
            "id":"271"
         },
         {
            "name":"湖內區",
            "id":"267"
         },
         {
            "name":"路竹區",
            "id":"259"
         },
         {
            "name":"林園區",
            "id":"270"
         },
         {
            "name":"橋頭區",
            "id":"263"
         },
         {
            "name":"燕巢區",
            "id":"262"
         },
         {
            "name":"大樹區",
            "id":"272"
         },
         {
            "name":"旗山區",
            "id":"273"
         },
         {
            "name":"梓官區",
            "id":"264"
         },
         {
            "name":"茄萣區",
            "id":"282"
         },
         {
            "name":"旗津區",
            "id":"248"
         },
         {
            "name":"美濃區",
            "id":"274"
         },
         {
            "name":"永安區",
            "id":"266"
         },
         {
            "name":"六龜區",
            "id":"275"
         },
         {
            "name":"杉林區",
            "id":"277"
         },
         {
            "name":"阿蓮區",
            "id":"260"
         },
         {
            "name":"田寮區",
            "id":"261"
         },
         {
            "name":"彌陀區",
            "id":"265"
         },
         {
            "name":"內門區",
            "id":"276"
         },
         {
            "name":"甲仙區",
            "id":"278"
         },
         {
            "name":"桃源區",
            "id":"279"
         },
         {
            "name":"那瑪夏區",
            "id":"280"
         },
         {
            "name":"茂林區",
            "id":"281"
         }
      ]
   },
   null,
   {
      "name":"屏東縣",
      "reg":[
         {
            "name":"屏東市",
            "id":"295"
         },
         {
            "name":"內埔鄉",
            "id":"306"
         },
         {
            "name":"潮州鎮",
            "id":"308"
         },
         {
            "name":"恆春鎮",
            "id":"326"
         },
         {
            "name":"東港鎮",
            "id":"316"
         },
         {
            "name":"鹽埔鄉",
            "id":"302"
         },
         {
            "name":"長治鄉",
            "id":"303"
         },
         {
            "name":"麟洛鄉",
            "id":"304"
         },
         {
            "name":"車城鄉",
            "id":"324"
         },
         {
            "name":"里港鄉",
            "id":"300"
         },
         {
            "name":"萬丹鄉",
            "id":"307"
         },
         {
            "name":"九如鄉",
            "id":"299"
         },
         {
            "name":"枋寮鄉",
            "id":"320"
         },
         {
            "name":"枋山鄉",
            "id":"321"
         },
         {
            "name":"崁頂鄉",
            "id":"312"
         },
         {
            "name":"霧臺鄉",
            "id":"297"
         },
         {
            "name":"新埤鄉",
            "id":"313"
         },
         {
            "name":"林邊鄉",
            "id":"315"
         },
         {
            "name":"南州鄉",
            "id":"314"
         },
         {
            "name":"新園鄉",
            "id":"319"
         },
         {
            "name":"三地門鄉",
            "id":"296"
         },
         {
            "name":"瑪家鄉",
            "id":"298"
         },
         {
            "name":"高樹鄉",
            "id":"301"
         },
         {
            "name":"竹田鄉",
            "id":"305"
         },
         {
            "name":"泰武鄉",
            "id":"309"
         },
         {
            "name":"來義鄉",
            "id":"310"
         },
         {
            "name":"萬巒鄉",
            "id":"311"
         },
         {
            "name":"琉球鄉",
            "id":"317"
         },
         {
            "name":"佳冬鄉",
            "id":"318"
         },
         {
            "name":"春日鄉",
            "id":"322"
         },
         {
            "name":"獅子鄉",
            "id":"323"
         },
         {
            "name":"牡丹鄉",
            "id":"325"
         },
         {
            "name":"滿州鄉",
            "id":"327"
         }
      ]
   },
   null,
   {
      "name":"宜蘭縣",
      "reg":[
         {
            "name":"宜蘭市",
            "id":"328"
         },
         {
            "name":"礁溪鄉",
            "id":"330"
         },
         {
            "name":"羅東鎮",
            "id":"333"
         },
         {
            "name":"蘇澳鎮",
            "id":"338"
         },
         {
            "name":"頭城鎮",
            "id":"329"
         },
         {
            "name":"五結鄉",
            "id":"336"
         },
         {
            "name":"冬山鄉",
            "id":"337"
         },
         {
            "name":"三星鄉",
            "id":"334"
         },
         {
            "name":"壯圍鄉",
            "id":"331"
         },
         {
            "name":"員山鄉",
            "id":"332"
         },
         {
            "name":"大同鄉",
            "id":"335"
         },
         {
            "name":"南澳鄉",
            "id":"339"
         }
      ]
   },
   {
      "name":"台東縣",
      "reg":[
         {
            "name":"台東市",
            "id":"341"
         },
         {
            "name":"卑南鄉",
            "id":"345"
         },
         {
            "name":"關山鎮",
            "id":"347"
         },
         {
            "name":"太麻里鄉",
            "id":"353"
         },
         {
            "name":"綠島鄉",
            "id":"342"
         },
         {
            "name":"蘭嶼鄉",
            "id":"343"
         },
         {
            "name":"延平鄉",
            "id":"344"
         },
         {
            "name":"鹿野鄉",
            "id":"346"
         },
         {
            "name":"海端鄉",
            "id":"348"
         },
         {
            "name":"池上鄉",
            "id":"349"
         },
         {
            "name":"東河鄉",
            "id":"350"
         },
         {
            "name":"成功鎮",
            "id":"351"
         },
         {
            "name":"長濱鄉",
            "id":"352"
         },
         {
            "name":"金峰鄉",
            "id":"354"
         },
         {
            "name":"大武鄉",
            "id":"355"
         },
         {
            "name":"達仁鄉",
            "id":"356"
         }
      ]
   },
   {
      "name":"花蓮縣",
      "reg":[
         {
            "name":"花蓮市",
            "id":"357"
         },
         {
            "name":"吉安鄉",
            "id":"360"
         },
         {
            "name":"新城鄉",
            "id":"358"
         },
         {
            "name":"壽豐鄉",
            "id":"361"
         },
         {
            "name":"玉里鎮",
            "id":"367"
         },
         {
            "name":"鳳林鎮",
            "id":"362"
         },
         {
            "name":"光復鄉",
            "id":"363"
         },
         {
            "name":"秀林鄉",
            "id":"359"
         },
         {
            "name":"豐濱鄉",
            "id":"364"
         },
         {
            "name":"瑞穗鄉",
            "id":"365"
         },
         {
            "name":"萬榮鄉",
            "id":"366"
         },
         {
            "name":"卓溪鄉",
            "id":"368"
         },
         {
            "name":"富里鄉",
            "id":"369"
         }
      ]
   },
   {
      "name":"澎湖縣",
      "reg":[
         {
            "name":"馬公市",
            "id":"283"
         },
         {
            "name":"西嶼鄉",
            "id":"284"
         },
         {
            "name":"望安鄉",
            "id":"285"
         },
         {
            "name":"七美鄉",
            "id":"286"
         },
         {
            "name":"白沙鄉",
            "id":"287"
         },
         {
            "name":"湖西鄉",
            "id":"288"
         }
      ]
   },
   {
      "name":"金門縣",
      "reg":[
         {
            "name":"金寧鄉",
            "id":"291"
         },
         {
            "name":"金湖鎮",
            "id":"290"
         },
         {
            "name":"金城鎮",
            "id":"292"
         },
         {
            "name":"金沙鎮",
            "id":"289"
         },
         {
            "name":"烈嶼鄉",
            "id":"293"
         },
         {
            "name":"烏坵鄉",
            "id":"294"
         }
      ]
   },
   {
      "name":"連江縣",
      "reg":[
         {
            "name":"南竿鄉",
            "id":"22"
         },
         {
            "name":"北竿鄉",
            "id":"23"
         },
         {
            "name":"莒光鄉",
            "id":"24"
         },
         {
            "name":"東引鄉",
            "id":"25"
         },
         {
            "name":"東沙",
            "id":"256"
         },
         {
            "name":"南沙",
            "id":"257"
         }
      ]
   }
];

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhookEvent = entry.messaging[0];
      console.log(webhookEvent);
      let sender_psid = webhookEvent.sender.id;
      console.log('Sender PSID: ' + sender_psid);
      if (webhookEvent.message) {
        handleMessage(sender_psid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostback(sender_psid, webhookEvent.postback);
      }

    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

app.get('/setup',function(req,res){
    setupGetStartedButton(res);
});

app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "rrrr1234";

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

function setupGetStartedButton(res){
        console.log('setup');
        var messageData = {
                "get_started":{
                    "payload":"STARTED"
                },
                "greeting":[{
                    "locale":"default",
                    "text":"哈囉 {{user_full_name}}!"
                  }, {
                    "locale":"en_US",
                    "text":"Timeless apparel for the masses."
                  }
                ],
                "persistent_menu":[
                  {
                    "locale":"default",
                    "composer_input_disabled": false,
                    "call_to_actions":[
                      {
                        "title":"租屋查詢",
                        "type":"nested",
                        "call_to_actions":[
                          {
                            "title":"使用城市搜尋",
                            "type":"postback",
                            "payload":"CITY_SEARCH_PAYLOAD"
                          },
                          {
                            "title":"使用鄉鎮市區搜尋",
                            "type":"postback",
                            "payload":"REGION_SEARCH_PAYLOAD"
                          },
                          {
                            "title":"使用學區搜尋",
                            "type":"postback",
                            "payload":"SCHOOL_SEARCH_PAYLOAD"
                          }
                        ]
                      },
                      {
                        "type":"web_url",
                        "title":"關於",
                        "url":"http://petershats.parseapp.com/hat-news",
                        "webview_height_ratio":"full"
                      }
                    ]
                  }
                ]

        };

        // Start the request
        request({
            url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            form: messageData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                res.send(body);

            } else {
                // TODO: Handle errors
                res.send(body);
            }
        });
}

// Handles messages events
function handleMessage(sender_psid, received_message) {
  whileWait(sender_psid);
  let response;

 // Check if the message contains text
/* if (received_message.text) {

   // Create the payload for a basic text message
   response = {
     "text": `You sent the message: "${received_message.text}". Now send me an image!`
   }
 } */

 // Get the URL of the message attachment
   //let attachment_url = received_message.attachments[0].payload.url;
   console.log(received_message);
   if(received_message.text=="搜尋房屋(分區)"){

     response = { "text": "REG!" }
   }else if(received_message.text=="搜尋房屋(縣市)"){
     response = { "text": "CITY!" }
   }else if(received_message.text=="搜尋房屋(學校)"){
     response = { "text": "SCHOOL!" }
   }else if(received_message.attachments!=null){
     response = { "text": "SCHOOL!" }
   }else{
     response = {
         "text":"請選擇服務：",
         "quick_replies":[
           {
             "content_type":"text",
             "title":"搜尋房屋(分區)",
             "payload":"REG"
           },{
             "content_type":"text",
             "title":"搜尋房屋(縣市)",
             "payload":"CITY"
           },{
             "content_type":"text",
             "title":"搜尋房屋(學校)",
             "payload":"SCHOOL"
           },
        ]
     }
   }



/*   response = {
      "attachment": {
        "type": "template",
        "payload": {
        "template_type": "list",
        "top_element_style": "large",
        "elements": [
          {
            "title": "優質綠建築近捷運水岸公園第一排",
            "image_url": "https://hp2.591.com.tw/house/active/2017/11/17/151089679252580809_210x158.crop.jpg",
            "subtitle": "台北租屋,文山租屋,整層住家出租,優質綠建築近捷運水岸公園第一排",
            "default_action": {
              "type": "web_url",
              "url": "https://rent.591.com.tw/rent-detail-5860317.html"

            },
            "buttons": [
              {
                "title": "更多...",
                "type": "web_url",
                "url": "https://rent.591.com.tw/rent-detail-5860317.html"
              }
            ]
          },
          {
            "title": "萬利街近萬芳捷運7分鍾",
            "image_url": "https://www.591.com.tw/images/index/house/newVersion/noImgBigNew.png",
            "subtitle": "台北租屋,文山租屋,整層住家出租,萬利街近萬芳捷運7分鍾",
            "default_action": {
              "type": "web_url",
              "url": "https://rent.591.com.tw/rent-detail-5899050.html"
            },
            "buttons": [
              {
                "title": "更多...",
                "type": "web_url",
                "url": "https://rent.591.com.tw/rent-detail-5899050.html"
              }
            ]
          },
          {
            "title": "温馨時尚大套房",
            "image_url": "https://hp1.591.com.tw/house/active/2017/12/01/151210066602924201_210x158.crop.jpg",
            "subtitle": "台北租屋,文山租屋,獨立套房出租,温馨時尚大套房",
            "default_action": {
              "type": "web_url",
              "url": "https://rent.591.com.tw/rent-detail-5847118.html"
            },
            "buttons": [
              {
                "title": "更多...",
                "type": "web_url",
                "url": "https://rent.591.com.tw/rent-detail-5847118.html"
              }
            ]
          },
          {
            "title": "温馨時尚大套房",
            "image_url": "https://hp1.591.com.tw/house/active/2017/12/01/151210066602924201_210x158.crop.jpg",
            "subtitle": "台北租屋,文山租屋,獨立套房出租,温馨時尚大套房",
            "default_action": {
              "type": "web_url",
              "url": "https://rent.591.com.tw/rent-detail-5847118.html"
            },
            "buttons": [
              {
                "title": "更多...",
                "type": "web_url",
                "url": "https://rent.591.com.tw/rent-detail-5847118.html"
              }
            ]
          }
        ]
      }
      }
    }  */

 // Sends the response message

 callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  console.log(payload);
  if (payload === 'CITY_SEARCH_PAYLOAD') {
    response = {
        "text":"請選擇位置：",
        "quick_replies":[
          {
            "content_type":"location"
          }
       ]
    }
  } else if (payload === 'CITY') {
    response = { "text": "CITY!" }
  } else if (payload === 'SCHOOL') {
    response = { "text": "SCHOOL!" }
  }

  console.log(payload);

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

function whileWait(sender_psid){
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action":"typing_on"
  }
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('typing on!');
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!');
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}
