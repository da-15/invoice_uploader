function doGet(e) {
  return message("Error: no parameters");
}

function doPost(e) {
  if (!e.parameters.memo || !e.parameters.file) {
    return message("Error: Bad parameters");
  } else {

    let filename = e.parameters.memo;
    if(e.parameters.filetype == 'image/jpeg'){
      filename += '.jpg';
    }else if(e.parameters.filetype == 'image/png'){
      filename += '.png';
    }

    let data = Utilities.base64Decode(e.parameters.file, Utilities.Charset.UTF_8);
    let blob = Utilities.newBlob(data, e.parameters.filetype, filename);
    DriveApp.getFolderById('19WXq1CqvDV9dTmiS8HKiXuRbx19f_vxe').createFile(blob);
    return message("completed" + e.parameters.filetype);
  }
}

function message(msg) {
  return ContentService.createTextOutput(JSON.stringify({result: msg})).setMimeType(ContentService.MimeType.JSON);
}