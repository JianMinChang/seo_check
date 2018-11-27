const fs = require('fs');


let gethtml =  (pathStr,readType=0) =>{
    let htmlObj = {
        actionType:false,
        dataStr:"",
        errorMsg:""
    };
    if(!fs.existsSync(pathStr)){
        htmlObj.errorMsg="file not exist.";
        return Promise.resolve(htmlObj);
    }

    if(readType==0){
        let data = fs.readFileSync(pathStr, 'utf8');
        if(data!=""){
            htmlObj.actionType=true;
            htmlObj.dataStr=data.toString();
        }
        return Promise.resolve(htmlObj);
    }else{

        return new Promise(function(resolve){

            var myReadStream = fs.createReadStream(pathStr, 'utf-8');
            let filestring="";
            myReadStream.on("close",function () {

                htmlObj.actionType=true;
                htmlObj.dataStr=filestring;
                resolve(htmlObj);
            });
            myReadStream.on('error', function(err) { 
                htmlObj.actionType=false;
                htmlObj.errorMsg="file not exist.";
                resolve(htmlObj);
            });
            
            myReadStream.on("data",function (data) {
                filestring+=data;
            });
        });
    }


   
} 

let source={
    gethtml:gethtml
}

module.exports = source;