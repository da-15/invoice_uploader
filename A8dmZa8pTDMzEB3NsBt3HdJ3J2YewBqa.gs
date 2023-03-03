function doGet(e) {
  //アクセスできるか確認用
  return message('request:ok');
}

function doPost(e) {
  //エラーチェック
  let check = checkParameters(e.parameters);
  if (check !== ''){
    return message("Error: Bad parameters(" + check + ')');
  }

  let filename = '';
  filename += ('' + e.parameters.date).replace(/[^0-9]/g,'') + '_';
  filename += ('' + e.parameters.memo).replace(/[\\/:*?"<>|_]/g,'') + '_';
  filename += ('' + e.parameters.price).replace(/[^0-9]/g,'');
  
  if(filename == ''){
    filename = 'noname';
  }

  if(e.parameters.filetype == 'image/jpeg'){
    filename += '.jpg';
  }else if(e.parameters.filetype == 'image/png'){
    filename += '.png';
  }else if(e.parameters.filetype == 'application/pdf'){
    filename += '.pdf';
  }

  let data = Utilities.base64Decode(e.parameters.fileuri, Utilities.Charset.UTF_8);
  let blob = Utilities.newBlob(data, e.parameters.filetype, filename);

  //アップロードされたファイルをDriveに保存
  DriveApp.getFolderById('19WXq1CqvDV9dTmiS8HKiXuRbx19f_vxe').createFile(blob);

  return message("completed" + e.parameters.filetype);

}

//入力されたパラメーターの不正チェック
function checkParameters(params){
  if(!params.memo || !params.fileuri || !params.price){
    return 'no_required'; //NG
  }else if(params.memo == '' || params.fileuri == '' || params.price == ''){
    return 'no_required'; //NG
  }

  return ''; //OK
}

//メッセージの生成 JSON
function message(msg) {
  return ContentService.createTextOutput(JSON.stringify({result: msg})).setMimeType(ContentService.MimeType.JSON);
}