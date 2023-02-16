// CSVを配列に格納する
$(function(){
    $('#button_convert').click(function(){
      console.log('converted!');
    //改行ごとに配列化
    let rawText1 = $('#area_input').val()
        .replace(/"url","Title","Priority","Change frequency"\n/g,'')//タイトル行を消す
        .replace(/,[^,]*,[^,]*(\n|$)/g, '$1');//priorityとfrequencyを消す。
    let arr = rawText1.split('\n');  // 1行ずつ1次元配列に変換
    //1次元配列を2次元配列に変換
    let res = [];
    let convertedText = '';
    for (let i = 0; i < arr.length; i++ ){
        if (arr[i] == '') break; //空白行が出てきた時点で終了
        arr[i] = arr[i].replace(/^\"(.*)\"$/g,'$1'); //最初と最後のクォートを消す
        res[i] = arr[i].split('\",\"'); // "," ごとに配列化
        res[i].push(res[i][0]); // urlを末尾に追加
        res[i][2] = res[i][2].replace(/([^\/])\/([^(\/|\n\$)])/g,'$1\/\t$2');  //url列をスラッシュで区切る
        convertedText += res[i][0]  +'\t' + res[i][1]  + '\t' + res[i][2] + '\n';  //タブ区切りテキスト化する
        }
       $('#area_output').val(convertedText);
    });
  });

    // メッセージを出す
    function showMsg(){
      msgBox = document.createElement('div');
      // msgBox.attr('id','message');
      msgBox.id = 'message';
      msgBox.textContent = 'Copied!';
      $('#output').append(msgBox);
    }
    // メッセージを消す
    function msgFadeOut(){
      // msgBox.style.cssText+='opacity: 0;
      $('#message').fadeOut();
    }
    function removeMsg() {
      $('#message').remove();
    }

    // コピーボタンを押すと、右のテキストエリアが全選択され、コピー。
    // コピーされました のメッセージが出て、その後自動的に消える
    $(function(){
      $('#button_copy').click(function(){
        // 全選択してコピー
        $('#area_output').select();
        document.execCommand('copy');
        // メッセージが出て、消える
        showMsg();
        setTimeout('msgFadeOut()', 1000);
        setTimeout('removeMsg()', 2000);
      });
    });