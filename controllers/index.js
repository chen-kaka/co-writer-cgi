module.exports = router => {
  router.get('/', function *() {
    this.rspData = "welcome to co-writer-cgi.";
  });
}
