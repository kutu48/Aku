const fs = require('fs');

const tembak = (token) => {
  return new Promise((resolve, reject) => {
    const randomclick = Math.floor(Math.random() * 50) + 50;
    fetch('https://api.hamsterkombat.io/clicker/tap', {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 11; Galaxy S7 Build/RQ1A.210105.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.120 Mobile Safari/537.36',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
        Origin: 'https://hamsterkombat.io',
        'X-Requested-With': 'org.telegram.messenger',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        Referer: 'https://hamsterkombat.io/clicker',
        'Accept-Language': 'en,en-US;q=0.9',
      },
      body: JSON.stringify({
        count: randomclick,
        availableTaps: 1000,
        timestamp: new Date().getTime() - 10000,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resolve(data);
          });
        } else {
          reject('Failed to tap');
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const claimDaily = (token) => {
  return new Promise((resolve, reject) => {
    fetch('https://api.hamsterkombat.io/clicker/check-task', {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 11; Galaxy S7 Build/RQ1A.210105.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.120 Mobile Safari/537.36',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
        Origin: 'https://hamsterkombat.io',
        'X-Requested-With': 'org.telegram.messenger',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        Referer: 'https://hamsterkombat.io/clicker',
        'Accept-Language': 'en,en-US;q=0.9',
      },
      body: JSON.stringify({
        taskId: 'streak_days',
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          resolve(data);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const login = (hash) => {
  return new Promise((resolve, reject) => {
    fetch('https://api.hamsterkombat.io/auth/auth-by-telegram-webapp', {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 11; Galaxy S7 Build/RQ1A.210105.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.120 Mobile Safari/537.36',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
        authorization: 'authToken is empty, store token null',
        Origin: 'https://hamsterkombat.io',
        'X-Requested-With': 'org.telegram.messenger',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        Referer: 'https://hamsterkombat.io/clicker',
        'Accept-Language': 'en,en-US;q=0.9',
      },
      body: JSON.stringify({
        initDataRaw: hash,
        fingerprint: {
          version: '4.2.1',
          visitorId: 'fed6010034318ec4d4348064e4945890',
          components: {
            fonts: {
              value: ['sans-serif-thin'],
              duration: 124,
            },
            domBlockers: {
              value: [],
              duration: 109,
            },
            fontPreferences: {
              value: {
                default: 145.90625,
                apple: 145.90625,
                serif: 164.71875,
                sans: 145.90625,
                mono: 132.625,
                min: 72.953125,
                system: 145.90625,
              },
              duration: 6,
            },
            audio: {
              value: 0.0000769702,
              duration: 140,
            },
            screenFrame: {
              value: [0, 0, 0, 0],
              duration: 8,
            },
            canvas: {
              value: {
                winding: true,
                geometry:
                  'data:image/png;base64,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',
                text: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAABuCAYAAADoHgdpAAAZ20lEQVR4Xu2dCXiU1bnHf+9MCEsUZBEFAUkCCgoFyeAuigtu1St1xw2qkrS1dt9s7bWWXqttn15vtQj0irutdLHaWq07iqgJgqJebUkCQgXcWAMJmZlzn/ebJbN/y8xkxsL7PHkmkPOd837nP+ecdz9CCcmMMn0JcSQ+hmLYH8MQhCHA/hD/VA43AOsR1hNmg/UZ+X09fl6WVbLV/LqxBh/jEd+hwHgww4C9gSqgT/SzX/R1twBtwI7o5zaEtcBKMG8R5E354uSWUcb0DcGRPhhqYH8DQ6SLrxifcf4E1odhg35Gf1/vh5dXiWwt4TRbQ0t3M2BqzSgMnwXOAo4DerjmIdwBobbIj2kzDN9hGGt8HAwMdN1b0gNrgGeAp3wSbhzUR0KDq4TBVVg/fXt66bwTWAw8KvDXZpFVXjrJ95miA20wfkZxHGELWAX4INdMm07o/ASC26LgBrN3MQgYE/05EPDlHi0ENAFPRwFuzdW8V0UE8KF7w6gB0Mf9dxT4h8CjIXh0NbyIiLJQdCoa0Abjo5bLMPwI0Cl3RyYEwU1dALt7OtK6P3AyMCF97woDDwP/DfzLS986c0P2htEDoaY/9LD5RmUeY7WB61vhAUSUpaJRUYA21eZshJ8A41xzrqu286MIwIUiPfGngbW167YM/EKXVqH61350hY8dFAHfPa0Evtci8lf3jzp7oqBAm5HmSPz8EsORzoZPaBXcDB0bIltzkWj5gTDnVFjhfn9xztF+VXDYEBgRk/ucPwosEfhOs8gSV085aFwQoM0ocwhhbo6ewQ6GjTUxkZWrAIfbXTznrqlKP8qcClkWjQVOAfZz14+r1gN6w8T9obY/iOtpVsHtumaRN12NmaOxaw5S+zK15nIMdwJ+V0zpFt2+BlSCLiL9CfgOkCbx6JF6DlBXxMG16316wbEjIgKcO1KWZ7eI6NzmTZ6BNhihmhsRfuCKi/Au6FgLnZtdPea2sQF+Cdxu9+CJgP54ngm7AaJ/V4Ht6OFeJPUbW+AGRPSVPJOn1zOHmEraeRD4nPORDXRshF3rwRRVwEQV168ATzhlbjxwHlDh9AGP7Sp8UDcExu8HPldTv8gHl60S8bz9uRpNX88cZAYRRHfEYx2/rm7PO5ohvNPxI14bbgIaorqxqz6qgYuj9jNXD3po3L83nFrrygAj8LzA+atEPvQworsNy4w2NQR5EqHG8WCdH0P7e0VfxcqP2jAvi3465i+x4QBgFqCfxSZd3SeMjOjgzqnZB6euEml2/kikpeMVbdmlwzQ6tmzp9ty+Gjp1jRWftkdlq5yWLSds7BvdEno5aVyANgcPgmOHg9+xweVd4IgWEbXXOyZHQEetXI9hONVRz7pFW1u15yPF0TCxRnriXxk1KLt6MFtjNdJe7mYZ5DmqSubTaiMSujP6W4uak11Y05wBXWN+GtVS7NlQtWmHaq7FFbgSGbkFmGfPmbsWU8Dh19pdv9la61Z+6ig4wLEadnOLyHedDm4LtKk2VyEscNRhcEtkJZOXJuBoqFij3wHXuXrCReOLIg7PbiOVxE+ugZH7OBpS4KJmEZ0CW8oJtKk1x2B41pErUYWunattByxkg2XADCCHLyu/4dQ5pcJZMU2mqRwqIlOrI7Zze1I1ZlqLyIt2TbMCbWrNcAw6lyqe5KZdH0Yk626k9cDZQAFdH5m517CFLwGeTNd5TMhxB0acJPb0oUBds4gqHVkpO9DV5mGE/7AdR6XqnS22zQrdoD7qhSp0vxn7U9v4pd0yUvIguo07UL8M/LlVRA267oA2NUaNIS/YvpoleP2zW89k5UkDBS60Za7ADa6JBjcVuNuc3emZfcZoR3ZyAxNbRV7P1l/GFW1qzXMYjs/JREhVqHe6xRCSyoeey69054TrWKpyXdHdg6pZ1gdnHwyDNOwt54p9olnkNMdAm1HmBMKWAJadVD9uU5CLJgZlHVsBVqBLQlcBairtbtIQpnPG2JpMfTB1lchzmdhLW9GmxuiWnd2OrRavtre7zRiSyrRu2bp1l4QUZAW7FNSvJ5x3SE4LmtrDm0VOsAXa1JpzMJbDIjup4NVNZs1UJp6MWidLMc/xMWcCo0vEgZpLj8+t6wmc3izyeCqHSSva1Jg3cpoISqArJzJ8BqCG3pKSRnOrYFYqOqkaanPq2K+3iEzMCrQZaSbiY3lW/q1z+e2SCF/K09vRQPBSzW/SuF91ZF0oDqsqnJ1/KOxdmR0qGLta5J3EBvEVbWqM2k1vyvy0ge16LhcvrstuVu4AfmbXqLv+rq4dtYWXigb2geljcgUvaESp+ifilAj0y+r+ysh7x/vQobao0tG5wIrSDZ888vAyEBYCQ2GSniMZ6ZUWkaRIXAtoc6AZgt+KY0/XqzXGa7sGI3afoyKV9Q+Ao0vKQQpHOkvfBvqW8JunW/hF47LFoGluy7C1Iu/HOIwAXWM0+mZuRrbVG6Ux1yWkB4DrSzh+xqHVOHx4iZnSUOKTsgb7fKFFRE88iyJA15rHMwYVhLZDW8nlXMuBpFlqZUWlspSlTsJZB8OQvdKmRiDJUibRECENOEsR40ovgCn3GiIUACuys6xIo9jVEe44KKRI3PfvFTGkpCcJ7AIGx0KOxEqj8bE0jY0S68wxflTf00jcsiQ98FQwKzWdmNl/HYajVouokI1ktYZtf6uk6lRs7srCGpYNSHVdqguz1KTpP7qqU0hgerOIJo0ipsao+q9JDV1khQSVJF87jdmFwJxST2S28c+MqgPlwJ+6M4elqQFfaxHRzGAL6PTAv7Z/QGhbObBPUQL/CvVm3R1AmIvvA/rCmWlG+HgAoZhqcxeS4GkN7YC2/yvUVOTdz7eAP+bdS5E6mASoJadcSLdv3cajZODuVhF1w1hndHKQwc41kUT0MqGSBBk4ffdyUbFi/I4ZBFO6vFuJKpZu3Wr8jtYCMLBtRckcF5nmV9OYuz8izSHSpfZkpbLZww9XTEi0gcc9WQq0mr0iMY4lCvTLNa3qbysPaSEDl6pDl5vJ7pRaqI7HhW9pEbH+kQx0GZg7U6fTFdDSDv73QNOS5BMIaSUFtQVp/tcnYKLBwaL+3AGgnzII/PuDGQCmH4RGgHFoBSlHoKv7wylxs2gS0JGtW+O/tmUNInS4lxW+me3W7fsYKlZCxavgWw6dHRAMQ8ilE8YvkUC8Hj0hPAmCh0PwUAjniK3WiHdVTsuNZk6ESqsAxbstIlqMK0EYK0EQvpP5SRfGDPhbocdyqHgZfGvAaJJ9CHYVqGSXTlJPf8SsGD4QgkdB50QIadBYgoOvlDFkuSZPBbIxg5TTeAyZqle/RbjQMpCooaTM6FogUpMpDD2WQc/7wJfgG1dw24sUjarRl5GVEaHwUOi4DDoPi1Sq07wszc8qN9LcrWm16lj+XauIxaGe0Wo5+QrblpeVtB2bux8Dd1W8Bb3uB1+KtW6nVhQsctamSrK9U2pehEdB+2Vw+FhQ61i5kfI8ywobu7VFxDpcFOjvEtpxUzkZSeLz5n+PO3rdzc/8Wm8tgfT43dEJoSKDHBtSk9S1HGRqWEb9BDj4Etg4stygjti+B/SOhxSpwWQmHRsX0r6ufJj1fQi9HoSKF/lDNJgjibm2bgQ5EeyqlNqfap9Vy9ia4+DVC2BTMQuXuYTnmOHIoYNnNYvcFVnRteY02pr/Vuookvhr9GiC3lrAMSJYacCBBh7EaWcQOgskdLmcO+u81nM7Rhr6EouyM35Y/FV4N3PYnduh8m5f0x/fyTXxzA0xw81QOlb+C40NKykZ6PVXqLwniYuNwDGxeLFiCl5O3z0moOni1pSR1OCOFVfAqxqBbltjwOmIntpV9O1pwheN2ydWK1zM//yzJwu3tFslfUpGIeg9D3pkTBuydscVYY14KfWXMTpBGlN9vID6UDNRy0nw7JUQKnbhsuyAqWNtYUe/XnLtaKuQjJg7XpvAC+EVzquvFfjbIG3Q51bwZw/mtWK6VYUqlJ6c7yvoFv6zitzZfhvr4PFroEMz6bufVFuZIeFxMvvwt6JAN57HR7LIKlzd3eTbBH1uBF/uitnNYcO0clnN1qxp3m4lVNtsz1uHwV++D9vzvBbAJS7K1UsaMGbkXGmos7y8YuYtuw7MTyygPdWkc8lFrLnapauuj1i27Kg9yCm7QuXjxdI4sbl+OMLB1rx5JPzxRgg6tJ/bzYWDv6sGrdqK1gCX+oCVsaFA3wPmMmvr7raY2nBku65Ij0nM+B7bd3FL2BS+xJSDScvYRFNyzhS4OHv+U9Jza4+Gx69FLyXoDtJgDY1bBO6W+kA08GBe41MgJ1nCWDzcu8js9PozVN7vbJCoEFZW0aCxJLsLKmEfh9L165fAK/YlYZxNSu5WfwdqI0fMkzI7oHcP6IpuiuRcqbVJDQDFvrinx0vQ24VAoM6KjqDFnqpZqm6VlBI9VodXwEQXZcqfvg6a0zJaC/o66qDUyNkImaVSP1mzmSygVSqLxIpq3RnLjlIk8q+GKo16d+GESLBnpxlPisRmzm4TE+FrfHCyi5tyQr3g0R/BB8Wrj6EaX0Ki50qpD3wmBrQWCOsKQ/8NkHfl1AxTpcEAe30bxGUR2BRzZ0ljyFLdkkN8cJYLoHVa2vvD72+BHYUvXKY2OTXWJVCr1AesKARd0Rp20VVLWIXg+UVYKn1ugwoP0p6qVXpOR6kkpadig2txsxEJc9NP4EKHAlnS9E+BJwtfNmERoIGpCfSh1AcGx4BOD8W4DyhkxK+/Baoc1ydNZnVreoXgbi0mF+MmU1E5xXimp9vt4A+3wsdZ85tdrzS93itD4dudUh+w6lbpitaZTP5aqsRzWwEL9FbdDH6tNumBtnWkpWZrfqdei9dtrg3VinQBpjqndNf+jB+WeeBk2BFwRlTb9TAtKY+EBCam3qpj5jd9T2YHrCoWCvTHGWvOKw+v5c8BFa3QR++p8UgpW3esl24N7Nc86EyakapWqmItC3oD+6x7YchUjxOT9Ni8FpGo6hz5fzOv8QaQa6Q+YAW9KdB6KieePJGWes/Yr4F8c+CrbgJ/9ho4tm+Zxfes304tfhlP6bftyGMDlZm06Gsmk/VQH3w2Kox5AXvwRDjnLx4Ziz+2Vq9kSbxrIwryfwKrpT5gifjJ6lXqkDqLWqnbq9NIQ4D66NWUeVCOcCHVC7XAXNGuZFEMVSDIdpSO8sGJCVK3F7BPWwAjTvc6QTt9cMwqkfhKSgBZ+0xSr7IXqdGmGgH8kEc+9vo++FQ5z4NsfNCPAF/Lo/ucj9oVZj+qAsanGEzcgj1wFJyb2T1r91qphdlTQNZ1/JLU16mdSVd01ASaq1cvdnD/+1BVgKBnB37oomRcOsmUVFv33hlMoG7BPu8JGKD3m7uipKsW0kG2+vq71Aese1AU6HtBclejVgXsXpdl+3o+BT0LpJBnEchi06IhgrPBplKti0l0cnmKnQ7tBuzAl2GSK4E16fKULCCrtnKXNASsSCw9ozV76EbbadBacur0cOrKrPoxpEZv2g6SpYGDoAPNz9JIFNcXQqUO6fQ6pAkO3JROwR58CJyjrghHlHQdUlaQI10luCnnN16EEb1+0J4UZAXbroCgbIO9tQyuy7SYbBw42L71UQVZwfaclKcu4y8Adjcc6LE8oxJ6O/BcOQJb4PKXodcBdhhsMXBEq4hVKsoGZM1gOV8aJv8+tqLVaubcmqHmFbW15bKcVb4EvVx4qOxeT//uYFVrM61i9A0v1zBohtIFgBNDl3qs1HPllJyAPeV6GKMiflb6iw8uiQX72YKs3fhkglxdp4V8iQQH9txit0aTR9eFqjtNNtN1n186DypwOlk65vZ0K1mmx7Wp1g11fBfWcdE7rhwsUMuGOKNnWrEu29ewA3vEkXCatfjSSODnzVqrMHrjrCOQtZfE4MDIFtCkGrN7w6uqXmpBS7IAtkNfvVeuCJXBNP1G9WqH9OforWxZn1AVWPd6N3dbTesBIz1GiuQC21cBM1+HiiSv1k4BDcKP323lGGRYK/WBuCEsUjlwXuMjIGo+dk/q5NQTPhawoPnJVd9034/TJxxu4bHu1IqrZuq0gAUt4KPXErr5ervdsjO9Uy6wpz8E+1pxAkrrDZyeeCGKC5BVPPqTNATi1z5HgV72VTDJJaicTry2U9OU6vwaAuZ7C3rnaQ2zG9tlSo7miKo1927dZ1SQOgrQCwm66rrYjQgH+OCMDPlX9k+mt8gG9rRfwcjpaoe8LQhz3pMu570rkK0RzZelfrK6piyKAt2km5d1aOdFGlPwxGMfseYuO7k1r2EsYd5tkp3AuvEwZxo86eomX131em9kD/fncq63TAFbgTjyiIa1Syb8YMpqkaQrAd2DbA08VuoD8eLsXfW6s3mx3EJy8Jzn2OuNE9AI8pQkSLdd2bZ3moelWot6n6Lai6oYjtkb7YfjK6x06IJTFGxdZcrP+Jqjl8opi+J7t7UuI14odVC4oQ+kPpDkVE0EWi3a57vpLWPbI77+AhPWHWetusei4m8x031y2cK1VInWxtCZTJGobdlTYNWWfaiL4D+Xk6fxW99cFuTMZaEIe8MnrZIzHo1XhfMIsr7rgzI7kHRrVBfQdyy7FDFq6MyPps16nZFtE+KdqESuvpWngKeLVEtKDSoaLapZlnpoaDSI6sUqc9qsxDT2tL2u4sP80NeJvuVuutRnqNEgJ0XDfqyvUWwb33fsx/K5p6xjzzPI+rCYi2X25N8mctYF9O1v7kVFu9q+8kspOH9GK/2D2cMc1futl/Uo8JpulW8uu86U1nk+UeOBDWwJwaow7HBplasSGO1jzaF+Hq+SorCnm0vWy4wU7H8e0C4XL+2dF8gaSVC5bZDMmppkG0m+Dmle429B8rv28fMXbKXC4SUEquCqBq8lSfRHf4/9O/apX0tVgYbm+MwUiLkxDC1h+EBXu/6odhAFX02XagHrKbCfgIbtDk5f+sVkL+M+sNK3k6UP3uLhTO7qznC/NATSnFQpQDdp0EbuC87sdqpZF2ylh0Og7fra3f7eyVYWPpTfTR0iZ8nsurSwlVSgdW1olI7j++fTsLDbunc38Ny876aKVhY9kE90vyq4+0l9IM0YmCZtmHmNd4IkVZNwwyunfX4FI7YXN+/EFUOfosbv7bWCx+/0PneGBdIQUNd8GqUDPbdxHD7xrgEf/eWXGLcxSRf8FE11aVldud9Slv5K7XbeKCHxPbWDjPqDmd/0d4ylgbqncT98nqPfyX33tPted48nloxdzFs/8nZHnuEJaQg4vz86osM1abDxM55md8Rtz3Ha4oxX23rqb3d66G9TFrP2Go9A+46XhklZc56yWgTMvMZGENVQ3dHAh5Zw7u+tyMM95HIGFl2wlE3nedm6X5P6QF2u0XIA7VHV6r14GZfdlnNQl6+/+zS/9xuvsfOIlDw5B6+fRaVKfDKnjS+eJO9grHgT+fgTrv6C+ocKbz90w8enra1hFwsWdkCVS9VWGqW+zvbyxNxAz391Isanvnt3oJ1+xdsM35l+EdOnbfK7k9/Wvo08+ZvJLoc0+GRiLC7M09Yde8jc0TQf4WpXDAy7/QXOeF4jsfaQ0xl45Mxn2XCF24y7uVIf+KKTIWxXqvn1G/3x71JXhPMtxbdmHVd9a5gTBva0sWbAsGDuB5iBbqrGbqbSXy2zDnOUBmkLtMXFvMZrQH7lCpTpM1azb7AM6xu7eovuabyh55s8cu84d4OZBqmf7DjQ1RnQNxgfQ5qeBXGu44266QVOXL5n+3aC3pPHPk3rteqidkovMrtuikTDf5085Ahoa1Xf/ur+VPjeTqp3kmuEyjfeYeYc6+KOPWQzA3fe/C7B6ujdY7az9RHB8Hj50uEbbFsmNHAMtAX2/MbTMaIBQg7IwPQZH7JvSLOZ9lC2Gfigx2oevt/5ESfmFJk9WcM2XJEroC2w5zXdCuidJvbU5/lGLr3drcpg3++/U4v7rmlixxSnFshfSH3AU9C8e6AferOSTe2aPK9XxdjTHrdl9jlaV7WcxxY6m0cNvFq/bbLcMNVFNb6uoV0Dba3q/31tKMGwGlLs1YHK5e8w86Y9Z3UmuBd+/106Jzg5m9+nwjdZrpzkuWSLJ6AtsCN+ay0Lba9fT2l4hTGflMllE/abULe0eHtgIy/OdXKsbSNkJssXJ1upsl7JM9DR8/rYaBBv7vJ5/lWr+fx1wxGKFyTtdQZK8ZwhxJ0/XUeoJmtQaJQtTc85SeoDL+bLZl5AW2DPbzwbIw/b2sPrvr6EunV73Jc6aa9WL2bFzXY2iTBipsvsyVqPJ2/KG+jIym6sB8ld7Vu2bObC+h301Xv/dmPaLOtZtGAvTF+7I+9qqQ9oCd6CUEGAjq5sLZGhdxllL3db8c4qLv/hUCqw6lPudhRkJ/fM2UjwoFx6c2e0JIWmdxeMCgZ09MxW78ujWersRZju90gjF97nRAgp2EuWTUcPzFrB9tNzRXluQ8JnyezDny80zwUF2gJ7buNh+ESLwGe/Gmb0fy1m6gq7M6rQ71ra/p45bAmrvpdLRvkQCU+NXV9UaGYLDrQF9m+WjSJkFOwsW1TYcEJDEwdt3j1W9qp+TTwzr06rx2QBcA1+3/Fy1SQHVwZ5+woUBWgL7IXL92FX8J6sJTOkrY1zr97IgGD8nnpvr1DmT31S0cofFgzGVGW56cz8kcqKK536lb2+bdGAjjFk5i+biTFaYiH9Rf2r13Dpt/vT8980V6uDrdz38y2ERnRdZdGFVBtGGqShTsvgF52KDrS1uhe8Uk3Ydz9IeihrxT/e5cIf9qEqnGkyij4BRRtgu28dD/14B8HRWnAyldQAconUB7TUT7fQ/wPrzdPYPgdMwAAAAABJRU5ErkJggg==',
              },
              duration: 1970,
            },
            osCpu: {
              duration: 0,
            },
            languages: {
              value: [['en'], ['en', 'en-US']],
              duration: 2,
            },
            colorDepth: {
              value: 24,
              duration: 0,
            },
            deviceMemory: {
              value: 4,
              duration: 0,
            },
            screenResolution: {
              value: [732, 412],
              duration: 0,
            },
            hardwareConcurrency: {
              value: 4,
              duration: 0,
            },
            timezone: {
              value: 'UTC',
              duration: 219,
            },
            sessionStorage: {
              value: true,
              duration: 0,
            },
            localStorage: {
              value: true,
              duration: 1,
            },
            indexedDB: {
              value: true,
              duration: 1,
            },
            openDatabase: {
              value: true,
              duration: 0,
            },
            cpuClass: {
              duration: 0,
            },
            platform: {
              value: 'Linux aarch64',
              duration: 0,
            },
            plugins: {
              value: [],
              duration: 3,
            },
            touchSupport: {
              value: {
                maxTouchPoints: 5,
                touchEvent: true,
                touchStart: true,
              },
              duration: 3,
            },
            vendor: {
              value: 'Google Inc.',
              duration: 0,
            },
            vendorFlavors: {
              value: [],
              duration: 1,
            },
            cookiesEnabled: {
              value: true,
              duration: 49,
            },
            colorGamut: {
              value: 'srgb',
              duration: 2,
            },
            invertedColors: {
              duration: 1,
            },
            forcedColors: {
              duration: 0,
            },
            monochrome: {
              value: 0,
              duration: 1,
            },
            contrast: {
              duration: 0,
            },
            reducedMotion: {
              value: false,
              duration: 0,
            },
            reducedTransparency: {
              duration: 0,
            },
            hdr: {
              duration: 0,
            },
            math: {
              value: {
                acos: 1.4473588658278522,
                acosh: 709.889355822726,
                acoshPf: 355.291251501643,
                asin: 0.12343746096704435,
                asinh: 0.881373587019543,
                asinhPf: 0.8813735870195429,
                atanh: 0.5493061443340548,
                atanhPf: 0.5493061443340548,
                atan: 0.4636476090008061,
                sin: 0.8178819121159085,
                sinh: 1.1752011936438014,
                sinhPf: 2.534342107873324,
                cos: -0.8390715290095377,
                cosh: 1.5430806348152437,
                coshPf: 1.5430806348152437,
                tan: -1.4214488238747245,
                tanh: 0.7615941559557649,
                tanhPf: 0.7615941559557649,
                exp: 2.718281828459045,
                expm1: 1.718281828459045,
                expm1Pf: 1.718281828459045,
                log1p: 2.3978952727983707,
                log1pPf: 2.3978952727983707,
                powPI: 1.9275814160560204e-50,
              },
              duration: 4,
            },
            pdfViewerEnabled: {
              duration: 0,
            },
            architecture: {
              value: 127,
              duration: 1,
            },
            applePay: {
              value: -1,
              duration: 0,
            },
            privateClickMeasurement: {
              duration: 5,
            },
            webGlBasics: {
              value: {
                version: 'WebGL 1.0 (OpenGL ES 2.0 Chromium)',
                vendor: 'WebKit',
                vendorUnmasked: 'Google (Apple)',
                renderer: 'WebKit WebGL',
                rendererUnmasked:
                  'Android Emulator OpenGL ES Translator (Apple M1)',
                shadingLanguageVersion:
                  'WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)',
              },
              duration: 1157,
            },
            webGlExtensions: {
              value: {
                contextAttributes: [
                  'alpha=true',
                  'antialias=true',
                  'depth=true',
                  'failIfMajorPerformanceCaveat=false',
                  'powerPreference=default',
                  'premultipliedAlpha=true',
                  'preserveDrawingBuffer=false',
                  'stencil=false',
                ],
                parameters: [
                  'ACTIVE_ATTRIBUTES=35721',
                  'ACTIVE_TEXTURE=34016=33984',
                  'ACTIVE_UNIFORMS=35718',
                  'ALIASED_LINE_WIDTH_RANGE=33902=1,1',
                  'ALIASED_POINT_SIZE_RANGE=33901=1,64',
                  'ALPHA=6406',
                  'ALPHA_BITS=3413=8',
                  'ALWAYS=519',
                  'ARRAY_BUFFER=34962',
                  'ARRAY_BUFFER_BINDING=34964',
                  'ATTACHED_SHADERS=35717',
                  'BACK=1029',
                  'BLEND=3042=false',
                  'BLEND_COLOR=32773=0,0,0,0',
                  'BLEND_DST_ALPHA=32970=0',
                  'BLEND_DST_RGB=32968=0',
                  'BLEND_EQUATION=32777=32774',
                  'BLEND_EQUATION_ALPHA=34877=32774',
                  'BLEND_EQUATION_RGB=32777=32774',
                  'BLEND_SRC_ALPHA=32971=1',
                  'BLEND_SRC_RGB=32969=1',
                  'BLUE_BITS=3412=8',
                  'BOOL=35670',
                  'BOOL_VEC2=35671',
                  'BOOL_VEC3=35672',
                  'BOOL_VEC4=35673',
                  'BROWSER_DEFAULT_WEBGL=37444',
                  'BUFFER_SIZE=34660',
                  'BUFFER_USAGE=34661',
                  'BYTE=5120',
                  'CCW=2305',
                  'CLAMP_TO_EDGE=33071',
                  'COLOR_ATTACHMENT0=36064',
                  'COLOR_BUFFER_BIT=16384',
                  'COLOR_CLEAR_VALUE=3106=0,0,0,0',
                  'COLOR_WRITEMASK=3107=true,true,true,true',
                  'COMPILE_STATUS=35713',
                  'COMPRESSED_TEXTURE_FORMATS=34467=',
                  'CONSTANT_ALPHA=32771',
                  'CONSTANT_COLOR=32769',
                  'CONTEXT_LOST_WEBGL=37442',
                  'CULL_FACE=2884=false',
                  'CULL_FACE_MODE=2885=1029',
                  'CURRENT_PROGRAM=35725',
                  'CURRENT_VERTEX_ATTRIB=34342',
                  'CW=2304',
                  'DECR=7683',
                  'DECR_WRAP=34056',
                  'DELETE_STATUS=35712',
                  'DEPTH_ATTACHMENT=36096',
                  'DEPTH_BITS=3414=24',
                  'DEPTH_BUFFER_BIT=256',
                  'DEPTH_CLEAR_VALUE=2931=1',
                  'DEPTH_COMPONENT16=33189',
                  'DEPTH_COMPONENT=6402',
                  'DEPTH_FUNC=2932=513',
                  'DEPTH_RANGE=2928=0,1',
                  'DEPTH_STENCIL=34041',
                  'DEPTH_STENCIL_ATTACHMENT=33306',
                  'DEPTH_TEST=2929=false',
                  'DEPTH_WRITEMASK=2930=true',
                  'DITHER=3024=true',
                  'DONT_CARE=4352',
                  'DST_ALPHA=772',
                  'DST_COLOR=774',
                  'DYNAMIC_DRAW=35048',
                  'ELEMENT_ARRAY_BUFFER=34963',
                  'ELEMENT_ARRAY_BUFFER_BINDING=34965',
                  'EQUAL=514',
                  'FASTEST=4353',
                  'FLOAT=5126',
                  'FLOAT_MAT2=35674',
                  'FLOAT_MAT3=35675',
                  'FLOAT_MAT4=35676',
                  'FLOAT_VEC2=35664',
                  'FLOAT_VEC3=35665',
                  'FLOAT_VEC4=35666',
                  'FRAGMENT_SHADER=35632',
                  'FRAMEBUFFER=36160',
                  'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME=36049',
                  'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE=36048',
                  'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE=36051',
                  'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL=36050',
                  'FRAMEBUFFER_BINDING=36006',
                  'FRAMEBUFFER_COMPLETE=36053',
                  'FRAMEBUFFER_INCOMPLETE_ATTACHMENT=36054',
                  'FRAMEBUFFER_INCOMPLETE_DIMENSIONS=36057',
                  'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT=36055',
                  'FRAMEBUFFER_UNSUPPORTED=36061',
                  'FRONT=1028',
                  'FRONT_AND_BACK=1032',
                  'FRONT_FACE=2886=2305',
                  'FUNC_ADD=32774',
                  'FUNC_REVERSE_SUBTRACT=32779',
                  'FUNC_SUBTRACT=32778',
                  'GENERATE_MIPMAP_HINT=33170=4352',
                  'GEQUAL=518',
                  'GREATER=516',
                  'GREEN_BITS=3411=8',
                  'HIGH_FLOAT=36338',
                  'HIGH_INT=36341',
                  'IMPLEMENTATION_COLOR_READ_FORMAT=35739=6408',
                  'IMPLEMENTATION_COLOR_READ_TYPE=35738=5121',
                  'INCR=7682',
                  'INCR_WRAP=34055',
                  'INT=5124',
                  'INT_VEC2=35667',
                  'INT_VEC3=35668',
                  'INT_VEC4=35669',
                  'INVALID_ENUM=1280',
                  'INVALID_FRAMEBUFFER_OPERATION=1286',
                  'INVALID_OPERATION=1282',
                  'INVALID_VALUE=1281',
                  'INVERT=5386',
                  'KEEP=7680',
                  'LEQUAL=515',
                  'LESS=513',
                  'LINEAR=9729',
                  'LINEAR_MIPMAP_LINEAR=9987',
                  'LINEAR_MIPMAP_NEAREST=9985',
                  'LINES=1',
                  'LINE_LOOP=2',
                  'LINE_STRIP=3',
                  'LINE_WIDTH=2849=1',
                  'LINK_STATUS=35714',
                  'LOW_FLOAT=36336',
                  'LOW_INT=36339',
                  'LUMINANCE=6409',
                  'LUMINANCE_ALPHA=6410',
                  'MAX_COMBINED_TEXTURE_IMAGE_UNITS=35661=80',
                  'MAX_CUBE_MAP_TEXTURE_SIZE=34076=4096',
                  'MAX_FRAGMENT_UNIFORM_VECTORS=36349=1024',
                  'MAX_RENDERBUFFER_SIZE=34024=16384',
                  'MAX_TEXTURE_IMAGE_UNITS=34930=16',
                  'MAX_TEXTURE_SIZE=3379=4096',
                  'MAX_VARYING_VECTORS=36348=31',
                  'MAX_VERTEX_ATTRIBS=34921=16',
                  'MAX_VERTEX_TEXTURE_IMAGE_UNITS=35660=16',
                  'MAX_VERTEX_UNIFORM_VECTORS=36347=1024',
                  'MAX_VIEWPORT_DIMS=3386=16384,16384',
                  'MEDIUM_FLOAT=36337',
                  'MEDIUM_INT=36340',
                  'MIRRORED_REPEAT=33648',
                  'NEAREST=9728',
                  'NEAREST_MIPMAP_LINEAR=9986',
                  'NEAREST_MIPMAP_NEAREST=9984',
                  'NEVER=512',
                  'NICEST=4354',
                  'NONE=0',
                  'NOTEQUAL=517',
                  'NO_ERROR=0',
                  'ONE=1',
                  'ONE_MINUS_CONSTANT_ALPHA=32772',
                  'ONE_MINUS_CONSTANT_COLOR=32770',
                  'ONE_MINUS_DST_ALPHA=773',
                  'ONE_MINUS_DST_COLOR=775',
                  'ONE_MINUS_SRC_ALPHA=771',
                  'ONE_MINUS_SRC_COLOR=769',
                  'OUT_OF_MEMORY=1285',
                  'PACK_ALIGNMENT=3333=4',
                  'POINTS=0',
                  'POLYGON_OFFSET_FACTOR=32824=0',
                  'POLYGON_OFFSET_FILL=32823=false',
                  'POLYGON_OFFSET_UNITS=10752=0',
                  'RED_BITS=3410=8',
                  'RENDERBUFFER=36161',
                  'RENDERBUFFER_ALPHA_SIZE=36179',
                  'RENDERBUFFER_BINDING=36007',
                  'RENDERBUFFER_BLUE_SIZE=36178',
                  'RENDERBUFFER_DEPTH_SIZE=36180',
                  'RENDERBUFFER_GREEN_SIZE=36177',
                  'RENDERBUFFER_HEIGHT=36163',
                  'RENDERBUFFER_INTERNAL_FORMAT=36164',
                  'RENDERBUFFER_RED_SIZE=36176',
                  'RENDERBUFFER_STENCIL_SIZE=36181',
                  'RENDERBUFFER_WIDTH=36162',
                  'RENDERER=7937=WebKit WebGL',
                  'REPEAT=10497',
                  'REPLACE=7681',
                  'RGB565=36194',
                  'RGB5_A1=32855',
                  'RGB=6407',
                  'RGBA4=32854',
                  'RGBA=6408',
                  'SAMPLER_2D=35678',
                  'SAMPLER_CUBE=35680',
                  'SAMPLES=32937=4',
                  'SAMPLE_ALPHA_TO_COVERAGE=32926',
                  'SAMPLE_BUFFERS=32936=1',
                  'SAMPLE_COVERAGE=32928',
                  'SAMPLE_COVERAGE_INVERT=32939=false',
                  'SAMPLE_COVERAGE_VALUE=32938=1',
                  'SCISSOR_BOX=3088=0,0,300,150',
                  'SCISSOR_TEST=3089=false',
                  'SHADER_TYPE=35663',
                  'SHADING_LANGUAGE_VERSION=35724=WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)',
                  'SHORT=5122',
                  'SRC_ALPHA=770',
                  'SRC_ALPHA_SATURATE=776',
                  'SRC_COLOR=768',
                  'STATIC_DRAW=35044',
                  'STENCIL_ATTACHMENT=36128',
                  'STENCIL_BACK_FAIL=34817=7680',
                  'STENCIL_BACK_FUNC=34816=519',
                  'STENCIL_BACK_PASS_DEPTH_FAIL=34818=7680',
                  'STENCIL_BACK_PASS_DEPTH_PASS=34819=7680',
                  'STENCIL_BACK_REF=36003=0',
                  'STENCIL_BACK_VALUE_MASK=36004=4294967295',
                  'STENCIL_BACK_WRITEMASK=36005=4294967295',
                  'STENCIL_BITS=3415=0',
                  'STENCIL_BUFFER_BIT=1024',
                  'STENCIL_CLEAR_VALUE=2961=0',
                  'STENCIL_FAIL=2964=7680',
                  'STENCIL_FUNC=2962=519',
                  'STENCIL_INDEX8=36168',
                  'STENCIL_PASS_DEPTH_FAIL=2965=7680',
                  'STENCIL_PASS_DEPTH_PASS=2966=7680',
                  'STENCIL_REF=2967=0',
                  'STENCIL_TEST=2960=false',
                  'STENCIL_VALUE_MASK=2963=4294967295',
                  'STENCIL_WRITEMASK=2968=4294967295',
                  'STREAM_DRAW=35040',
                  'SUBPIXEL_BITS=3408=4',
                  'TEXTURE0=33984',
                  'TEXTURE10=33994',
                  'TEXTURE11=33995',
                  'TEXTURE12=33996',
                  'TEXTURE13=33997',
                  'TEXTURE14=33998',
                  'TEXTURE15=33999',
                  'TEXTURE16=34000',
                  'TEXTURE17=34001',
                  'TEXTURE18=34002',
                  'TEXTURE19=34003',
                  'TEXTURE1=33985',
                  'TEXTURE20=34004',
                  'TEXTURE21=34005',
                  'TEXTURE22=34006',
                  'TEXTURE23=34007',
                  'TEXTURE24=34008',
                  'TEXTURE25=34009',
                  'TEXTURE26=34010',
                  'TEXTURE27=34011',
                  'TEXTURE28=34012',
                  'TEXTURE29=34013',
                  'TEXTURE2=33986',
                  'TEXTURE30=34014',
                  'TEXTURE31=34015',
                  'TEXTURE3=33987',
                  'TEXTURE4=33988',
                  'TEXTURE5=33989',
                  'TEXTURE6=33990',
                  'TEXTURE7=33991',
                  'TEXTURE8=33992',
                  'TEXTURE9=33993',
                  'TEXTURE=5890',
                  'TEXTURE_2D=3553',
                  'TEXTURE_BINDING_2D=32873',
                  'TEXTURE_BINDING_CUBE_MAP=34068',
                  'TEXTURE_CUBE_MAP=34067',
                  'TEXTURE_CUBE_MAP_NEGATIVE_X=34070',
                  'TEXTURE_CUBE_MAP_NEGATIVE_Y=34072',
                  'TEXTURE_CUBE_MAP_NEGATIVE_Z=34074',
                  'TEXTURE_CUBE_MAP_POSITIVE_X=34069',
                  'TEXTURE_CUBE_MAP_POSITIVE_Y=34071',
                  'TEXTURE_CUBE_MAP_POSITIVE_Z=34073',
                  'TEXTURE_MAG_FILTER=10240',
                  'TEXTURE_MIN_FILTER=10241',
                  'TEXTURE_WRAP_S=10242',
                  'TEXTURE_WRAP_T=10243',
                  'TRIANGLES=4',
                  'TRIANGLE_FAN=6',
                  'TRIANGLE_STRIP=5',
                  'UNPACK_ALIGNMENT=3317=4',
                  'UNPACK_COLORSPACE_CONVERSION_WEBGL=37443=37444',
                  'UNPACK_FLIP_Y_WEBGL=37440=false',
                  'UNPACK_PREMULTIPLY_ALPHA_WEBGL=37441=false',
                  'UNSIGNED_BYTE=5121',
                  'UNSIGNED_INT=5125',
                  'UNSIGNED_SHORT=5123',
                  'UNSIGNED_SHORT_4_4_4_4=32819',
                  'UNSIGNED_SHORT_5_5_5_1=32820',
                  'UNSIGNED_SHORT_5_6_5=33635',
                  'VALIDATE_STATUS=35715',
                  'VENDOR=7936=WebKit',
                  'VERSION=7938=WebGL 1.0 (OpenGL ES 2.0 Chromium)',
                  'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING=34975',
                  'VERTEX_ATTRIB_ARRAY_ENABLED=34338',
                  'VERTEX_ATTRIB_ARRAY_NORMALIZED=34922',
                  'VERTEX_ATTRIB_ARRAY_POINTER=34373',
                  'VERTEX_ATTRIB_ARRAY_SIZE=34339',
                  'VERTEX_ATTRIB_ARRAY_STRIDE=34340',
                  'VERTEX_ATTRIB_ARRAY_TYPE=34341',
                  'VERTEX_SHADER=35633',
                  'VIEWPORT=2978=0,0,300,150',
                  'ZERO=0',
                ],
                shaderPrecisions: [
                  'FRAGMENT_SHADER.LOW_FLOAT=127,127,23',
                  'FRAGMENT_SHADER.MEDIUM_FLOAT=127,127,23',
                  'FRAGMENT_SHADER.HIGH_FLOAT=127,127,23',
                  'FRAGMENT_SHADER.LOW_INT=31,30,0',
                  'FRAGMENT_SHADER.MEDIUM_INT=31,30,0',
                  'FRAGMENT_SHADER.HIGH_INT=31,30,0',
                  'VERTEX_SHADER.LOW_FLOAT=127,127,23',
                  'VERTEX_SHADER.MEDIUM_FLOAT=127,127,23',
                  'VERTEX_SHADER.HIGH_FLOAT=127,127,23',
                  'VERTEX_SHADER.LOW_INT=31,30,0',
                  'VERTEX_SHADER.MEDIUM_INT=31,30,0',
                  'VERTEX_SHADER.HIGH_INT=31,30,0',
                ],
                extensions: [
                  'ANGLE_instanced_arrays',
                  'EXT_blend_minmax',
                  'OES_element_index_uint',
                  'OES_fbo_render_mipmap',
                  'OES_standard_derivatives',
                  'OES_texture_float',
                  'OES_texture_float_linear',
                  'OES_vertex_array_object',
                  'WEBGL_color_buffer_float',
                  'WEBGL_compressed_texture_astc',
                  'WEBGL_compressed_texture_etc',
                  'WEBGL_compressed_texture_etc1',
                  'WEBGL_debug_renderer_info',
                  'WEBGL_debug_shaders',
                  'WEBGL_depth_texture',
                  'WEBKIT_WEBGL_depth_texture',
                  'WEBGL_lose_context',
                  'WEBKIT_WEBGL_lose_context',
                ],
                extensionParameters: [
                  'COMPRESSED_R11_EAC=37488',
                  'COMPRESSED_RG11_EAC=37490',
                  'COMPRESSED_RGB8_ETC2=37492',
                  'COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2=37494',
                  'COMPRESSED_RGBA8_ETC2_EAC=37496',
                  'COMPRESSED_RGBA_ASTC_10x10_KHR=37819',
                  'COMPRESSED_RGBA_ASTC_10x5_KHR=37816',
                  'COMPRESSED_RGBA_ASTC_10x6_KHR=37817',
                  'COMPRESSED_RGBA_ASTC_10x8_KHR=37818',
                  'COMPRESSED_RGBA_ASTC_12x10_KHR=37820',
                  'COMPRESSED_RGBA_ASTC_12x12_KHR=37821',
                  'COMPRESSED_RGBA_ASTC_4x4_KHR=37808',
                  'COMPRESSED_RGBA_ASTC_5x4_KHR=37809',
                  'COMPRESSED_RGBA_ASTC_5x5_KHR=37810',
                  'COMPRESSED_RGBA_ASTC_6x5_KHR=37811',
                  'COMPRESSED_RGBA_ASTC_6x6_KHR=37812',
                  'COMPRESSED_RGBA_ASTC_8x5_KHR=37813',
                  'COMPRESSED_RGBA_ASTC_8x6_KHR=37814',
                  'COMPRESSED_RGBA_ASTC_8x8_KHR=37815',
                  'COMPRESSED_RGB_ETC1_WEBGL=36196',
                  'COMPRESSED_SIGNED_R11_EAC=37489',
                  'COMPRESSED_SIGNED_RG11_EAC=37491',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR=37851',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR=37848',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR=37849',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR=37850',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR=37852',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR=37853',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR=37840',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR=37841',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR=37842',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR=37843',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR=37844',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR=37845',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR=37846',
                  'COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR=37847',
                  'COMPRESSED_SRGB8_ALPHA8_ETC2_EAC=37497',
                  'COMPRESSED_SRGB8_ETC2=37493',
                  'COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2=37495',
                  'FRAGMENT_SHADER_DERIVATIVE_HINT_OES=35723=4352',
                  'MAX_EXT=32776',
                  'MIN_EXT=32775',
                  'UNMASKED_RENDERER_WEBGL=37446',
                  'UNMASKED_VENDOR_WEBGL=37445',
                  'UNSIGNED_INT_24_8_WEBGL=34042',
                  'UNSIGNED_INT_24_8_WEBGL=34042',
                  'VERTEX_ARRAY_BINDING_OES=34229=null',
                  'VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE=35070',
                ],
              },
              duration: 250,
            },
          },
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            resolve(data);
          });
        } else {
          resolve(response.status);
        }
      })
      .catch((error) => reject(error));
  });
};

const isiEnergy = (token) => {
  return new Promise((resolve, reject) => {
    fetch('https://api.hamsterkombat.io/clicker/buy-boost', {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 11; Galaxy S7 Build/RQ1A.210105.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.120 Mobile Safari/537.36',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
        authorization:
          'Bearer 1716549446676Kiprw2h8lso6tPI06AiIPFsmUMwA6NRU7kYXODmxATrnqbvtjBPqkazLl9Fz0Oa4294362208',
        Origin: 'https://hamsterkombat.io',
        'X-Requested-With': 'org.telegram.messenger',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        Referer: 'https://hamsterkombat.io/clicker/boost',
        'Accept-Language': 'en,en-US;q=0.9',
      },
      body: JSON.stringify({
        boostId: 'BoostFullAvailableTaps',
        timestamp: new Date().getTime() - 10000,
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          resolve(data);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

async function getAvailableUpgrades(token) {
  const url = 'https://api.hamsterkombat.io/clicker/upgrades-for-buy';
  const headers = getHeaders(token);
  // console.log(headers);
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
  });

  if (response.ok) {
    console.log(
      `[ ${new Date().toLocaleString()} ] Berhasil mendapatkan list upgrade.`
    );
    const data = await response.json();
    return data.upgradesForBuy;
  } else {
    console.log(
      `[ ${new Date().toLocaleString()} ] Gagal mendapatkan daftar upgrade: ${
        response.status
      }`
    );
    return [];
  }
}

async function buyUpgrade(token, upgradeId, upgradeName) {
  const url = 'https://api.hamsterkombat.io/clicker/buy-upgrade';
  const headers = getHeaders(token);
  const data = JSON.stringify({
    upgradeId: upgradeId,
    timestamp: Math.floor(Date.now() / 1000),
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: data,
  });

  if (response.ok) {
    console.log(
      `[ ${new Date().toLocaleString()} ] Upgrade ${upgradeName} berhasil dibeli.`
    );
  } else {
    const errorResponse = await response.json();
    if (errorResponse.error_code === 'INSUFFICIENT_FUNDS') {
      console.log(
        `[ ${new Date().toLocaleString()} ] Coin tidak cukup wkwkw :V`
      );
      return 'insufficient_funds';
    } else {
      console.log(
        `[ ${new Date().toLocaleString()} ] Failed upgrade ${upgradeName}: ${JSON.stringify(
          errorResponse
        )}`
      );
    }
  }
}

async function autoUpgradePassiveEarn(token) {
  return new Promise(async (resolve) => {
    const upgrades = await getAvailableUpgrades(token);
    if (!upgrades || upgrades.length === 0) {
      console.log(
        `[ ${new Date().toLocaleString()} ] Tidak ada upgrade yang tersedia atau gagal mendapatkan daftar upgrade.`
      );
      resolve();
    }
    for (let upgrade of upgrades) {
      if (upgrade.isAvailable && !upgrade.isExpired) {
        console.log(
          `[ ${new Date().toLocaleString()} ] ${upgrade.name} | Harga: ${
            upgrade.price
          } | Profit: ${upgrade.profitPerHour} / Jam `
        );
        console.log(
          `[ ${new Date().toLocaleString()} ] Upgrading ${upgrade.name}`
        );
        const result = await buyUpgrade(token, upgrade.id, upgrade.name).catch(
          (err) => err
        );
        if (result === 'insufficient_funds') {
          console.log(
            `[ ${new Date().toLocaleString()} ] Beralih ke akun selanjutnya\n\n`
          );
          return;
        }
      }
    }
    resolve();
  });
}

function getHeaders(token) {
  return {
    Accept: '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    Authorization: `Bearer ${token}`,
    Connection: 'keep-alive',
    Origin: 'https://hamsterkombat.io',
    Referer: 'https://hamsterkombat.io/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
  };
}

const main = async () => {
  console.clear();
  const hashlist = fs.readFileSync('hash.txt', 'utf8').split('\n');
  console.log(
    `[ ${new Date().toLocaleString()} ] Total ${hashlist.length} hash found.`
  );
  while (true) {
    for (let i = 0; i < hashlist.length; i++) {
      console.log(
        `\n[ ${new Date().toLocaleString()} ] Starting to login with hash ${
          i + 1
        }...`
      );
      const hash = hashlist[i].trim();
      const loginres = await login(hash).catch((err) => err);
      // console.log(loginres);
      // return;
      if (loginres?.authToken) {
        console.log(
          `[ ${new Date().toLocaleString()} ] Login berhasil, proses tembak...`
        );
        const claimDailyres = await claimDaily(loginres?.authToken).catch(
          (err) => err
        );
        console.log(
          `[ ${new Date().toLocaleString()} ] Claim Daily: ${
            claimDailyres?.task?.days
          } Days`
        );

        while (true) {
          try {
            const result = await tembak(loginres?.authToken).catch(
              (err) => err
            );
            // console.log(result);

            if (result?.clickerUser?.availableTaps <= 0) {
              console.log(`[ ${new Date().toLocaleString()} ] Taps habis!`);
              const isiEnergyres = await isiEnergy(loginres?.authToken).catch(
                (err) => err
              );
              if (isiEnergyres?.clickerUser?.availableTaps > 0) {
                console.log(
                  `[ ${new Date().toLocaleString()} ] Berhasil isi energy!`
                );
                continue;
              }
              break;
            }
            if (result?.clickerUser) {
              console.log(
                `[ ${new Date().toLocaleString()} ] Berhasil tembak, Coin: ${
                  result?.clickerUser?.balanceCoins
                } | Taps: ${result?.clickerUser?.availableTaps}`
              );
            } else {
              console.log(`[ ${new Date().toLocaleString()} ] Gagal tembak!`);
            }
            await new Promise((resolve) => setTimeout(resolve, 3000));
          } catch (e) {
            console.log(e);
            break;
          }
        }
        try {
          await autoUpgradePassiveEarn(loginres?.authToken).catch((err) => err);
        } catch (e) {
          console.log(`[ ${new Date().toLocaleString()} ] Terjadi kesalahan`);
        }
      } else {
        console.log(`[ ${new Date().toLocaleString()} ] Terjadi kesalahan`);
      }
    }
    console.log(
      `\n[ ${new Date().toLocaleString()} ] All done, delay 10 menit!...`
    );
    await new Promise((resolve) => setTimeout(resolve, 60000 * 10));
  }
};

main();
