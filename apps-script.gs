/**
 * VEDRIVE — облачная синхронизация (Google Apps Script)
 * Хранит базу приложения в свойствах скрипта.
 * Развёртывание: Развернуть → Веб-приложение → доступ «Все» → /exec URL.
 */

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'load';
  if (action === 'load') {
    var data = PropertiesService.getScriptProperties().getProperty('VEDRIVE_DB');
    return ContentService
      .createTextOutput(data || '{}')
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput('OK');
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.action === 'save' && body.payload) {
      PropertiesService.getScriptProperties()
        .setProperty('VEDRIVE_DB', JSON.stringify(body.payload));
      return ContentService.createTextOutput('saved');
    }
    return ContentService.createTextOutput('ignored');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err.message);
  }
}
