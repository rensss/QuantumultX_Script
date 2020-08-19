
var key = 'W7iPIl1f4VlMd1S0'
var apiKey = 'S45Fnpxcwyq0QT4b'
var forecast = 'forecast.json'
var realtime = 'realtime.json'
var weather = 'weather.json'
var locations = '116.2442,40.0134'

init()

function init() {
    getWeather(weather)
    // getWeather(realtime)
}

function getWeather(requestType) {
    var initUrl = {
        url: "https://api.caiyunapp.com/v2.5/" + apiKey + "/" + locations + "/" + requestType + "?lang=zh_CN",
        headers: {
            "Content-Type": "application/json",
        }
    }
    // console.log(initUrl)

    get(initUrl, function(error, response, data) {
        if (error) {
            console.log(error)
            $notify("获取失败", "原因---->", error)
        } else {
            const cc = JSON.parse(data)
            // console.log(cc)
            // console.log("\n----   ")
            // console.log("\n    ----")
            // console.log(data)
            // console.log("\n  ----  ")
            // var message = cc.result.hourly.description  + "\n" + cc.result.forecast_keypoint
            // console.log('------')
            // console.log(message)
            $notify(cc.result.hourly.description, cc.result.forecast_keypoint, "")
        }
    })
}

function get(options, callback) {
    if (typeof options == String) options = {
        url: options
    }
    options["method"] = "GET"
    $task.fetch(options).then(response => {
        callback(null, adapterStatus(response), response.body)
    }), reason => callback(reason.error, null, null)
}

const adapterStatus = (response) => {
    if (response) {
        if (response.status) {
            response["statusCode"] = response.status
        } else if (response.statusCode) {
            response["status"] = response.statusCode
        }
    }
    return response
}


