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
function get(config = {}) {
  return request({
    ...config,
    url: config.url || '',
    data: config.data || {}
  })
}
function post(config = {}) {
  return request({
    ...config,
    url: config.url || '',
    method: 'POST',
    data: config.data || {}
  })
}

// 业务接口

// 初始化
function init() {
  return post({
    url: 'Common/init.aspx',
    dataType: 'json',
  })
}

function form() {
  return post({
    url: 'Common/form.aspx',
    dataType: 'json'
  })
}