const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const { execSync } = require('child_process');
let currentVersion;
let newVersion="8.8.8";
let requestmode;

(async () => {
  // Webアプリの起動
  await app.start(3000);
  console.log('Bolt app is running!');
})();

// /gittagを送信したときの処理
app.command('/gittag', async ({ command, ack, say }) => {
  await ack();
  // console.log('Inside command: 1');
  requestmode=command.text;
  if(parseRequestmode(command.text)){
    console.log(parseRequestmode(requestmode));
    // console.log('Inside command: 2');
    currentVersion=getCurrentVersion();
    console.log(getCurrentVersion());
    // console.log('Inside command: 3 ' + currentVersion);
    // console.log('Inside command: 3 ' + requestmode);
    // console.log('Inside command: 4');
    newVersion=calcNewVersion(currentVersion, requestmode);
    // console.log('Inside command: 5');
    tagOnMainBranch(newVersion);
    // console.log('Inside command: 6');
    await say(`最新バージョン${currentVersion}に対し、${requestmode}アップデートをします`);
    await say(`${newVersion}にてタグ付けが完了しました`);
  }else{
    await say(`入力値が誤っています:${requestmode} 。次から入力してください major|minor|patch`);
  }
  
});




  function tagOnMainBranch(tagname){
    execSync('/Users/ken/github/gittag/tagOnMainBranch.sh ' + tagname)
  }

  // 最新のバージョンタグを取得。X.X.Xの形式のみ抽出し、そのうち最大値を返却するShellを実行
  // バージョンは文字列としてStdoutより取得
  function getCurrentVersion(){
    console.log('getCurrentVersion() has started');
    currentVersion=execSync('/Users/ken/github/gittag/getLatestVersion.sh')
    return currentVersion.toString();
}

// 現在のバージョン、リクエストをもとに新しいバージョンを返却する
function calcNewVersion(currentVersion, requestmode){
  let versionArray = currentVersion.toString().split(".");
  switch(requestmode) {
      case "major":
        versionArray[0]=parseInt(versionArray[0])+1;
        versionArray[1]=0;
        versionArray[2]=0;
        
        break;
      case "minor":
        versionArray[1]=parseInt(versionArray[1])+1;
        versionArray[2]=0;
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
