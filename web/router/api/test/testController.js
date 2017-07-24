module.exports = (req, res) => {
  var printVal = req.method+' '+req.route.path+' '+req.headers.authorization
  res.status(200).json({ "testkey":printVal });
};
