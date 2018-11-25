const fs = require('fs');

let  gethtml = (pathStr) =>{

    let htmlObj = {
        actionType:false,
        dataStr:"",
        errorMsg:""
    };
    if(fs.existsSync(pathStr)){
        var data = fs.readFileSync(pathStr, 'utf8');
        if(data!=""){
            htmlObj.actionType=true;
            htmlObj.dataStr=data.toString();
        }
    }else{
        htmlObj.errorMsg="file not exist.";
    }

    return htmlObj;
} 

let source={
    gethtml:gethtml
}

module.exports = source;