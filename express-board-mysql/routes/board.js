var express = require('express');
var router = express.Router();

// MySql 로드
var mysql = require('mysql');
var db_pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

router.get('/', function(req, res) {
  res.redirect('/list');
});

var total_rows = 0;  // 총 개시물 수
var total_page = 0;  // 총 페이지 수
var limit_rows = 6;  // 한 페이지에 보여지는 게시물 수
var skip_size = 0;   // skip되는 게시물 수
var current_page = 1;  // 현재 페이지

router.get('/list', function(req, res) {
  db_pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {conn.release();}
      console.log('DB conn error\n' + err);
      return res.render('list', {title: 'list_fail(error)', data: '', total_page: ''});
    }

    var count_query = 'SELECT count(*) as numrows FROM board';
    conn.query(count_query, function(err, result) {
      if (err) {
        conn.release();
        console.log('SELECT numrows error : \n' + err);
        return res.render('list', {title: 'list_fail(error)', data: '', total_page: ''});
      }

      total_rows = result[0]['numrows'];
      total_page = Math.ceil(total_rows / limit_rows);

      if (typeof req.query.page !== 'undefined') {
        current_page = req.query.page;
        skip_size = 0;
      }

      if (current_page > 1 ) {
        skip_size = (current_page - 1) * limit_rows;
      }

      var limit_query = 'SELECT * FROM board ORDER BY created_at DESC LIMIT ?, ?';
      conn.query(limit_query, [skip_size, limit_rows], function(err, result) {
        if (err) {
          conn.release();
          console.log('SELECT limit error : \n' + err);
          return res.render('list', {title: 'list_fail(error)', data: '', total_page: ''});
        }
        conn.release();
        return res.render('list', {title: 'list', data: result, total_page: total_page});
      });
    });
  });
});

router.get('/read', function(req, res) {
  db_pool.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      console.log('DB conn error\n' + err);
      return res.render('read', {title: 'read_fail(error)', data: '', total_page: ''});
    }

    var idx = req.params.idx;
    var read_query = 'SELECT idx, title, content, created_at FROM board WHERE idx=?';
    conn.query(read_query, [idx], function(err, result) {
      if (err) {
        conn.release();
        console.log('board DB SELECT error : \n' + err);
        return res.render('read', {title: 'read_fail(error)', data: ''});
      }

      conn.release();
      return res.render('read', {title: 'read', data: result[0]});
    });

  });
});

router.get('/search', function(req, res) {

  var searcy_type = req.query.search_type;
  var search_text = req.query.search_text;
  var search_query = '';

  db_pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {conn.release();}
      console.log('DB conn error\n' + err);
      return res.render('list', {title: 'search_fail(error)', data: '', total_page: ''});
    }

    switch (searcy_type) {
      case 'title':
        search_query = 'SELECT * FROM board WHERE title LIKE"%' + search_text + '%"';
        break;

      case 'content':
        search_query = 'SELECT * FROM board WHERE content LIKE"%' + search_text + '%"';
        break;

      case 'title_content':
        search_query = 'SELECT * FROM board WHERE title LIKE"%' + search_text + '%" OR content LIKE"%' + search_text + '%"';
        break;

      default:
        search_query = 'SELECT * FROM board WHERE title LIKE"%' + search_text + '%"';
    }

    conn.query(search_query, function(err, result) {
      if (err) {
        conn.release();
        console.log('SELECT search error : \n' + err);
        return res.render('list', {title: 'search_fail(error)', data: '', total_page: ''});
      }

      total_rows = result.length;
      total_page = Math.ceil(total_rows / limit_rows);

      conn.release();
      return res.render('list', {title: 'list', data: result, total_page: total_page});
    });
  });
});


module.exports = router;
