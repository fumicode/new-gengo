const {gengos, KANJI2GENGOS, NAME2GENGOS} = require("./libs/gengos.js");
const {KAN, SHI} = require("./libs/eto.js");

const gengoNames = gengos.map( gengo => gengo.gengo.name ).filter(gengoName => typeof(gengoName) != "symbol");

const 色 = require("chalk");

const Japanameにある漢字をゲット = require("./libs/japanameKanjis");

//console.log(gengoNames);

//console.log(KANJI2GENGOS)

const kanjiToGengoArray = Object.keys(KANJI2GENGOS).map((kanji)=>{
  const obj = KANJI2GENGOS[kanji];

  return {
    kanji,
    count: obj.first.length + obj.second.length,
    first:obj.first,
    second:obj.second,
  };
});

//console.log(kanjiToGengoArray);




//isTakedaKanjiNew(takedaKanjis);

// 2文字。
// いままで出てきたのの組み合わせ。同じ漢字は並ばない

const これまでの元号集合 = gengoNames;
const 元号に使われてきた漢字集合 = Object.keys(KANJI2GENGOS);

//const a = Japanameにある漢字をゲット()


function 漢字一覧を表示(漢字集合){
  console.log(漢字集合.length);
  console.log(色.green(漢字集合.join(" ")));
}


function 漢字辞書を生成(){
  return Japanameにある漢字をゲット()
    .then((漢字読み一覧)=>{
      const 漢字読みマップ = {};

      漢字読み一覧.forEach(漢字オブジェクト=>{

        漢字読みマップ[漢字オブジェクト.kanji] =
        {
          ひらがな読み: 漢字オブジェクト.sounds,
          ローマ字読み: 漢字オブジェクト.romaji_sounds,
        }

      });


      return 漢字読みマップ;
    });
};

const 漢字の読みを調べる君約束 = 漢字辞書を生成().then(辞書 => {
  return function(漢字){

    return 辞書[漢字];
  }
});



new Promise((次行くぜ, オワタ)=>{
  console.log("==元号に使われてきた漢字集合==");

  //漢字一覧を表示(元号に使われてきた漢字集合);

  console.log("==縁起のよさそうな漢字集合==");

  const 縁起のよさそうな漢字集合 =
    "栄光"
    .split("");


  次行くぜ(元号に使われてきた漢字集合.concat(縁起のよさそうな漢字集合));

})
  .then((漢字集合)=>{
    console.log("==ありえない漢字は削除==");

    const ありえない漢字 = "平成昭和" //最近なので
      +"霊銅祚雉亀鳥感老乾" //ないでしょ
      +"衡禎享亨" //難しすぎ
       ;

    const 平成昭和を削除した漢字集合 = 漢字集合.filter(
      漢字 => !( ありえない漢字.split("").includes(漢字) )
    );

    //漢字一覧を表示(平成昭和を削除した漢字集合 );

    return 平成昭和を削除した漢字集合;
  })
  .then((漢字集合)=>{

    const 元号候補集合 = [];

    for(漢字1 of 漢字集合){
      for(漢字2 of 漢字集合){
        元号候補集合.push(漢字1 + 漢字2);
      }
    }

    console.log("==元号候補集合==");
    //漢字一覧を表示(元号候補集合);

    return 元号候補集合;
  }).then((元号集合)=>{

    const 同じ漢字じゃない元号集合 = 元号集合.filter(元号 => 元号[0] != 元号[1])

    console.log("==同じ漢字を削除==");
    //漢字一覧を表示(同じ漢字じゃない元号集合);

    return 同じ漢字じゃない元号集合;

  }).then((元号集合)=>{

    const これまでの元号をひっくり返した = これまでの元号集合.map(元号 => 元号[1]+ 元号[0])

    const 今まで使われていない元号集合 = 元号集合
      .filter(元号 => !これまでの元号集合.includes(元号))
      .filter(元号 => !これまでの元号をひっくり返した.includes(元号))

    return 今まで使われていない元号集合;
  }).then( async (元号集合)=>{
    const 漢字の読みを調べる = await 漢字の読みを調べる君約束;

    const 元号と読みの集合 = 元号集合.map(元号 => {

      const 一文字目のひらがな読み = 漢字の読みを調べる(元号[0]).ひらがな読み[0];
      const 二文字目のひらがな読み = 漢字の読みを調べる(元号[1]).ひらがな読み[1];

      const 一文字目のローマ字読み = 漢字の読みを調べる(元号[0]).ローマ字読み[0];
      const 二文字目のローマ字読み = 漢字の読みを調べる(元号[1]).ローマ字読み[1];

      return { //漢字と読み
        元号: 元号,
        ひらがな読み: 一文字目のひらがな読み + 二文字目のひらがな読み,
        ローマ字読み: 一文字目のローマ字読み + 二文字目のローマ字読み,
      };
    });

    console.log("==漢字と読み==");
    //漢字一覧を表示(同じ漢字を削除);

    return 元号と読みの集合;
  })
  .then((元号と読みの集合)=>{
    console.log("==HSTMではじまるのを削除==");

    const HSTM以外の元号 = 元号と読みの集合.filter((元号と読み)=>{
      const 始めがHSTM = 元号と読み.ローマ字読み.match(/^[hstm]/);
      if(始めがHSTM){
        return false;
      }
      else{
        return true;
      }
    });

    return HSTM以外の元号;
  })
  .then((元号と読みの集合)=>{
    console.log("==候補==");
    const 元号予想 = 元号と読みの集合.map(元号読み=>元号読み.元号);
    漢字一覧を表示(元号と読みの集合.map(元号読み=>元号読み.元号));

  })
