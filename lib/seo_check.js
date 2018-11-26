const check=require("./src/check.js");
const report=require("./src/report.js");
const htmlsource=require("./src/htmlsource.js");
const cheerio = require('cheerio');



let settingObj={
    maxStrongTagCount:15,
}
let $="";
let result ={};


var seo_check= module.exports = class seo_check {
        constructor(setting) {
            if (setting!=undefined && setting.maxStrongTagCount>0){
                settingObj.maxStrongTagCount=setting.maxStrongTagCount;
            }
        }

        loadFile(pathstr){
            let fileobj = htmlsource.gethtml(pathstr);
            if(!fileobj.actionType){
                throw fileobj.errorMsg;
            }else{
                $=cheerio.load(fileobj.dataStr);
            }
            return this;
        }

        checkimg(){
            result.imgCount =check.checkimg($);
            return  this;
        }
        checka(){
            result.aCount =check.checka($);
            return  this;
        };

        checkh1(){
            result.h1Count =check.checkh1($);
            return  this;
        }

        checkhead(){
            result.headCount=check.checkhead($);
            return this;
        }
        checkstrong(){
            result.strongCount=check.checkstrong($);
            return this;
        }
        

        static ExtendRule(rule){

            let checkObj = (obj)=>{
                return ( obj.ruleName!=null && obj.ruleName!="undefined" &&  obj.ruleName!="",obj.tagname!=null && obj.tagname!="undefined" &&  obj.tagname!="");
            }
            if (rule!= "undefined" && typeof(rule)=="object") {
                if(checkObj(rule)){
                    let name= (rule.attrname!=null && rule.attrname!="undefined" &&  rule.attrname!="") ?  rule.attrname : "";
                    let value= (rule.attrvalue!=null && rule.attrvalue!="undefined" &&  rule.attrvalue!="") ?  rule.attrvalue : "";
                    
                    this.prototype[rule.ruleName] = function() {
                        let tmpobj={};
                        tmpobj.result=check.checkExtend($,rule.tagname,name,value);
                        tmpobj.tagname=rule.tagname;
                        tmpobj.attrname=name;
                        tmpobj.attrvalue=value;
                        result[rule.ruleName] = tmpobj;
                        return this;
                    }
                }else{
                    throw (new Error("fails check rule obj"));
                }
            }else{
                throw (new Error('Please set rule.'));
            }
        }

        GenerateReport(savepath,filename){
            let logstring="";
            console.log(result);
            if(result["imgCount"]!="undefined") logstring+=report.IsNothasArribute(result["imgCount"],"img","alt");
            if(result["aCount"]!="undefined")  logstring+=report.IsNothasArribute(result["aCount"],"a","rel");
            if(result["headCount"]!="undefined") logstring+=report.IsheadContentCheck(result["headCount"]);
            if(result["strongCount"]!="undefined") logstring+=report.IsExistMoreThanOneTag(result["strongCount"]>= settingObj.maxStrongTagCount,"strong",settingObj.maxStrongTagCount);
            if(result["h1Count"]!="undefined") logstring+=report.IsExistMoreThanOneTag(result["h1Count"],"h1",1);

            for (let key in result){

                if(!["aCount","h1Count","imgCount","strongCount","headCount"].includes(key)){
                    let obj = result[key];
                    if (obj.tagname!="" && obj.attrname=="" && obj.attrvalue=="")  logstring+=report.IsNotExistTag(obj.result,obj.tagname);
                    if (obj.tagname!="" && obj.attrname!="" && obj.attrvalue=="")  logstring+=report.IsNothasArribute(obj.result,obj.tagname,obj.attrname);
                    if (obj.tagname!="" && obj.attrname!="" && obj.attrvalue!="")  logstring+=report.IsExistExtendChecklog(obj.result,obj.tagname,obj.attrname,obj.attrvalue);
                }
            }
            let changeline=`
`;  
            let logReportStr=logstring.replace(/\./gi, "."+changeline);
            report.savelog(savepath,filename,logReportStr);
        }
    };


module.exports=seo_check;