function doGet(e) {
  return message("Error: no parameters");
}

function doPost(e) {
  if (!e.parameters.filename || !e.parameters.file) {
    return message("Error: Bad parameters");
  } else {
    var data = Utilities.base64Decode(e.parameters.file, Utilities.Charset.UTF_8);
    var blob = Utilities.newBlob(data, MimeType.PNG, e.parameters.filename);
    DriveApp.getFolderById('1TwVuC4qEyUoDZ44kNp7kIlmPZn8iA-GZ').createFile(blob);
    return message("completed");
  }
}

function message(msg) {
  return ContentService.createTextOutput(JSON.stringify({result: msg})).setMimeType(ContentService.MimeType.JSON);
}