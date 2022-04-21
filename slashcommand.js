const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const { exec } = require('child_process');
let latestVersionTag;
let requestmode;

(async () => {
  // Webアプリの起動
  await app.start(3000);
  console.log('Bolt app is running!');
})();

// /gittagを送信したときの処理
app.command('/gittag', async ({ command, ack, say }) => {
  await ack();
  // 最新のバージョンタグを取得。X.X.Xの形式のみ抽出し、そのうち最大値を返却するShellを実行
  // バージョンは文字列としてStdoutより取得
  exec('/Users/ken/github/gittag/getLatestVersion.sh', (err, stdout, stderr) => {
    latestVersionTag=stdout;
    console.log(`a variable for getversion: ${latestVersionTag}`)
    say(`最新バージョンは${latestVersionTag}です`);
  });
  
  requestmode=command.text;


  exec('/Users/ken/github/gittag/tagOnMainBranch.sh ' + command.text, (err, stdout, stderr) => {
      if (err) {
        console.log(`stder for tagging: ${stderr}`)
        return
      }
      console.log(`stdout  for tagging: ${stdout}`)
    }
  )
  await say(`Successfully Tagged.`);
});

