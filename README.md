
seo_check
============
Notes:

Development environment
Nodejs: v10.6.0
NPM : 6.4.1

##description
a simple tool to scan file/stream for defeats

* support input: ReadStream / file path
* support output: WriteStream / file path / log
* easy to register customize SEO check rules

##installation
``npm install @jackchang/seo_check``

## usage

### load with file path

```
//include module
const seo_check = require('@jackchang/seo_check');

//register new SEO rule
seo_check.ExtendRule({tagname:"h2",ruleName:"checkh2"});
seo_check.ExtendRule({tagname:"meta",ruleName:"checkMetaAttrRobots",attrname:"name",attrvalue:"robots"});


//new instance
var seoObj = new seo_check({maxStrongTagCount:4});

//load file with path & set check rule
seoObj.loadHtmlContent(__dirname + '/test.html',seo_check.fileType.FILE).then(()=>{

    seoObj.checka()
        .checkh2()
        .checkh1()
        .checkimg()
        .checkstrong()
        .checkhead()
        .checkMetaAttrRobots()
        .GenerateReport(seo_check.fileType.FILE,filepath,filename);

});
```

#output
##### result
example passed log:

```
The <img> tag alt attribute is pass.
The <a> tag rel attribute is pass.
This head have <title> tag.
This head have <meta name='description'> tag.
This head have <meta name='keyword'> tag.
This HTML have more than 5 <strong> tag.
This HTML have more than 1 <h1> tag.
This HTML have <h2> tag.
This HTML have meta tag attribute key=name value=robots.
```
example error log:

```
There are 15 <img> without alt attribute.
There are 128 <a> without rel attribute.
This head haven't <title> tag.
This head haven't <meta name='description'> tag.
This head haven't <meta name='keyword'> tag.
This HTML haven't more than 5 <strong> tag.
This HTML haven't more than 1 <h1> tag.
This HTML have <h2> tag.
This HTML haven't meta tag attribute key=name value=robots.
```
#options

| name             | description                   | type | default |
|------------------|-------------------------------|------|---------|
| maxStrongTagCount | max count for strong tag (>=) | int  | 15     |

#API table

table of contents

