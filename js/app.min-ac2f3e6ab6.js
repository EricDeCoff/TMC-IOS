angular.module("app",["ionic","ionic.service.core","ui.router","ngCordova","pushwoosh.factory","fbService","hours","about","contact","register","settings","information","ui.controllers","ux.custom","ux.filters","ux.header"]).run(function($ionicPlatform,$timeout,pushwooshFactory,fbService){$ionicPlatform.ready(function(){navigator.splashscreen&&navigator.splashscreen.show(),window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&StatusBar.styleDefault(),navigator.splashscreen&&$timeout(function(){console.log("navigator.splashscreen.hide()"),navigator.splashscreen.hide()},1e4),pushwooshFactory.initialize(),localStorage.removeItem("company"),localStorage.company||(localStorage.company=JSON.stringify({address:"431 Sage Street",city:"Temple",direct:"7705639007",name:"Temple Medical Clinic",postal:30179,state:"GA",title1:"Temple Medical",title2:"Client"}),console.log(localStorage.company)),fbService.getCompany(),localStorage.days||(localStorage.days=JSON.stringify([{begin:"9 AM",end:"4 PM",name:"Monday"},{begin:"9 AM",end:"4 PM",name:"Tuesday"},{begin:"9 AM",end:"4 PM",name:"Wednesday"},{begin:"9 AM",end:"4 PM",name:"Thursday"},{begin:"9 AM",end:"3 PM",name:"Friday"}])),console.log(localStorage.days),console.log(JSON.parse(localStorage.days)),fbService.getHours(),angular.element("ion-side-menus").removeClass("hide")})}),function(){"use strict";angular.module("app").controller("NavCtrl",function($scope,$ionicNavBarDelegate,$ionicSideMenuDelegate){$ionicNavBarDelegate.align("center"),$scope.showMenu=function(){$ionicSideMenuDelegate.toggleLeft()},$scope.showRightMenu=function(){$ionicSideMenuDelegate.toggleRight()}})}(),function(){"use strict";function AboutController($scope,$state,uiTelFactory,$ionicHistory,fbService){console.log("AboutController");var d1=new Date,d2=new Date(2005,6,1);$scope.serviceYears=Math.ceil(d1.getFullYear()-d2.getFullYear()),$scope.companyNumber=localStorage.companyNumber,$scope.getCompanyInfo=function(){console.log("AboutController:getCompanyInfo:"),fbService.getCompany().then(function(data){console.log("AboutController:handleDataResolve:data"),console.log(data.direct),$scope.companyNumber=localStorage.companyNumber},function(){console.log("AboutController:handlDataReject:Data Not Found")})},$scope.$on("$ionicView.enter",function(){$scope.getCompanyInfo()})}angular.module("about",["ui.TelFactory","fbService"]).controller("AboutController",AboutController)}(),function(){"use strict";function AboutConfig($stateProvider){$stateProvider.state("tabs.about",{url:"/about",views:{"about-tab":{templateUrl:"js/about/about.html",controller:"AboutController",controllAs:"vm"}}})}angular.module("about").config(AboutConfig),AboutConfig.$inject=["$stateProvider"]}(),function(){"use strict";function uiOrientationChange($scope,$state){$scope.$state=$state,window.addEventListener("orientationchange",function(){console.log("ui.controllers:uiOrientationChange"),alert("orientationchange"),$scope.$state.reload()})}angular.module("ui.controllers",[]).controller("uiOrientationChange",uiOrientationChange)}(),function(){"use strick";function ContactController($scope,$state,uiMapFactory,uiTelFactory,fbService){console.log("ContractController"),$scope.contactMap=function(address){console.log("ContactController:contactMap"),console.log(uiMapFactory),uiMapFactory.map(address)},$scope.contactCall=function(number){console.log("ContactController:contactCall"),console.log(uiTelFactory),uiTelFactory.call(number)},$scope.contact={info:"<p>Wow this is the contact view HTML data</p>"},console.log($scope.contact.info),$scope.companyNumber=localStorage.companyNumber,$scope.companyAddress=localStorage.companyAddress,$scope.companyCity=localStorage.companyCity,$scope.companyState=localStorage.companyState,$scope.companyPostal=localStorage.companyPostal,$scope.getCompanyInfo=function(){console.log("ContractController:getCompanyInfo:"),fbService.getCompany().then(function(data){console.log("ContractController:handleDataResolve:data"),console.log(data.direct),$scope.companyNumber=localStorage.companyNumber,$scope.companyAddress=localStorage.companyAddress,$scope.companyCity=localStorage.companyCity,$scope.companyState=localStorage.companyState,$scope.companyPostal=localStorage.companyPostal},function(){console.log("ContractController:handlDataReject:Data Not Found")})},$scope.$on("$ionicView.enter",function(){$scope.getCompanyInfo()})}angular.module("contact",["ui.MapFactory","ui.TelFactory","fbService"]).controller("ContactController",ContactController)}(),function(){"use strict";function ContactConfig($stateProvider,$cordovaInAppBrowserProvider){var option={location:"yes",clearcache:"yes",toolbar:"no"};$cordovaInAppBrowserProvider.setDefaultOptions(option),$stateProvider.state("tabs.contact",{url:"/contact",views:{"contact-tab":{templateUrl:"js/contact/contact.html",controller:"ContactController",controllerAS:"vm"}}})}angular.module("contact").config(ContactConfig),ContactConfig.$inject=["$stateProvider","$cordovaInAppBrowserProvider"]}(),function(){"use strict";angular.module("ux.custom",["tmc-about-info","tmc-phone-long","tmc-yos"]).directive("orientantionchange",function($window){return{link:function(scope){angular.element($window).on("orientationchange",function(e){scope.$broadcast("orientationchange::orientationchange")})}}})}(),angular.module("emailCheck",[]).directive("emailCheck",[function(){return{require:"ngModel",link:function(scope,elem,attrs,ctrl){var ID="#"+attrs.emailCheck;elem.add(ID).on("keyup",function(){scope.$apply(function(){var v=elem.val()===$(ID).val();ctrl.$setValidity("emailmatch",v)})})}}}]),function(){"use strict";angular.module("fb.factory",["firebase"]).factory("fbFactory",function($firebaseArray){var fbFactory={name:"fbFactory",usersUrl:"https://tmc-ionic.firebaseio.com/users",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},users:function(){console.log(this.name+":users");var ref=new Firebase(this.usersUrl);return $firebaseArray(ref)},saveUser:function(_ref,_fname,_lname,_email,_trusted){console.log(this.name+":saveUser");var ref=new Firebase(this.usersUrl);ref.child(_ref).set({ref:_ref,fname:_fname,lname:_lname,email:_email,trusted:_trusted})},getUser:function(email){console.log(this.name+":getUser");var _key=email.replace(/\./g,"-*-"),ref=new Firebase(this.usersUrl+"/"+_key);ref.on("value",function(snapshot){return console.log(snapshot.val()),snapshot.val()},function(errorObject){console.log("The read failed: "+errorObject.code)})}};return fbFactory})}(),function(){"use strict";angular.module("navFactory",["ionic","ionic.service.core"]).factory("navFactory",function($state,$ionicHistory){var navFactory={name:"navFactory",base:function(val){return void 0===val?this._baseValue:void(this._baseValue=val)},prefix:function(val){return void 0===val?this._prefixValue:void(this._prefixValue=val)},suffix:function(val){return void 0===val?this._suffixValue:void(this._suffixValue=val)},back:function(){console.log(this.name+":back"),console.log($ionicHistory.currentView()),console.log($ionicHistory.currentView().backViewId),null===$ionicHistory.currentView().backViewId?$state.go("tabs.about"):$ionicHistory.goBack()},mapUrl:function(url){return angular.isNumber(url)&&(url=this.prefix()+url+this.suffix()),this.base()+url}};return navFactory})}(),function(){"use strict";angular.module("pushwoosh.factory",[]).factory("pushwooshFactory",function(){var pushwooshFactory={name:"pushwooshFactory",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},googleProjectNumber:function(){return"443338124425"},pushwooshID:function(){return"AA471-6DDC3"},initialize:function(type){console.log("pushwooshFactory.initialize"),console.log("Initialize Pushwoosh Notification"),console.log("****",ionic.Platform.platform(),"***");try{switch(ionic.Platform.platform().toLowerCase()){case"android":pushwooshFactory.androidHandler();break;case"ios":pushwooshFactory.iosHandler();break;default:console.warn("unhandled platform: "+device.platform.toLowerCase())}}catch(err){var txt="There was an error initializing Pushwoosh plugin.\n\n";txt+="Error description: "+err.message+"\n\n",console.warn(txt)}return""},androidHandler:function(){console.log("pushwooshFactory.androidPushHandler"),console.log("Initialize Pushwoosh plugin"),console.log("com.pushwoosh.plugins.pushwoosh.PushNotification");var pushNotification=cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");console.log("Pushwoosh plugin config ( Android )"),pushNotification.onDeviceReady({projectid:pushwooshFactory.googleProjectNumber(),pw_appid:pushwooshFactory.pushwooshID()}),document.addEventListener("push-notification",function(event){var title=event.notification.title,userData=event.notification.userdata;"undefined"!=typeof userData&&console.warn("user data: "+JSON.stringify(userData)),alert(title)}),pushNotification.registerDevice(function(status){console.log("Pushwoosh registration success");var pushToken=status;console.warn("Pushwoosh token: "+pushToken);var iUser=Ionic.io();iUser.set("pushwoosh",pushToken)},function(status){console.log("Pushwoosh registration failure"),console.warn(JSON.stringify(["failed to register ",status]))})},iosHandler:function(){console.log("pushwooshFactory.iosHandler"),console.log("Initialize Pushwoosh plugin"),console.log("com.pushwoosh.plugins.pushwoosh.PushNotification");var pushNotification=cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");console.log("Pushwoosh reset badge number"),pushNotification.setApplicationIconBadgeNumber(0),document.addEventListener("push-notification",function(event){var notification=event.notification;alert(notification.aps.alert),pushNotification.setApplicationIconBadgeNumber(0)}),console.log("Pushwoosh plugin config ( iOS )"),pushNotification.onDeviceReady({pw_appid:pushwooshFactory.pushwooshID()}),pushNotification.registerDevice(function(status){console.log("Pushwoosh registration success");var deviceToken=status.deviceToken;console.warn("registerDevice: "+deviceToken);var iUser=Ionic.io();iUser.set("pushwoosh",deviceToken)},function(status){console.log("Pushwoosh registration failure"),console.warn("failed to register : "+JSON.stringify(status))})}};return pushwooshFactory})}(),function(){"use strict";angular.module("ui.DeviceFactory",[]).factory("uiDeviceFactory",function(){var uiDeviceFactory={name:"uiDeviceFactory",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},type:function(){console.log(this.name+":deviceType");var deviceType="iPad"==navigator.userAgent.match(/iPad/i)?"iPad":"iPhone"==navigator.userAgent.match(/iPhone/i)?"iPhone":"Android"==navigator.userAgent.match(/Android/i)?"Android":"BlackBerry"==navigator.userAgent.match(/BlackBerry/i)?"BlackBerry":"null";return console.log(deviceType),deviceType}};return uiDeviceFactory})}(),function(){"use strict";angular.module("ui.MapFactory",["ui.DeviceFactory"]).factory("uiMapFactory",function(uiDeviceFactory,$cordovaInAppBrowser){var uiMapFactory={name:"uiMapFactory",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},map:function(address){console.log(this.name+":map");var defaultBase="https://maps.google.com/maps?saddr=My+Location&daddr=",androidBase="geo:0,0?q=",iosBase="http://maps.apple.com/?q=",base=defaultBase,uri=encodeURI(address);switch(console.log(uri),uiDeviceFactory.type().toLowerCase()){case"ipad":case"iphone":base=iosBase;break;case"android":base=androidBase;break;default:base=defaultBase}console.log("$cordovaInAppBrowser:"+base+uri);var option={location:"yes",clearcache:"yes",toolbar:"no"};$cordovaInAppBrowser.open(base+uri,"_system",option),console.log("$cordovaInAppBrowser.opened")}};return uiMapFactory})}(),function(){"use strict";angular.module("ui.TelFactory",[]).factory("uiTelFactory",function($cordovaInAppBrowser){var uiTelFactory={name:"uiTelFactory",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},call:function(number){console.log(this.name+":call");var uri=encodeURI("tel:"+number);console.log(uri);var option={location:"yes",clearcache:"yes",toolbar:"no"};console.log("$cordovaInAppBrowser:"+uri),$cordovaInAppBrowser.open(uri,"_system",option),console.log("$cordovaInAppBrowser.opened")}};return uiTelFactory})}(),function(){"use strict";angular.module("fbService",[]).factory("fbService",function($q,$cordovaDevice,$timeout){console.log("fbService");var fbService={name:"fbService",companyUrl:"https://tmc-ionic.firebaseIO.com/company",registerUrl:"https://tmc-ionic.firebaseIO.com/registered",hoursUrl:"https://tmc-ionic.firebaseIO.com/hours",connect:function(){console.log(this.name,":connect"),console.log("Firebase:online");try{Firebase.goOnline()}catch(ex){console.log("Firebase:",ex)}},disconnect:function(){console.log(this.name,":disconnect"),console.log("Firebase:offline");try{Firebase.goOffline()}catch(ex){console.log("Firebase:",ex)}},encodeID:function(id){console.log(this.name,":encodeID");var _ref=id.replace(/\./g,"-*-");return console.log(this.name,":encodeID:",_ref),_ref},getRegisterUserData:function(id){console.log(this.name,":getUserData"),id=this.encodeID(id);var deferred=$q.defer();try{this.disconnect(),this.connect();var collectionUsers=new Firebase(this.registerUrl);return collectionUsers.child(id).once("value",function(snapshot){console.log("fbService:getRegisterUserData:handleSuccess"),deferred.resolve(snapshot.val())},function(error){console.log("fbService:getRegisterUserData:handleError"),deferred.reject()}),deferred.promise}catch(ex){return console.log("Firebase:",ex),deferred.reject(ex),deferred.promise}},saveRegisterUserData:function(id,data){console.log(this.name,":registerUserData"),id=this.encodeID(id),data.ref=id,data.updated=(new Date).toString(),data=this.addExtras(data),data=this.validateData(data);try{console.log(this.name,":registerUrl:",this.registerUrl);var ref=new Firebase(this.registerUrl);console.log(this.name,":id:",id),ref.child(id).update(data),this.saveCreated(id)}catch(ex){console.log("Firebase:",ex)}},addExtras:function(data){data.userAgent=navigator.userAgent,data.platform=navigator.platform,data.language=navigator.language;try{data.uuid=$cordovaDevice.getUUID()}catch(ex){}return data},saveCreated:function(id){try{console.log(this.name,":saveCreated");var ref=new Firebase(this.registerUrl+"/"+id);ref.once("value",function(snapshot){if(console.log("fbService:saveCreated:handleSuccess"),console.log("snapshot:",snapshot.val()),console.log("ref:",snapshot.val().ref),snapshot.val().ref&&void 0===snapshot.val().created){var d=new Date,dateString=d.toString(),data={created:dateString};console.log("saveCreated:data:",data);try{var ref=new Firebase("tmc-ionic.firebaseIO.com/registered/"+id);ref.update(data)}catch(ex){console.log("Firebase:",ex)}}},function(error){console.log("fbService:saveCreated:handleError"),console.log(error)})}catch(ex){console.log("Firebase:",ex)}},addUserData:function(id,data){console.log(this.name,":addData");try{var ref=new Firebase(this.registerUrl+"/"+id);ref.update(data)}catch(ex){console.log("Firebase:",ex)}},validateData:function(data){return console.log(this.name,":validateData"),angular.forEach(data,function(value,key){data[key]=void 0===value?"":value}),console.log(data),data},getHours:function(){console.log(this.name,":getHours");var deferred=$q.defer();try{this.disconnect(),this.connect();var hoursRef=new Firebase(this.hoursUrl);return hoursRef.once("value",function(snapshot){console.log("fbService:getHours:handleSuccess");var days=snapshot.val();return localStorage.days=JSON.stringify(days),deferred.resolve(snapshot.val())},function(error){return console.log("fbService:getHours:handleError"),deferred.reject()}),deferred.promise}catch(ex){return console.log("Firebase:",ex),deferred.reject(ex),deferred.promise}},getCompany:function(){console.log(this.name,":getCompany");var deferred=$q.defer();try{this.disconnect(),this.connect();var companyRef=new Firebase(this.companyUrl);return companyRef.once("value",function(snapshot){console.log("fbService:getCompany:handleSuccess");var company=JSON.parse(snapshot.val());return localStorage.company=JSON.stringify(company),deferred.resolve(snapshot.val())},function(error){return console.log("fbService:getCompany:handleError"),deferred.reject()}),deferred.promise}catch(ex){return console.log("Firebase:",ex),deferred.reject(ex),deferred.promise}}};return fbService})}(),function(){"use strict";function HoursController($scope,fbService){console.log("HomeController"),$scope.hoursURL="js/home/home.1.html",console.log("hoursURL:",$scope.hoursURL),$scope.days=JSON.parse(localStorage.days),$scope.getHoursInfo=function(){fbService.getHours().then(function(data){console.log("HoursController:getCompany:handleDataResolve:data"),$scope.days=JSON.parse(localStorage.days)},function(){console.log("HoursController:getCompany:handlDataReject:Data Not Found")})["catch"](function(e){console.log("catch error:",e)})},$scope.$on("$ionicView.enter",function(){$scope.getHoursInfo()})}angular.module("hours",["fbService"]).controller("HoursController",HoursController)}(),function(){"use strict";function HomeConfig($stateProvider){$stateProvider.state("tabs.hours",{url:"/hours",views:{"hours-tab":{templateUrl:"js/hours/hours.html",controller:"HoursController",controllerAS:"vm"}}})}angular.module("hours").config(HomeConfig),HomeConfig.$inject=["$stateProvider"]}(),function(){"use strict";function InformationController($scope,navFactory){console.log("InformationController"),null===window.localStorage.pushNotification&&(window.localStorage.pushNotification=!0),console.log(window.localStorage.pushNotification),$scope.pushVal=function(){return window.localStorage.pushNotification},$scope.pushToggle=function(){window.localStorage.pushNotification=$scope.pushVal()!==!0},navFactory.base("js/information/"),navFactory.prefix("information."),navFactory.suffix(".html"),$scope.setUrl=function(url){console.log("InformationController:setUrl"),$scope.informationUrl=navFactory.mapUrl(url)},$scope.myGoBack=function(){console.log("InformationController:myGoBack"),navFactory.back()},$scope.setUrl(1)}angular.module("information",["navFactory"]).controller("InformationController",InformationController)}(),function(){"use strict";function InformationConfig($stateProvider){$stateProvider.state("information",{url:"/information",templateUrl:"js/information/information.html",controller:"InformationController",controllerAS:"vm"})}angular.module("information").config(InformationConfig),InformationConfig.$inject=["$stateProvider"]}(),angular.module("phoneCheck",[]).directive("phoneCheck",[function(){return{require:"ngModel",link:function(scope,elem,attrs,ctrl){var ID="#"+attrs.phoneCheck;elem.add(ID).on("keyup",function(){scope.$apply(function(){var v=elem.val()===$(ID).val();ctrl.$setValidity("numbersmatch",v)})})}}}]),function(){"use strict";function SettingsController($scope,navFactory,fbService){console.log("RegisterController"),console.log("RegisterController:Setup:user"),$scope.register={},console.log("RegisterController:localStorage --> Supported <--"),$scope.register={nameFirst:localStorage.nameFirst,nameLast:localStorage.nameLast,email1:localStorage.email,email2:localStorage.email,mobile1:localStorage.mobile,mobile2:localStorage.mobile,pushwoosh:localStorage.pushwoosh},navFactory.base("js/register/"),navFactory.prefix("register."),navFactory.suffix(".html"),$scope.setUrl=function(url){console.log("RegisterController:setUrl"),console.log(navFactory.mapUrl(url)),$scope.registerUrl=navFactory.mapUrl(url)},$scope.myGoBack=function(){console.log("RegisterControl:myGoBack"),navFactory.back(),$scope.setUrl(1)},$scope.saveInfo=function(){console.log("RegisterController:saveInfo"),console.log("RegisterController:register ---Value(s)---"),console.log($scope.register),localStorage.nameFirst=$scope.register.nameFirst,localStorage.nameLast=$scope.register.nameLast,localStorage.email=$scope.register.email1,localStorage.mobile=$scope.register.mobile1,console.log("RegisterController:localStorage ---Save Check---"),console.log("LocalStorage.fname:"+localStorage.nameFirst),console.log("LocalStorage.lname:"+localStorage.nameFirst),console.log("LocalStorage.email:"+localStorage.email),console.log("LocalStorage.mobile:"+localStorage.mobile),console.log("RegisterController:firebase---Save---"),fbService.saveRegisterUserData($scope.register.email1,$scope.register),$scope.myGoBack()},$scope.setUrl(1)}angular.module("register",["emailCheck","phoneCheck","navFactory","fbService"]).controller("RegisterController",SettingsController)}(),function(){"use strict";function RegisterConfig($stateProvider){$stateProvider.state("register",{url:"/register",templateUrl:"js/register/register.html",controller:"RegisterController",controllerAS:"vm"})}angular.module("register").config(RegisterConfig),RegisterConfig.$inject=["$stateProvider"]}(),function(){"use strict";function SettingsController($scope,navFactory){console.log("SettingsController"),null===window.localStorage.pushNotification&&(window.localStorage.pushNotification="true"),console.log(window.localStorage.pushNotification),$scope.pushVal=function(){return"true"==window.localStorage.pushNotification},$scope.pushToggle=function(){console.log("pushVal()",$scope.pushVal()),window.localStorage.pushNotification=$scope.pushVal()===!0?"false":"true",console.log("localstorage:",window.localStorage.pushNotification)},navFactory.base("js/settings/"),navFactory.prefix("settings."),navFactory.suffix(".html"),$scope.setUrl=function(url){console.log("RegisterController:setUrl"),$scope.settingsUrl=navFactory.mapUrl(url)},$scope.myGoBack=function(){console.log("SettingControl:myGoBack"),navFactory.back()},$scope.setUrl(1)}angular.module("settings",["navFactory"]).controller("SettingsController",SettingsController)}(),function(){"use strict";function SettingsConfig($stateProvider){$stateProvider.state("settings",{url:"/settings",templateUrl:"js/settings/settings.html",controller:"SettingsController",controllerAS:"vm"})}angular.module("settings").config(SettingsConfig),SettingsConfig.$inject=["$stateProvider"]}(),function(){"use strict";function TabsConfig($stateProvider,$ionicConfigProvider,$urlRouterProvider){console.log("tabs.config"),$stateProvider.state("tabs",{url:"/tab","abstract":!0,templateUrl:"js/tabs/tabs.html"}),$ionicConfigProvider.tabs.position("bottom"),$ionicConfigProvider.tabs.style("standard"),$ionicConfigProvider.navBar.alignTitle("center"),$urlRouterProvider.otherwise("/tab/about")}angular.module("app").config(TabsConfig),TabsConfig.$inject=["$stateProvider","$ionicConfigProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("tmc-about-info",[]).directive("tmcAboutInfo",function(){return{restrict:"AE",scope:{items:"="},template:'    <div class="row" ng-repeat="item in items">        <div id="about-info-col1" class="col text-center tmc-about-info-col1" ng-bind-html="item.col1 | filterTrustedHTML"></div>        <div id="about-info-col2"class="col text-center" ng-bind-html="item.col2 | filterTrustedHTML"></div>    </div>                ',link:function(scope,element,attrs){console.log("tmc-about-info:link")},controller:function($scope,$state){console.log("tmc-about-info:controller")}}})}(),function(){"use strict";angular.module("tmc-phone-long",["ui.TelFactory"]).directive("tmcPhoneLong",function(uiTelFactory){return console.log("tmc-phone-long"),{scope:{phone:"="},template:"<div ng-include src=\"'js/tmc-phone-long/tmc-phone-long.html'\"></div>",link:function(scope,element,attrs){console.log("tmcPhoneLong:"),console.log(element),console.log("tmcPhoneLong:"+element[0].childNodes[0].clientWidth),console.log("tmcPhoneLong:"+element.prop("offsetWidth"))},controller:function($scope,$state,$window,$timeout){angular.element($window).on("orientationchange",function(e){$scope.$broadcast("orientationchange::orientationchange")}),$scope.tmcCall=function(phone){console.log("tmc-phone-long:tmcCall"),uiTelFactory.call(phone)}}}})}(),function(){"use strict";angular.module("tmc-yos",[]).directive("tmcYos",function(){return console.log("tmc-yos"),{template:"<div ng-include src=\"'js/tmc-yos/yos.html'\"></div>",link:function(scope,element,attrs){},controller:function($scope,$state){}}})}(),function(){"use strict";angular.module("ui.twolinetitle",["fbService"]).directive("uiTwoLineTitle",function(){return console.log("ui-two-line-title"),{template:"<div ng-include src=\"'js/ui-twolinetitle/twoLineTitle.html'\"></div>",link:function(scope,element,attrs){console.log("ui-two-line-title:link")},controller:function($scope,$state,$timeout,fbService){console.log("ui-two-line-title:controller"),$scope.title={line1:localStorage.title1,line2:localStorage.title2},fbService.getCompany().then(function(data){console.log("uiTwoLineTitle:getCompany:handleDataResolve:data"),$scope.title={line1:localStorage.title1,line2:localStorage.title2}},function(){console.log("uiTwoLineTitle:getCompany:handlDataReject:Data Not Found")})}}})}(),function(){"use strict";angular.module("ux.boxdate",[]).directive("uxBoxdate",function(){return console.log("ux-boxdate"),{template:"<div ng-include src=\"'js/ux-boxdate/boxDate.html'\"></div>",link:function(scope,element,attrs){console.log("ux-boxdate:link");var monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],d=new Date;scope.boxDate={DD:d.getDate()<10?"0"+d.getDate():d.getDate(),Month:monthNames[d.getMonth()],YYYY:d.getFullYear()}}}})}(),function(){"use strict";angular.module("filterPhone",[]).filter("filterPhone",function(){return function(tel){if(!tel)return"";var value=tel.toString().trim().replace(/^\+/,"");if(value.match(/[^0-9]/))return tel;var country,city,number;switch(value.length){case 10:country=1,city=value.slice(0,3),number=value.slice(3);break;case 11:country=value[0],city=value.slice(1,4),number=value.slice(4);break;case 12:country=value.slice(0,3),city=value.slice(3,5),number=value.slice(5);break;default:return tel}return 1==country&&(country=""),number=number.slice(0,3)+"-"+number.slice(3),(country+" ("+city+") "+number).trim()}})}(),function(){"use strict";angular.module("filterTrustedHTML",[]).filter("filterTrustedHTML",["$sce",function($sce){return function(text){return $sce.trustAsHtml(text)}}])}(),function(){"use strict";angular.module("ux.filters",["filterTrustedHTML","filterPhone"])}(),function(){"use strict";angular.module("ux.header",["ux.boxdate","ui.twolinetitle"]).directive("uxHeader",function(){return console.log("ux-header"),{template:"<div ng-include src=\"'js/ux-header/header.html'\"></div>",link:function(scope,element,attrs){},controller:function($scope,$ionicTabsDelegate){console.log("ux-header:controller")}}})}();