angular.module("app.services",["firebase"]).factory("api",["$firebase",function($firebase){var api={show:{},sync:{index:{}},index:{}},types=["media","clients","services","articles","about","products"],baseURL="https://metal.firebaseio.com/",indexURL="https://metal.firebaseio.com/index/";return angular.forEach(types,function(type){api[type]=new Firebase(baseURL+type),api.sync[type]=$firebase(api[type]),api.index[type]=new Firebase(indexURL+type),api.sync.index[type]=$firebase(api.index[type]),api.show[type]=api.sync[type].$asArray()}),api.saveMedia=function(id,title){var link=title.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"");api.sync.media.$update(id,{mediaTitle:title,mediaLink:link}).then(function(media){api.newID=media.name(),api.sync.index.media[link]===!1&&api.sync.index.media.$set(link,api.newID)})},api.removeMedia=function(name,id){api.sync.media.$remove(id).then(function(){api.sync.index.media.$remove(name)})},api.updateAbout=function(id,text){api.sync.about.$update(id,{description:text}),api.aboutSaved="About Saved!"},api.addContentMedia=function(content,id,media){media.unshift(id)},api.removeContentMedia=function(media,id){for(var i=0;i<media.length;i++)if(media[i]===id){media.splice(i,1);break}},api.addContentArticles=function(content,id,articles){if("No Articles"!==articles[0]){var cleanArticles=articles;return cleanArticles.push(id),cleanArticles=cleanArticles.filter(function(item,index,inputArray){return inputArray.indexOf(item)==index}),articles=cleanArticles}articles[0]=id},api.removeContentArticles=function(articles,id){for(var i=0;i<articles.length;i++)articles[i]===id&&articles.splice(i,1);0===articles.length&&(articles[0]="No Articles")},api.addVariation=function(variation,variations){"No Variations"===variations[0]?variations[0]={name:variation.name,description:variation.description}:variations.push({name:variation.name,description:variation.description})},api.removeVariation=function(index,variations){variations.splice(index,1),0===variations.length&&(variations[0]="No Variations")},api.saveClient=function(title,description,variations,media,articles){if(!media){var media=[];media[0]="No Media"}if(!variations){var variations=[];variations[0]="No Variations"}if(!articles){var articles=[];articles[0]="No Articles"}this.media=media;var clientURL=title.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"");api.sync.clients.$push({title:title,description:description,variations:variations,clientURL:clientURL,media:media,articles:articles}).then(function(client){api.newID=client.name(),api.show.clients.$getRecord(api.newID).media||api.sync.clients.$update(api.newID,{media:[""]}),api.show.clients.$getRecord(api.newID).variations||api.sync.clients.$update(api.newID,{variations:[""]}),api.show.clients.$getRecord(api.newID).articles||api.sync.clients.$update(api.newID,{articles:[""]}),api.sync.index.clients.$set(clientURL,api.newID)})},api.removeClient=function(name,id){api.sync.clients.$remove(id).then(function(){api.sync.index.clients.$remove(name)})},api.updateClientTitle=function(id,title){var link=title.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"");api.sync.clients.$update(id,{title:title,clientURL:link}).then(function(client){api.newID=client.name(),api.sync.index.clients.$set(link,api.newID)})},api.updateClient=function(id,description,variations,media,articles){api.sync.clients.$update(id,{description:description,variations:variations,media:media,articles:articles})},api.saveService=function(title,description,variations,media,articles){if(!media){var media=[];media[0]="No Media"}if(!variations){var variations=[];variations[0]="No Variations"}if(!articles){var articles=[];articles[0]="No Articles"}this.media=media;var serviceURL=title.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"");api.sync.services.$push({title:title,description:description,variations:variations,serviceURL:serviceURL,media:media,articles:articles}).then(function(service){api.newID=service.name(),api.show.services.$getRecord(api.newID).media||api.sync.services.$update(api.newID,{media:[""]}),api.show.services.$getRecord(api.newID).variations||api.sync.services.$update(api.newID,{variations:[""]}),api.show.services.$getRecord(api.newID).articles||api.sync.services.$update(api.newID,{articles:[""]}),api.sync.index.services.$set(serviceURL,api.newID)})},api.removeService=function(name,id){api.sync.services.$remove(id).then(function(){api.sync.index.services.$remove(name)})},api.updateServiceTitle=function(id,title){var link=title.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"");api.sync.services.$update(id,{title:title,serviceURL:link}).then(function(service){api.newID=service.name(),api.sync.index.services.$set(link,api.newID)})},api.updateService=function(id,description,variations,media,articles){api.sync.services.$update(id,{description:description,variations:variations,media:media,articles:articles})},api.saveProduct=function(title,description,variations,media,articles){if(!media){var media=[];media[0]="No Media"}if(!variations){var variations=[];variations[0]="No Variations"}if(!articles){var articles=[];articles[0]="No Articles"}this.media=media;var productURL=title.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"");api.sync.products.$push({title:title,description:description,variations:variations,productURL:productURL,media:media,articles:articles}).then(function(product){api.newID=product.name(),api.show.products.$getRecord(api.newID).media||api.sync.products.$update(api.newID,{media:[""]}),api.show.products.$getRecord(api.newID).variations||api.sync.products.$update(api.newID,{variations:[""]}),api.show.products.$getRecord(api.newID).articles||api.sync.products.$update(api.newID,{articles:[""]}),api.sync.index.products.$set(productURL,api.newID)})},api.removeProduct=function(name,id){api.sync.products.$remove(id).then(function(){api.sync.index.products.$remove(name)})},api.updateProductTitle=function(id,title){var link=title.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"");api.sync.products.$update(id,{title:title,productURL:link}).then(function(product){api.newID=product.name(),api.sync.index.products.$set(link,api.newID)})},api.updateProduct=function(id,description,variations,media,articles){api.sync.products.$update(id,{description:description,variations:variations,media:media,articles:articles})},api.saveArticle=function(title,description,variations,media,articles){if(!media){var media=[];media[0]="No Media"}if(!variations){var variations=[];variations[0]="No Variations"}if(!articles){var articles=[];articles[0]="No Articles"}this.media=media;var articleURL=title.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"");api.sync.articles.$push({title:title,description:description,variations:variations,articleURL:articleURL,media:media,articles:articles}).then(function(article){api.newID=article.name(),api.show.articles.$getRecord(api.newID).media||api.sync.articles.$update(api.newID,{media:[""]}),api.show.articles.$getRecord(api.newID).variations||api.sync.articles.$update(api.newID,{variations:[""]}),api.show.articles.$getRecord(api.newID).articles||api.sync.articles.$update(api.newID,{articles:[""]}),api.sync.index.articles.$set(articleURL,api.newID)})},api.removeArticle=function(name,id){api.sync.articles.$remove(id).then(function(){api.sync.index.articles.$remove(name)})},api.updateArticleTitle=function(id,title){var link=title.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"");api.sync.articles.$update(id,{title:title,articleURL:link}).then(function(article){api.newID=article.name(),api.sync.index.articles.$set(link,api.newID)})},api.updateArticle=function(id,description,variations,media,articles){api.sync.articles.$update(id,{description:description,variations:variations,media:media,articles:articles})},api}]),function(){"use strict";var app=angular.module("app",["ngSanitize","ngRoute","ngAnimate","ui.bootstrap","ui.router","easypiechart","textAngular","ngTagsInput","app.controllers","app.services","app.directives","app.localization","app.nav","akoenig.deckgrid","uploader"]);app.config(["$controllerProvider","$stateProvider","$urlRouterProvider","AWSControlProvider",function($controllerProvider,$stateProvider,$urlRouterProvider,AWSControlProvider){var imageSupportParams={type:"image.*",host:"s3",Bucket:"masuk",accessKeyId:"AKIAIABNWCTWZ65JJV4A",secretAccessKey:"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",region:"us-west-2"};AWSControlProvider.supportType(imageSupportParams);var routes,setControllers,setRoutes,routesSingles,setSingleRoutes;return routes=["home","about","services","clients","articles","admin","404","media","products"],routesSingles=["services","clients","articles","media","products"],app.controller=function(name,constructor){return $controllerProvider.register(name,constructor),this},setControllers=function(route){var name,fun;name=route+"Ctrl",fun=function($scope,$state,api,$firebase){var apiList=["updateAbout","saveArticle","updateArticleTitle","saveService","updateServiceTitle","updateService","removeService","saveProduct","updateProductTitle","updateProduct","removeProduct","saveClient","updateClientTitle","updateClient","removeClient","saveMedia","removeMedia","addContentMedia","removeContentMedia","addVariation","addContentArticles","removeContentArticles"];angular.forEach(apiList,function(action){return $scope[action]=api[action],$scope}),$scope.state=$state,$scope.api=api;var itemList=new Firebase("https://metal.firebaseio.com/"+route),aboutText=($firebase(itemList),new Firebase("https://metal.firebaseio.com/about")),syncAbout=$firebase(aboutText);$scope.aboutHTML=syncAbout.$asArray(),$scope.saved=api.aboutSaved,$scope.media=[],$scope.articles=[],$scope.productVariations=api.variations,$scope.urlFilter=function(url){return url.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"")},$scope.search=["JXAr2DW0CX5iRtxd0R3"],$scope.familes=[{id:1,name:"Kruders",kids:[{name:"zoe"}]},{id:2,name:"Halifax",kids:[{name:"mike"},{name:"jim"}]},{id:3,name:"Judes",kids:[]}]},app.controller(name,fun)},routes.forEach(function(route){setControllers(route)}),setRoutes=function(route){var state,config;return state=route,config={url:"/"+route,templateUrl:"views/"+route+".html",controller:route+"Ctrl"},$stateProvider.state(state,config),$stateProvider},setSingleRoutes=function(singleRoute){var state,config;return state="single-"+singleRoute,config={url:"/"+singleRoute+"/:"+singleRoute,templateUrl:"views/single/"+singleRoute+".html",controller:function($scope,$state,api,$firebase){$scope.thisData=$state.current.data,$scope.state=$state,$scope.api=api;var ref=new Firebase("https://metal.firebaseio.com/index/"+singleRoute+"/"+$scope.state.params[singleRoute]);ref.on("value",function(snapshot){var itemID=snapshot.val(),itemRef=new Firebase("https://metal.firebaseio.com/"+singleRoute+"/"+itemID),sync=$firebase(itemRef);$scope.singleData=sync.$asObject()},function(errorObject){})}},$stateProvider.state(state,config),$stateProvider},routes.forEach(function(route){return setRoutes(route)}),routesSingles.forEach(function(routesSingle){return setSingleRoutes(routesSingle)}),$urlRouterProvider.otherwise("/home")}]).filter("filterOut",function(){return function(input,search){if("undefined"==typeof search)return input;var filtered=[];return angular.forEach(input,function(value){search.indexOf(value.$id)<0&&filtered.push(value)}),filtered}})}.call(this);var uploader=angular.module("uploader",[]);uploader.provider("AWSControl",function(){var mimes=[];this.yeah="Hi",this.supportType=function(params){mimes.push(params)},this.setYeah=function(yeah){this.yeah=yeah},this.$get=function($q,$rootScope,$firebase){return{yeah:this.yeah,mimes:mimes,canHandle:function(fileType){for(var canBeHandled=!1,i=0;i<this.mimes.length;i++)canBeHandled||!fileType.match(this.mimes[i].type)||(canBeHandled=!0);return canBeHandled},upload:function(file,key){var cDate=Date.now();key=key+"-"+cDate;var handlerIndex=-1;if(angular.forEach(this.mimes,function(mime,index){-1===handlerIndex&&file.type.match(mime.type)&&(handlerIndex=index)}),-1===handlerIndex)return!1;var deferred=$q.defer(),handler=this.mimes[handlerIndex];if("s3"===handler.host){var params={Key:key,ContentType:file.type,Body:file};AWS.config.update({accessKeyId:handler.accessKeyId,secretAccessKey:handler.secretAccessKey}),AWS.config.region=handler.region,AWS.config.host=handler.host;var bucket=new AWS.S3({params:{Bucket:handler.Bucket}});return bucket.putObject(params,function(err,data){if(err)$rootScope.$broadcast("AWSUploadError"),deferred.reject(err);else{$rootScope.$broadcast("AWSUploadSuccess"),$rootScope.newImage="https://"+AWS.config.host+"-"+AWS.config.region+".amazonaws.com/"+handler.Bucket+"/"+encodeURIComponent(key),$rootScope.mediaTitle=prompt("Upload Successful! Please name your media."),$rootScope.mediaTitle=$rootScope.mediaTitle.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"");var media=new Firebase("https://metal.firebaseio.com/media"),sync=$firebase(media);sync.$push({mediaURL:$rootScope.newImage,mediaTitle:$rootScope.mediaTitle,mediaLink:$rootScope.mediaTitle.toLowerCase().replace(/'+/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"-").replace(/^-+|-+$/g,"")}).then(function(media){var newID=media.name(),index=new Firebase("https://metal.firebaseio.com/index/media"),sync=$firebase(index);sync.$set($rootScope.mediaTitle,newID)}),deferred.resolve(data)}}),deferred.promise}alert("No handler")}}}}),uploader.directive("uploader",function(AWSControl){return{replace:!0,scope:{},require:"ngModel",template:'<form novalidate><input class="well" type="file" /><button class="btn btn-behance" id="upIt" data-ng-click="upload()">Upload</button></form>',restrict:"E",link:function(scope,elem){scope.upload=function(){var fileInput=elem[0].children[0];if(fileInput.files.length){var file=fileInput.files[0];elem[0].children[1].disabled=!0,elem[0].children[1].innerHTML="Uploading...",AWSControl.canHandle(file.type)?AWSControl.upload(file,file.name).then(function(){elem[0].reset(),elem[0].children[1].disabled=!1,elem[0].children[1].innerHTML="Upload"},function(err){elem[0].children[1].disabled=!1,elem[0].children[1].innerHTML="Upload"},function(){}):(elem[0].children[1].disabled=!1,elem[0].children[1].innerHTML="Upload",alert("Generic alert or some notification about an unsupported file type"))}}}}}),function(){"use strict";angular.module("app.nav",[]).directive("toggleNavCollapsedMin",["$rootScope",function($rootScope){return{restrict:"A",link:function(scope,ele){var app;return app=$("#app"),ele.on("click",function(e){return app.hasClass("nav-collapsed-min")?app.removeClass("nav-collapsed-min"):(app.addClass("nav-collapsed-min"),$rootScope.$broadcast("nav:reset")),e.preventDefault()})}}}]).directive("collapseNav",[function(){return{restrict:"A",link:function(scope,ele){var $a,$aRest,$app,$lists,$listsRest,$nav,$window,Timer,prevWidth,updateClass;return $window=$(window),$lists=ele.find("ul").parent("li"),$lists.append('<i class="fa fa-angle-down icon-has-ul-h"></i><i class="fa fa-angle-right icon-has-ul"></i>'),$a=$lists.children("a"),$listsRest=ele.children("li").not($lists),$aRest=$listsRest.children("a"),$app=$("#app"),$nav=$("#nav-container"),$a.on("click",function(event){var $parent,$this;return $app.hasClass("nav-collapsed-min")||$nav.hasClass("nav-horizontal")&&$window.width()>=768?!1:($this=$(this),$parent=$this.parent("li"),$lists.not($parent).removeClass("open").find("ul").slideUp(),$parent.toggleClass("open").find("ul").stop().slideToggle(),event.preventDefault())}),$aRest.on("click",function(){return $lists.removeClass("open").find("ul").slideUp()}),scope.$on("nav:reset",function(){return $lists.removeClass("open").find("ul").slideUp()}),Timer=void 0,prevWidth=$window.width(),updateClass=function(){var currentWidth;return currentWidth=$window.width(),768>currentWidth&&$app.removeClass("nav-collapsed-min"),768>prevWidth&&currentWidth>=768&&$nav.hasClass("nav-horizontal")&&$lists.removeClass("open").find("ul").slideUp(),prevWidth=currentWidth},$window.resize(function(){var t;return clearTimeout(t),t=setTimeout(updateClass,300)})}}}]).directive("highlightActive",[function(){return{restrict:"A",controller:["$scope","$element","$attrs","$location",function($scope,$element,$attrs,$location){var highlightActive,links,path;return links=$element.find("a"),path=function(){return $location.path()},highlightActive=function(links,path){return path="#"+path,angular.forEach(links,function(link){var $li,$link,href;return $link=angular.element(link),$li=$link.parent("li"),href=$link.attr("href"),$li.hasClass("active")&&$li.removeClass("active"),0===path.indexOf(href)?$li.addClass("active"):void 0})},highlightActive(links,$location.path()),$scope.$watch(path,function(newVal,oldVal){return newVal!==oldVal?highlightActive(links,$location.path()):void 0})}]}}]).directive("toggleOffCanvas",[function(){return{restrict:"A",link:function(scope,ele){return ele.on("click",function(){return $("#app").toggleClass("on-canvas")})}}}])}.call(this),function(){"use strict";angular.module("app.directives",[]).directive("imgHolder",[function(){return{restrict:"A",link:function(scope,ele){return Holder.run({images:ele[0]})}}}]).directive("customPage",function(){return{restrict:"A",controller:["$scope","$element","$location",function($scope,$element,$location){var addBg,path;return path=function(){return $location.path()},addBg=function(path){switch($element.removeClass("body-wide body-lock"),path){case"/404":case"/pages/404":case"/pages/500":case"/pages/signin":case"/pages/signup":case"/pages/forgot-password":return $element.addClass("body-wide");case"/pages/lock-screen":return $element.addClass("body-wide body-lock")}},addBg($location.path()),$scope.$watch(path,function(newVal,oldVal){return newVal!==oldVal?addBg($location.path()):void 0})}]}}).directive("uiColorSwitch",[function(){return{restrict:"A",link:function(scope,ele){return ele.find(".color-option").on("click",function(event){var $this,hrefUrl,style;if($this=$(this),hrefUrl=void 0,style=$this.data("style"),"loulou"===style)hrefUrl="styles/main.css",$('link[href^="styles/main"]').attr("href",hrefUrl);else{if(!style)return!1;style="-"+style,hrefUrl="styles/main"+style+".css",$('link[href^="styles/main"]').attr("href",hrefUrl)}return event.preventDefault()})}}}]).directive("goBack",[function(){return{restrict:"A",controller:["$scope","$element","$window",function($scope,$element,$window){return $element.on("click",function(){return $window.history.back()})}]}}])}.call(this),function(){"use strict";angular.module("app.localization",[]).factory("localize",["$http","$rootScope","$window",function($http,$rootScope,$window){var localize;return localize={language:"",url:void 0,resourceFileLoaded:!1,successCallback:function(data){return localize.dictionary=data,localize.resourceFileLoaded=!0,$rootScope.$broadcast("localizeResourcesUpdated")},setLanguage:function(value){return localize.language=value.toLowerCase().split("-")[0],localize.initLocalizedResources()},setUrl:function(value){return localize.url=value,localize.initLocalizedResources()},buildUrl:function(){return localize.language||(localize.language=($window.navigator.userLanguage||$window.navigator.language).toLowerCase(),localize.language=localize.language.split("-")[0]),"i18n/resources-locale_"+localize.language+".js"},initLocalizedResources:function(){var url;return url=localize.url||localize.buildUrl(),$http({method:"GET",url:url,cache:!1}).success(localize.successCallback).error(function(){return $rootScope.$broadcast("localizeResourcesUpdated")})},getLocalizedString:function(value){var result,valueLowerCase;return result=void 0,localize.dictionary&&value?(valueLowerCase=value.toLowerCase(),result=""===localize.dictionary[valueLowerCase]?value:localize.dictionary[valueLowerCase]):result=value,result}}}]).directive("i18n",["localize",function(localize){var i18nDirective;return i18nDirective={restrict:"EA",updateText:function(ele,input,placeholder){var result;return result=void 0,"i18n-placeholder"===input?(result=localize.getLocalizedString(placeholder),ele.attr("placeholder",result)):input.length>=1?(result=localize.getLocalizedString(input),ele.text(result)):void 0},link:function(scope,ele,attrs){return scope.$on("localizeResourcesUpdated",function(){return i18nDirective.updateText(ele,attrs.i18n,attrs.placeholder)}),attrs.$observe("i18n",function(value){return i18nDirective.updateText(ele,value,attrs.placeholder)})}}}]).controller("LangCtrl",["$scope","localize",function($scope,localize){return $scope.lang="English",$scope.setLang=function(lang){switch(lang){case"English":localize.setLanguage("EN-US");break;case"Español":localize.setLanguage("ES-ES");break;case"日本語":localize.setLanguage("JA-JP");break;case"中文":localize.setLanguage("ZH-TW");break;case"Deutsch":localize.setLanguage("DE-DE");break;case"français":localize.setLanguage("FR-FR");break;case"Italiano":localize.setLanguage("IT-IT");break;case"Portugal":localize.setLanguage("PT-BR");break;case"Русский язык":localize.setLanguage("RU-RU");break;case"한국어":localize.setLanguage("KO-KR")}return $scope.lang=lang},$scope.getFlag=function(){var lang;switch(lang=$scope.lang){case"English":return"flags-american";case"Español":return"flags-spain";case"日本語":return"flags-japan";case"中文":return"flags-china";case"Deutsch":return"flags-germany";case"français":return"flags-france";case"Italiano":return"flags-italy";case"Portugal":return"flags-portugal";case"Русский язык":return"flags-russia";case"한국어":return"flags-korea"}}}])}.call(this),function(){"use strict";angular.module("app.controllers",[]).controller("AppCtrl",["$scope","$rootScope","$firebase","api","$http","AWSControl",function($scope,$rootScope,$firebase,api,$http,AWSControl){$scope.msg="",$scope.fromservice=AWSControl.yeah,$scope.myfile={},$rootScope.$on("AWSUploadSuccess",function(){$scope.msg="Upload successful"}),$rootScope.$on("AWSUploadError",function(){$scope.msg="Upload failed. Please retry"});var $window;return $window=$(window),$scope.main={brand:"Masuk Metal",name:"Bryce Masuk"},$scope.pageTransitionOpts=[{name:"Scale up","class":"ainmate-scale-up"},{name:"Fade up","class":"animate-fade-up"},{name:"Slide in from right","class":"ainmate-slide-in-right"},{name:"Flip Y","class":"animate-flip-y"}],$scope.admin={layout:"wide",menu:"vertical",fixedHeader:!0,fixedSidebar:!0,pageTransition:$scope.pageTransitionOpts[2]},$scope.$watch("admin",function(newVal,oldVal){return"horizontal"===newVal.menu&&"vertical"===oldVal.menu?void $rootScope.$broadcast("nav:reset"):newVal.fixedHeader===!1&&newVal.fixedSidebar===!0?(oldVal.fixedHeader===!1&&oldVal.fixedSidebar===!1&&($scope.admin.fixedHeader=!0,$scope.admin.fixedSidebar=!0),void(oldVal.fixedHeader===!0&&oldVal.fixedSidebar===!0&&($scope.admin.fixedHeader=!1,$scope.admin.fixedSidebar=!1))):(newVal.fixedSidebar===!0&&($scope.admin.fixedHeader=!0),void(newVal.fixedHeader===!1&&($scope.admin.fixedSidebar=!1)))},!0),$scope.color={primary:"#248AAF",success:"#3CBC8D",info:"#29B7D3",infoAlt:"#666699",warning:"#FAC552",danger:"#E9422E"}}]).controller("HeaderCtrl",["$scope",function(){}]).controller("NavContainerCtrl",["$scope",function(){}]).controller("NavCtrl",["$scope",function(){}]).controller("DashboardCtrl",["$scope",function(){}])}.call(this);