* [init](#user-content-init)
	* [seo_check](#user-content-seo_check)
* [enum](#user-content-enum)
	* [fileType](#user-content-fileType)
* [load](#user-content-load)
	* [loadHtmlContent](#user-content-loadHtmlContent)
* [check APIs](#user-content-register-customize-check-api)
	* [checkstrong](#user-content-checkstrong)
	* [checkimg](#user-content-checkimg)
	* [checka](#user-content-checka)
	* [checkhead](#user-content-checkhead)
	* [checkh1](#user-content-checkh1)
* [register customize check API](#user-content-register_api)
	* [ExtendRule](#user-content-ExtendRule)
* [report](#user-content-Reoprt)
    * [GenerateReport](#user-content-GenerateReport)

# API
<span id="user-content-init"></span>
##init
<span id="user-content-seo_check"></span>
####seo_check
new with a constructor

	//include module
	const seo_check = require('@jackchang/seo_check');
	
	//new instance
	const checker = new seo_check({maxStrongTagCount:4});

<span id="user-content-enum"></span>
## enum

<span id="user-content-fileType"></span>
####fileType


output option

* FILE: use a file path for output
* STREAM: use a WriteStream for output
* CONSOLE: use console for output

<span id="user-content-load"></span>
##load
<span id="user-content-loadHtmlContent"></span>
####loadHtmlContent

#####parameter

| name  | value  | description   | 
|---|---|---|
| path | string  |  file path |
| fileType  | seo_check.fileType.(FILE or STREAM)  |  File or ReadStream  |

#####usage


```
//include module
const seo_check = require('@jackchang/seo_check');

//new instance File
const checker = new seo_check({maxStrongTagCount:4});
checker.loadHtmlContent(path,seo_check.fileType.FILE).then(()=>{
    ...
});
```

```
//include module
const seo_check = require('@jackchang/seo_check');

//new instance STREAM
const checker = new seo_check({maxStrongTagCount:4});
checker.loadHtmlContent(path,seo_check.fileType.STREAM).then(()=>{
    ...
});
```

<span id="user-content-register-customize-check-api"></span>
##check APIs
<span id="user-content-checkstrong"></span>
####checkstrong

##### usage
check rule: Detect if there’re more than 15 ``<strong>`` tag in HTML,
you can modify the max by setting options ``maxStrongTagCount``

	var checker = new seo_check({maxStrongTagCount:4});

```
checker.loadHtmlContent(__dirname + '/test.html').then(()=>{
    checker.checkstrong();
});
```


<span id="user-content-checkimg"></span>
####checkimg

##### usage
check rule: Detect if any ``<img />`` tag without alt attribute

```
checker.loadHtmlContent(__dirname + '/test.html').then(()=>{
    checker.checkimg();
});
```

<span id="user-content-checka"></span>
####checka

##### usage
Detect if any ``<a />`` tag without rel attribute

```
checker.loadHtmlContent(__dirname + '/test.html').then(()=>{
    checker.checka();
});
```

<span id="user-content-checkhead"></span>
####checkhead

##### usage
In ``<head>`` tag

1. Detect if header doesn’t have ``<title>`` tag
1. Detect if header doesn’t have ``<meta name="description" ... />`` tag
1. Detect if header doesn’t have ``<meta name="keywords" ... />`` tag

```

checker.loadHtmlContent(__dirname + '/test.html').then(()=>{
    checker.checkhead();
});
```

<style>
.strong{color:red;font-weight:bolder;}
</style>
<h4 class="strong">** NOTE ** </h4>
<p class="strong">
the SEO rule for description in the assignment is slightly different from general rule:
The "Pre-defined SEO rules" for description tag is
</p>

    <meta name="descriptions"/> (with s)
<p class="strong">
the general rule is "description"(w/o s) instead.
</br>
Reference: https://moz.com/learn/seo/meta-description 
</p>

<span id="user-content-checkh1"></span>
####checkh1

##### usage
Detect if a HTML have more than one ``<H1>`` tag.

```
checker.loadHtmlContent(__dirname + '/test.html').then(()=>{
    checker.checkh1();
})
```


<span id="user-content-register_api"></span>
##register customize check API
<span id="user-content-ExtendRule"></span>
#### seo_check.ExtendRule

#####parameters
| Paramname | description                            | type   | default                                          |
|-----------|----------------------------------------|--------|--------------------------------------------------|
| ruleName  | rule API name                          | string | no, will overwite registration if name exist     |
| tagname   | valid html tagname                     | string | no, Required                                     |
| attrname  | valid tag has attr's name              | string | Optional                                         |
| attrvalue | valid tag has attr's value             | string | Optional                                         |


#####usage
a static API to register a global check rule

to register

```
const seo_check = require("../index");

seo_check.ExtendRule({tagname:"h2",ruleName:"checkh2"});
seo_check.ExtendRule({tagname:"meta",ruleName:"checkMetaAttrRobots",attrname:"name",attrvalue:"robots"});

```

to use

```
//new instance
const checker = new seo_check({debug:false, maxStrongTagCount: 18});

//load file with readable stream and apply rule checkRobotMeta. The call method no order.

checker.loadHtmlContent(__dirname + '/test.html',seo_check.fileType.STREAM).then(()=>{

    checker.checka()
        .checkh2()
        .checkh1()
        .checkimg()
        .checkstrong()
        .checkhead()
        .checkMetaAttrRobots()
        .GenerateReport(seo_check.fileType.STREAM,filepath,filename);

});

/*output:
-------------------------
This HTML have <h2> tag.
This HTML have meta tag attribute key=name value=robots.
*/
```


<span id="user-content-Reoprt"></span>
##Report
<span id="user-content-GenerateReport"></span>
####GenerateReport

##### usage
use to finish check and  Generate Report.
 
When check rule finish. Call  GenerateReport to Render reoprt.

| param    | valueType  |  description   |    default      |
|----------|------------|----------------|-----------------|
| SavePath | string             |   SaveFilePath   | Required   |
| Filename | string             |   SaveFileName   | Required   |
| fileType | seo_check.fileType |STREAM,FILE,CONSOLE|CONSOLE     |

```
checker.loadHtmlContent(__dirname + '/test.html',seo_check.fileType.STREAM).then(()=>{

    checker.checka()
        .checkh2()
        .checkh1()
        .checkimg()
        .checkstrong()
        .checkhead()
        .checkMetaAttrRobots()
        .GenerateReport(seo_check.fileType.STREAM,filepath,filename).then(()=>{
            ...
        });
});
```