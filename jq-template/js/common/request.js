var baseUrl = _g.env == 0 ? '' : ''

function request(config = {}) {
  return $.ajax({
    ...config,
    method: config.method || 'GET',
    url: baseUrl + config.url || '',
    timeout: config.timeout || 10000,
    data: config.data || {},
    headers: config.headers || {}
  })
}
function get(url, data) {
  return request({
    url,
    data
  })
}
function post(url, data) {
  return request({
    url,
    method: 'POST',
    data
  })
}

// 业务接口

// 初始化
function init() {
  return request({
    method: 'POST',
    url: 'Common/init.aspx',
    dataType: 'json',
  })
}