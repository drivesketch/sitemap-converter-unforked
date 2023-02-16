// CSVを配列に格納する
$(function(){
    $('#convert').click(function(){

    //改行ごとに配列化
    var rawText1 = $('#input').val()
        .replace(/"url","Title","Priority","Change frequency"\n/g,'')//タイトル行を消す
        .replace(/,[^,]*,[^,]*(\n|$)/g, '$1');//priorityとfrequencyを消す。
    var arr =　rawText1.split('\n');  // 1行ずつ1次元配列に変換
    //1次元配列を2次元配列に変換
    var res = [];
    var convertedText = '';
    for (var i = 0; i < arr.length; i++ ){
        if (arr[i] == '') break; //空白行が出てきた時点で終了
        arr[i] = arr[i].replace(/^\"(.*)\"$/g,'$1'); //最初と最後のクォートを消す
        res[i] = arr[i].split('\",\"'); // "," ごとに配列化
        res[i].push(res[i][0]); // urlを末尾に追加
        res[i][2] = res[i][2].replace(/([^\/])\/([^(\/|\n\$)])/g,'$1\/\t$2');  //url列をスラッシュで区切る
        convertedText += res[i][0]  +'\t' + res[i][1]  + '\t' + res[i][2] + '\n';  //タブ区切りテキスト化する
        }
       $('#output1').val(convertedText);
    });
  });

    // メッセージを出す
    function showMsg(){
      alertBox = document.createElement("div");
      alertBox.classList.add("appear");
      alertBox.id = "alertBox";
      alertBox.textContent = 'Copied!';
      document.body.appendChild(alertBox);
    }
    // メッセージを消す
    function fadeOut(){
      alertBox.style.cssText+="opacity: 0;";
    }
    function removeMsg() {
      document.body.removeChild(alertBox);
    }

    // コピーボタンを押すと、右のテキストエリアが全選択され、コピー。
    // コピーされました のメッセージが出て、その後自動的に消える
    $(function(){
      $('#copyOutput1').click(function(){
        // 全選択してコピー
        $('#output1').select();
        document.execCommand('copy');
        // メッセージが出て、消える
        showMsg();
        setTimeout('fadeOut()', 500);
        setTimeout('removeMsg()', 1000);
      });
    });