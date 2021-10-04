const http = require('http')
const url = require('url')
const port = 80
const sites = {
  "starsbattle.co": 5000,
  "admin.starsbattle.co": 3000,
  "api.starsbattle.co": 7000,
}

const proxy = http.createServer( (req, res) => {
  const { pathname:path } = url.parse(req.url)
  const { method, headers } = req
  const hostname = headers.host.split(':')[0].replace('www.', '')
  const localhost = "127.0.0.1";
  if (!sites.hasOwnProperty(hostname)) throw new Error(`invalid hostname ${hostname}`)

  const proxiedRequest = http.request({
    localhost,
    path,
    port: sites[hostname],
    method,
    headers 
  })

  proxiedRequest.on('response', remoteRes => {
    res.writeHead(remoteRes.statusCode, remoteRes.headers)  
    remoteRes.pipe(res)
  })
  proxiedRequest.on('error', () => {
    res.writeHead(500)
    res.end()
  })

  req.pipe(proxiedRequest)
})

proxy.listen(port, () => {
  console.log(`reverse proxy listening on port ${port}`)
})