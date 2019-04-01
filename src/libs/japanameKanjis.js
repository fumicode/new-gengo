
//japaname からとってくる

const request = require("request");


module.exports = function Japanameにある漢字をゲット(){
  return new Promise((ゲットした, 見つからなかった)=>{
    request.get({
      uri: "https://japana.me/api/crafti/kanjis",
      headers: {'Content-type': 'application/json'},
      qs:{},
      json: true,

    }, function(エラー, req, 漢字データ){
      if(エラー){
        return 見つからなかった(エラー);
      }
      return ゲットした(漢字データ);
    });
  });
}
