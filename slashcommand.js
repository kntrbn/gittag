const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const { exec } = require('child_process');


(async () => {
  // Webアプリの起動
  await app.start(3000);
  console.log('Bolt app is running!');
})();

// /gittagを送信したときの処理
app.command('/gittag', async ({ command, ack, say }) => {
  await ack();
  // await say(`Tagging with ${command.text}`);



  exec('/Users/ken/github/gittag/getLatestVersion.sh', (err, stdout, stderr) => {
    // latestVersionTag = ${stdout}
    console.log(`stdout for getversion: ${stdout}`)
    let latestVersionTag=stdout;
    console.log(`a variable for getversion: ${latestVersionTag}`)

  }
  );

  await say(`Tagging with ${command.text}`);
  


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

