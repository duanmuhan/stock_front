var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/statics', function(req, res, next) {
  res.render('pages/charts/statics', { title: '统计数据' });
});

router.get('/forms', function(req, res, next) {
  res.render('pages/forms/form_page', { title: '基本信息' });
});

router.get('/news', function(req, res, next) {
  res.render('pages/ui-features/news', { title: '公告新闻' });
});

module.exports = router;
