const fs = require("fs");

let IsNothasArribute =(count,tagname,attrname) => {
    return count>= 1 ?  `There are ${count} <${tagname}> without ${attrname} attribute.` : `The <${tagname}> tag ${attrname} attribute is pass.`; 
}

let IsNotExistTag=(IsExist,tagname) => {
    return IsExist ?  `This HTML have <${tagname}> tag.` :`This HTML haven't <${tagname}> tag.`;
}

let IsExistMoreThanOneTag=(IsMoreThan,tagname,count=1) => {
    return IsMoreThan ?  `This HTML have more than ${count} <${tagname}> tag.` :`This HTML haven't more than ${count} <${tagname}> tag.`;
}

let IsheadContentCheck= (checkoobj={title: false,meta_keyword: false,meta_descript:false}) =>{

    let titlelog="", descriptionslog="", keywordslog="";
    titlelog = checkoobj.title ?  `This head have <title> tag.` :`This head haven't <title> tag.`;
    descriptionslog=checkoobj.meta_descript ?  `This head have <meta name='description'> tag.` :`This head haven't <meta name='description'> tag.`;
    keywordslog = checkoobj.meta_keyword ?  `This head have <meta name='keyword'> tag.` :`This head haven't <meta name='keyword'> tag.`;

    return `${titlelog}${descriptionslog}${keywordslog}`;
}
let IsExistExtendChecklog = ( IsExist,tagname,attributekey,attrvalue) =>{

    let wordOfIsExist = IsExist? `This HTML have ${tagname} tag`:`This HTML haven't ${tagname} tag`;
    let wordOfattribute = attributekey!="" ? `attribute key=${attributekey}` : '';
    let wordOfvalue = attrvalue!="" ? `value=${attrvalue}` : '';

    return `${wordOfIsExist} ${wordOfattribute} ${wordOfvalue}`.trim()+".";
}

let savelog = (filepath,filename,filecontnt,saveType,callback=undefined)=>{
    if (saveType==0){
        fs.writeFile(filepath+"/"+filename, filecontnt, function(err) {
            if(err) {
                console.log(err);
            } else {
                if  (callback!=undefined && typeof(callback)=="function"){
                    callback();
                }
            }
        });
    }else if( saveType==1){
        var ws = fs.createWriteStream(filepath+"/"+filename);

        ws.on("close",function () {
            if  (callback!=undefined && typeof(callback)=="function"){
                callback();
            }
        });
        ws.write(filecontnt);
        ws.end();
        
    }else{
        console.log(filecontnt);
    }
}

let report ={
    IsNothasArribute:IsNothasArribute,
    IsNotExistTag:IsNotExistTag,
    IsExistMoreThanOneTag:IsExistMoreThanOneTag,
    IsheadContentCheck:IsheadContentCheck,
    IsExistExtendChecklog:IsExistExtendChecklog,
    savelog:savelog
};

module.exports= report;