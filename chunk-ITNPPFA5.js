import{a as E}from"./chunk-54RT3ZRI.js";import{a as w}from"./chunk-JVLVIVW6.js";import{e as C}from"./chunk-A5UXD4IR.js";import{H as _,Ha as h,J as a,M as l,N as k,O as b,R as g,T as p,V as d,Wa as S,X as e,Y as t,Z as m,Za as M,ba as c,ka as s,ma as u,s as f}from"./chunk-SQEJUM2J.js";function T(i,R){if(i&1&&(e(0,"div",22)(1,"div",23)(2,"div",24),m(3,"img",25),t(),e(4,"div",26)(5,"div",27),s(6),t(),e(7,"div",28),s(8),t()()()()),i&2){let o=R.$implicit;a(6),u(" ",o.name," "),a(2),u(" ",o.description," ")}}var O=(()=>{class i{constructor(o,r){this._rankService=o,this.userService=r,this.isMenuOpen=!1,this.ranks=[],this._rankService.get({}).subscribe(n=>this.ranks=n)}back(){window.history.back()}static{this.\u0275fac=function(r){return new(r||i)(l(E),l(w))}}static{this.\u0275cmp=k({type:i,selectors:[["ng-component"]],standalone:!1,decls:28,vars:8,consts:[[1,"documents-wrapper"],[1,"documents-container"],[1,"documents-list"],[1,"documents-header"],[1,"documents-header-left"],[1,"documents-header-left__arrow",3,"click"],[1,"material-icons"],["routerLink","/profile",1,"documents-header-left__avatar"],["alt","",3,"src"],[1,"documents-header__title"],[1,"burger-wrap",3,"click"],[1,"burger"],[1,"documents-sidebar"],[1,"documents-sidebar__close",3,"click"],[1,"documents-sidebar-content"],[1,"documents-sidebar__img"],["src","assets/default.png","alt",""],[1,"documents-sidebar__title"],[1,"documents-sidebar__description"],[1,"documents-main"],[1,"documents-main-content"],["class","documents-main-row",4,"ngFor","ngForOf"],[1,"documents-main-row"],[1,"documents-wrap"],[1,"documents-img"],["src","/assets/default.png","alt",""],[1,"documents-text"],[1,"documents-text__title"],[1,"documents-text__description"]],template:function(r,n){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),c("click",function(){return n.back()}),e(6,"span",6),s(7,"arrow_back_ios"),t()(),e(8,"div",7),m(9,"img",8),t()(),e(10,"div",9),s(11,"Title header"),t(),e(12,"div",10),c("click",function(){return n.isMenuOpen=!n.isMenuOpen}),m(13,"div",11),t()(),e(14,"div",12)(15,"div",13),c("click",function(){return n.isMenuOpen=!n.isMenuOpen}),e(16,"span",6),s(17,"close"),t()(),e(18,"div",14)(19,"div",15),m(20,"img",16),t(),e(21,"div",17),s(22," Title of sidebar... "),t(),e(23,"div",18),s(24," Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint molestiae consequatur quae. Modi corporis rem amet tempore debitis assumenda minima repellat labore expedita quam. Itaque accusamus culpa ullam necessitatibus nisi. "),t()()(),e(25,"div",19)(26,"div",20),g(27,T,9,2,"div",21),t()()()()()),r&2&&(d("documents-wrapper--open",n.isMenuOpen),a(9),p("src",n.userService.thumb,_),a(4),d("burger--close",n.isMenuOpen),a(),d("documents-sidebar--open",n.isMenuOpen),a(13),p("ngForOf",n.ranks))},dependencies:[S,h],encapsulation:2})}}return i})();var x=[{path:"",component:O}],U=(()=>{class i{static{this.\u0275fac=function(r){return new(r||i)}}static{this.\u0275mod=b({type:i})}static{this.\u0275inj=f({imports:[M.forChild(x),C]})}}return i})();export{U as RanksModule};
