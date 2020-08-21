// const { resolve } = require("path");

// key
var key = 'W7iPIl1f4VlMd1S0';
var apiKey = 'S45Fnpxcwyq0QT4b';

// 请求类型
// var forecast = 'forecast.json';
var realtime = 'realtime.json';
var weather = 'weather.json';

var results = [];

// 位置坐标
var locations = { 
    'company': '116.2442,40.0134',
    'home': '116.2316,40.0507'
}

async function init() {
    await Promise.all([
        await getWeather(weather, locations['company']),
        await getWeather(weather, locations['home']),
        await getWeather(realtime, locations['company']),
        await getWeather(realtime, locations['home']),
    ])
    await notify();
}

function getWeather(requestType, location) {
    return new Promise( resolve => {
        var initUrl = {
            url: "https://api.caiyunapp.com/v2.5/" + apiKey + "/" + location + "/" + requestType + "?lang=zh_CN",
            headers: {
                "Content-Type": "application/json",
            }
        }
    
        console.log(initUrl)
    
        get(initUrl, function(error, response, data) {
            if (error) {
                console.log(error);
                $notify("获取失败", "原因---->", error);
            } else {
                const cc = JSON.parse(data);
                results.push(cc);
                // console.log("\n  ----  ")
                // var message = cc.result.hourly.description  + "\n" + cc.result.forecast_keypoint
                // $notify(cc.result.hourly.description, cc.result.forecast_keypoint, "")
            }
            resolve();
        })
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

function adapterStatus(response) {
    if (response) {
        if (response.status) {
            response["statusCode"] = response.status
        } else if (response.statusCode) {
            response["status"] = response.statusCode
        }
    }
    return response
}

function notify() {
    console.log("\n---------");
    console.log(results);
    console.log("---------\n");
}

init();
