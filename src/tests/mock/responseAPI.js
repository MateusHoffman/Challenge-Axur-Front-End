const mockResFetchIdTermLinux = {
  "data": {
      "id": "Qxj7cgn7"
  },
  "status": 200,
  "statusText": "OK",
  "headers": {
      "content-type": "application/json"
  },
  "config": {
      "transitional": {
          "silentJSONParsing": true,
          "forcedJSONParsing": true,
          "clarifyTimeoutError": false
      },
      "transformRequest": [
          null
      ],
      "transformResponse": [
          null
      ],
      "timeout": 0,
      "xsrfCookieName": "XSRF-TOKEN",
      "xsrfHeaderName": "X-XSRF-TOKEN",
      "maxContentLength": -1,
      "maxBodyLength": -1,
      "env": {},
      "headers": {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json"
      },
      "method": "post",
      "url": "http://testapp.axreng.com:3000/crawl",
      "data": "{\"keyword\":\"linux\"}"
  },
  "request": {}
}

export {
    mockResFetchIdTermLinux,
}