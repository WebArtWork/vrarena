import{a as O}from"./chunk-JVLVIVW6.js";import{a as j,d as p,e as F}from"./chunk-A5UXD4IR.js";import{Ab as T,Bb as E,Ia as y,J as f,M as d,N as _,O as b,R as w,T as c,X as i,Y as n,Za as C,aa as P,ba as s,ca as m,db as v,ka as l,qb as M,s as g,sa as x,sb as k,tb as S,x as u,y as h}from"./chunk-SQEJUM2J.js";var z=()=>({"border-radius":"var(--c-img-round)",width:"52px",height:"52px"});function D(t,A){if(t&1){let e=P();i(0,"wform",13),s("wChange",function(){u(e);let o=m();return h(o.update())}),n()}if(t&2){let e=m();c("config",e.formProfile)("submition",e.user)}}var I=(()=>{class t{constructor(e,r,o){this._form=e,this._core=r,this.us=o,this.url=M.url,this.formProfile=this._form.getForm("profile",{formId:"profile",title:"Profile Settings",components:[{name:"Text",key:"name",focused:!0,fields:[{name:"Placeholder",value:"Enter your name"},{name:"Label",value:"Name"}]},{name:"Text",key:"phone",fields:[{name:"Placeholder",value:"Enter your phone"},{name:"Label",value:"Phone"}]}]}),this.formPassword=this._form.getForm("change password",{formId:"change password",title:"Change password",components:[{name:"Password",key:"oldPass",focused:!0,fields:[{name:"Placeholder",value:"Enter your old password"},{name:"Label",value:"Old Password"}]},{name:"Password",key:"newPass",fields:[{name:"Placeholder",value:"Enter your new password"},{name:"Label",value:"New Password"}]}]}),this._core.onComplete("us.user").then(()=>{let a={};this._core.copy(this.us.user,a),this.user=a})}update(){this._core.copy(this.user,this.us.user),this.us.updateMe()}changePassword(){this._form.modal(this.formPassword,{label:"Change",click:(e,r)=>{this.us.changePassword(e.oldPass,e.newPass),r()}}).then(e=>{this.us.changePassword(e.oldPass,e.newPass)})}updateThumb(e){this.us.user.thumb=Array.isArray(e)?e[0]:e,this.us.updateMe()}static{this.\u0275fac=function(r){return new(r||t)(d(T),d(v),d(O))}}static{this.\u0275cmp=_({type:t,selectors:[["app-profile"]],standalone:!1,decls:18,vars:8,consts:[[1,"container"],[1,"profile__header"],[1,"avatar","_profile"],["err","assets/default.png","container","user",3,"update","value","name","isPhoto","imgStyle","height","width"],[1,"profile__body"],[3,"config","submition","wChange",4,"ngIf"],[1,"profile__footer"],[1,"profile__logout"],["type","danger",3,"click"],[1,"material-icons"],["translate",""],[1,"profile__password"],["type","link","translate","",3,"click"],[3,"wChange","config","submition"]],template:function(r,o){r&1&&(i(0,"div",0)(1,"wcard")(2,"div",1)(3,"div")(4,"div",2)(5,"ngx-file",3),s("update",function(L){return o.updateThumb(L)}),n()()()(),i(6,"div",4),w(7,D,1,2,"wform",5),i(8,"div",6)(9,"div",7)(10,"wbutton",8),s("click",function(){return o.us.logout()}),i(11,"span",9),l(12,"logout"),n(),i(13,"span",10),l(14,"Profile.Logout"),n()()(),i(15,"div",11)(16,"wbutton",12),s("click",function(){return o.changePassword()}),l(17," Profile.Change Password "),n()()()()()()),r&2&&(f(5),c("value",o.us.thumb)("name",o.us.user._id+".jpg")("isPhoto",!0)("imgStyle",x(7,z))("height",512)("width",512),f(2),c("ngIf",o.user))},dependencies:[k,y,S,j,E,p],styles:["[_ngcontent-%COMP%]:root{--c-white: #fff;--c-basic: #3558ae;--c-primary: #256eff;--c-primary-hover: #0051f1;--c-secondary: rgb(197, 61, 61);--c-secondary-hover: rgb(150, 42, 42);--c-bg-primary: #f3f4f7;--c-bg-secondary: #ffffff;--c-bg-tertiary: #fcfdfe;--c-border: #f0f1f7;--c-shadow: #f3f3f3;--c-text-primary: #666666;--c-text-secondary: #19235c;--c-placeholder: #313335ab;--c-img-round: 50%;--card-background: #fefefe;--card-border-radius: 10px;--card-box-shadow: 0 4px 12px rgba(0, 0, 0, .15);--card-margin-bottom: 24px;--card-header-padding: 20px;--card-header-background: #e0e0e0;--card-body-padding: 20px;--card-section-padding: 10px 0;--card-footer-padding: 20px;--card-footer-background: #e0e0e0;--card-border-width: 2px;--card-border-color: #cccccc;--file-img-border-radius: 50%;--file-add-bg: #28a745;--file-add-bg-hover: #218838;--file-item-border-radius: 10px;--day-name: #988888;--b-radius-btn: 10px;--transition: all .3s;--events: #4c8e9d;--border: rgba(102, 91, 91, .432);--header-doc:#d8d8d8;--doc-products:#f5f5f5;--gradient:linear-gradient(170deg, #c74662 0%, #7251ea 100%);--gradient-hover:linear-gradient( 170deg, #c74662 40%, #7251ea 100%);--violet:#ad90ea}html.dark[_ngcontent-%COMP%]:root{--c-white: #fff;--c-basic: #333;--c-bg-primary: #282828;--c-bg-secondary: #343434;--c-bg-tertiary: #404040;--c-border: #404040;--c-shadow: #444444;--c-text-primary: #ffffff;--c-text-secondary: #ffffff;--c-placeholder: #d3cdcd;--c-calendar: #141414;--day-name: #dad5d5;--border: rgb(255 255 255 / 23%);--header-doc:#1b1b1be3;--doc-products:#252222;--gradient:linear-gradient(170deg, #c74662 0%, #7251ea 100%);--gradient-hover:linear-gradient( 170deg, #c74662 40%, #7251ea 100%);--violet:#c5b5e6}[_nghost-%COMP%]{width:100%}[_nghost-%COMP%]   wcard[_ngcontent-%COMP%]{width:100%;transition:all .3s;display:block}.container[_ngcontent-%COMP%]{padding:unset}.profile__header[_ngcontent-%COMP%]{z-index:9;top:20px;position:absolute;right:30px;letter-spacing:0;line-height:23px;font-weight:500;font-size:20px;color:var(--c-text-primary);display:flex;justify-content:space-between;align-items:center;border-radius:12px}.profile__footer[_ngcontent-%COMP%]{margin-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}@media (max-width: 767.9px){.profile__footer[_ngcontent-%COMP%]{flex-direction:column;align-items:center}.profile__footer[_ngcontent-%COMP%]   .profile__logout[_ngcontent-%COMP%]{order:2;margin-top:20px}}.profile__logout[_ngcontent-%COMP%]   .w-btn[_ngcontent-%COMP%]{margin:0;display:flex;justify-content:space-between;align-items:center}.profile__logout[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{margin-right:10px}.imgClass[_ngcontent-%COMP%]{height:52px;width:52px}.avatar[_ngcontent-%COMP%]{border-radius:50%;border:1px solid var(--c-border);position:relative;margin:0 auto;padding:3px}.avatar._profile[_ngcontent-%COMP%]{width:60px;height:60px}.avatar__img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;border-radius:50%}.avatar__upload[_ngcontent-%COMP%]{cursor:pointer;position:absolute;right:0;bottom:0;width:24px;height:24px;border-radius:50%;background:var(--c-primary);display:flex;justify-content:center;align-items:center;transition:.3s all ease-in-out}.avatar__icon[_ngcontent-%COMP%]{color:#fff;font-size:16px}.profile__password[_ngcontent-%COMP%]{cursor:pointer}"]})}}return t})();var V=[{path:"",component:I}],te=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=b({type:t})}static{this.\u0275inj=g({imports:[C.forChild(V),F,p]})}}return t})();export{te as ProfileModule};
