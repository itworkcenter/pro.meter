var fs = require('fs');

module.exports={
    getJson: function(path){
        try{
            return fs.readFileSync(path, "utf-8",function(err, data){
                return JSON.parse(data);
            });
        }catch(e){
            return e;
        }

    }

}
