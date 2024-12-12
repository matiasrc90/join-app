module.exports = {
  mongodbLink: `mongodb+srv://${process.env.MDB_CLUSTER}:${process.env.MDB_PASS}@appjoin.sqbhk.mongodb.net/${process.env.MDB_DB}?retryWrites=true&w=majority&appName=AppJoin`,
};


