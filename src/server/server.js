const express = require('express');
const musicAPI = require('music-api');
const app = express();
const lyric = require('./lyric.js');
// 允许跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 搜索歌曲
app.get('/search/song', function (req, res) {
    let _source = req.query.source;
    let _key = req.query.key;
    let _page = req.query.page;
    // 本地服务器发起真正的请求
    musicAPI.searchSong(_source, {
        key: _key,
        limit: 10,
        page: _page
    }).then(_res => {
        res.send(_res);
        console.log('search song');
    }).catch(err => {
        res.send(err);
        console.log(err);
    });
});
// 根据歌曲id获得歌曲
app.get('/get/song', function (req, res) {
    let _source = req.query.source;
    let _id = req.query.id;

    // 本地服务器发起真正的请求
    musicAPI.getSong(_source, {
        id: _id,
        raw: false
    }).then(_res => {
        res.send(_res);
        console.log('get song');
    }).catch(err => {
        res.send(err);
        console.log(err);
    });
});
// 呈现首页歌单
app.get('/suggest', function (req, res) {
    musicAPI.getSuggestSongs('all', {
        limit: 10,
        raw: false
    }).then(_res => {
        res.send(_res);
        console.log('suggest songs');
    }).catch(err => {
        res.send(err);
        console.log(err);
    });
});
// 获取歌词
app.get('/get/lyric', function (req, res) {
    // 歌曲名
    let title = req.query.title;
    // 歌手名
    let artists = req.query.artists;
    // 向网易云发起真正的请求
    lyric.lyrics(title, artists).then(_res => {
        res.send(_res);
        console.log('get lyric');
    }).catch(err => {
        res.send(err);
        console.log(err);
    })
});
app.listen(8081, function () {
    console.log('all music app listening on port 8081');
})
