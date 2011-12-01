
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '郵便番号から住所を取得するProgram' })
};
