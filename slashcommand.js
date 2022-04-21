const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const { exec } = require('child_process');
let currentVersion;
let newVersion;
let requestmode;

(async () => {
  // Webアプリの起動
  await app.start(3000);
  console.log('Bolt app is running!');
})();

// /gittagを送信したときの処理
app.command('/gittag', async ({ command, ack, say }) => {
  await ack();
  requestmode=command.text;
  await parseRequestmode(requestmode);
  currentVersion=getCurrentVersion();
  newVersion=calcNewVersion(currentVersion, requestmode);
  await tagOnMainBranch(newVersion);
  await say(`最新バージョンは${currentVersion}です`);
  
});



  function tagOnMainBranch(tagname){

    exec('/Users/ken/github/gittag/tagOnMainBranch.sh ' + tagname, (err, stdout, stderr) => {
        if (err) {
          console.log(`stder for tagging: ${stderr}`)
          return
        }
        console.log(`stdout  for tagging: ${stdout}`)
      }
    )

  }


  // 最新のバージョンタグを取得。X.X.Xの形式のみ抽出し、そのうち最大値を返却するShellを実行
  // バージョンは文字列としてStdoutより取得
  function getCurrentVersion(){
    exec('/Users/ken/github/gittag/getLatestVersion.sh', (err, stdout, stderr) => {
      currentVersion=stdout;
      console.log(`a variable for getversion: ${currentVersion}`)
      return currentVersion;
    });
  }




// 現在のバージョン、リクエストをもとに新しいバージョンを返却する
function calcNewVersion(currentVersion, requestmode){

  if(parseVersion(currentVersion)){} else{return false;}
  if(parseRequestmode(requestmode)){} else{return false;}

  let versionArray = currentVersion.split(".");
  switch(requestmode) {
      case "major":
      versionArray[0]=parseInt(versionArray[0])+1;
        break;
      case "minor":
      versionArray[1]=parseInt(versionArray[1])+1;
        break;
      case "patch":
      versionArray[2]=parseInt(versionArray[2])+1;
        break;
      default:
  }
  return versionArray[0] + "." + versionArray[1] + "." + versionArray[2];
}


function parseVersion(version){
  var regex = new RegExp('^\\d+\\.\\d+\\.\\d+$');
  return regex.test(version);
}

function parseRequestmode(version){
  var regex = new RegExp('major|minor|patch');
  return regex.test(version);
}
