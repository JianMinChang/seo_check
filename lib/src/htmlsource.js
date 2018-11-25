const fs = require('fs');

let  gethtml = (pathStr) =>{

    let htmlObj = {
        actionType:false,
        dataStr:"",
        errorMsg:""
    };

    var data = fs.readFileSync(pathStr, 'utf8');
    if(data!=""){
        htmlObj.actionType=true;
        htmlObj.dataStr=data.toString();
    }
    

    return htmlObj;
    
} 

let source={
    gethtml:gethtml
}


module.exports = source;