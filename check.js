const fs = require('fs');
const fetch = require('node-fetch');

const login = (hash) => {
  return new Promise((resolve, reject) => {
    const data = {
      jsonrpc: '2.0',
      id: 'user.authentication.loginUsingTelegram',
      method: 'user.authentication.loginUsingTelegram',
      params: {
        initData: hash,
      },
    };
    fetch('https://api.service.gameeapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
        Accept: '*/*',
        'Sec-Fetch-Site': 'cross-site',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Mode': 'cors',
        Host: 'api.service.gameeapp.com',
        Origin: 'https://prizes.gamee.com',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)',
        Referer: 'https://prizes.gamee.com/',
        'Sec-Fetch-Dest': 'empty',
        Connection: 'keep-alive',
        'x-install-uuid': 'fd315c37-952d-45a0-9c78-1d429928e2e1',
        'client-language': 'en',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const main = async () => {
  console.clear();
  console.log('🚀 Gamee: Check Login');
  const hashlist = fs.readFileSync('hash.txt', 'utf8').trim().split('\n');
  console.log(`Total ${hashlist.length} Akun\n`);
  for (let i = 0; i < hashlist.length; i++) {
    const hash = hashlist[i].trim();
    const loginres = await login(hash).catch((err) => null);
    if (loginres?.result?.tokens?.authenticate) {
      console.log(`[ ${new Date().toLocaleString()} ] Login success`);
    } else {
      console.log(
        `[ ${new Date().toLocaleString()} ] ${loginres?.error?.message}`
      );
      console.log(' ');
    }
  }
};

main();
