const {MongoClient} = require('mongodb');
const uri='mongodb+srv://admin:Khang123@demo.xytevri.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const cluster = 'demo';
let dbConnection;

module.exports = {
    connectToServer: function(callback){
        client.connect((err,db)=>{
            if(err || !db) {
                return callback(err);
            }
            dbConnection = db.db(cluster);
            console.log(`succesfully connecting to cluster : ${cluster}`);
            return callback();
        });
    },
    getDb: function(){
        return dbConnection;
    },
};