const RestProxy = require('sp-rest-proxy');

const settings = {
  port: 8081,
  headers: {
    Connection: 'keep-alive',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
    accept: 'application/json; odata=verbose',
    'x-clientservice-clienttag': 'PnPCoreJS:2.0.13:ls.getById',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    'content-type': 'application/json;odata=verbose',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    Referer: 'https://sa-toniguy01.metroapps.online/',
    'Accept-Language': 'ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7,da;q=0.6',
    Cookie: `stsSyncAppName=0; stsSyncIconPath=0; WSS_FullScreenMode=false; Ribbon.Read=1792905|-1|0|705116875; Ribbon.Library=1792905|-1|180|705116875; copyToClipBoardCookie=https%3A//sa-toniguy01.metroapps.online%7C%7C%7BE9D37BBC-20F5-483E-8A19-F5D8106447C2%7D%7C%7CMove%7C%7C2632%7C2633%7C2634%7C; Ribbon.ListForm.Display=1792905|-1|1433|307598459; Ribbon.Document=1792848|-1|309|705116875; FedAuth=77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48U1A+MDUudHxhdXRoMHx5ZWdvci5ndXNha292Ljk4QGdtYWlsLmNvbSwwNS50fGF1dGgwfHllZ29yLmd1c2Frb3YuOThAZ21haWwuY29tLDEzMjUzNzA5MDcyMjUwNjc1NixUcnVlLGFtZ0ZPMm1tc2svbUxzTlMyV1VhSTVxLzJ0YW8wQ3BXdCtCM0JIUEM4WVpmRU1JZ1RlM0NiallTMjhUQi9zN0FlTWlIby84dVpnanRoRm5qK1RVK0oxSHduWlE0TmkraVFxVllmZlR3WmdacjgwQmRlVTBab3oveFd4cmVjaDJGRTNrM05sRnBzQ1ZBSlY2U0dNOVZXM0ZUTlBzelQwOW9BcU5hdDA5MTN1TG9zd09FL3pDNEZRN1dqaGFBajQ2U1YwVE9FdDFtM3dJMGxaSHpzRTkzbC9tQVJLZ3lYSjZMbDBpNTRkaEd6WXVoWjRRMThUZkhJVEtvK25JcWE5dTdQbGoxUWlvSTlwYW1aT3QyOTBpS0FQTFNCeDNlcVZlRkpKdk5wT2Yvb0NkbjlqNkZuYWtHUzlrQW94WU52aVFaaUJZc0plbEptbWdXaUhyQTNCckZGZz09LGh0dHBzOi8vc2EtdG9uaWd1eTAxLm1ldHJvYXBwcy5vbmxpbmUvPC9TUD4`,
  },
};

const restProxy = new RestProxy(settings);
restProxy.serve();
