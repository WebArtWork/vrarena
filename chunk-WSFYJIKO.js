import{a as V}from"./chunk-JVLVIVW6.js";import{e as Y}from"./chunk-A5UXD4IR.js";import{B as I,Ha as k,Ia as j,J as c,M as d,N as f,O as U,R as w,T as s,Va as q,W as $,X as e,Y as t,Z as _,Za as J,aa as b,ba as l,ca as m,f as P,hb as v,ka as o,kb as K,la as W,ma as Q,ob as X,ra as z,s as R,tb as h,w as B,x as S,y}from"./chunk-SQEJUM2J.js";function se(n,p){n&1&&_(0,"app-games")}function me(n,p){if(n&1&&_(0,"video",5),n&2){let i=m().$implicit;s("id","camera_"+i.user._id)("muted",!0)}}function ce(n,p){if(n&1&&_(0,"video",6),n&2){let i=m().$implicit;s("id","camera_"+i.user._id)}}function de(n,p){if(n&1&&(e(0,"div")(1,"span"),o(2),t(),w(3,me,1,2,"video",3)(4,ce,1,1,"video",4),t()),n&2){let i=p.$implicit,r=m(2);c(2),W(i.user.name||i.user.email),c(),s("ngIf",i.user._id===r.userService.user._id),c(),s("ngIf",i.user._id!==r.userService.user._id)}}function le(n,p){if(n&1&&w(0,de,5,3,"div",2),n&2){let i=m();s("ngForOf",i.players)}}function pe(n,p){if(n&1){let i=b();e(0,"app-lobby",7),l("fetch",function(){S(i);let a=m();return y(a.fetch())}),t()}if(n&2){let i=m();s("game",i.game)}}function ue(n,p){if(n&1){let i=b();e(0,"app-day",7),l("fetch",function(){S(i);let a=m();return y(a.fetch())}),t()}if(n&2){let i=m();s("game",i.game)}}function _e(n,p){if(n&1){let i=b();e(0,"app-night",7),l("fetch",function(){S(i);let a=m();return y(a.fetch())}),t()}if(n&2){let i=m();s("game",i.game)}}function fe(n,p){if(n&1){let i=b();e(0,"app-ended",7),l("fetch",function(){S(i);let a=m();return y(a.fetch())}),t()}if(n&2){let i=m();s("game",i.game)}}var D=(()=>{class n{constructor(i,r,a,T,oe){this.userService=i,this._socket=r,this._http=a,this._rtc=T,this._router=oe,this.state=this._router.url.includes("mafia/")?"lobby":"games",this.gameId=this._router.url.includes("mafia/")?this._router.url.replace("/mafia/",""):"",this.gameId&&this.fetch(),this._socket.on("mafia",Xe=>P(this,[Xe],function*({userA:u,userB:g,offer:H,answer:G,candidate:N}){if(g)if(H&&this.userService.user._id===u){console.log("we have new connection"),this._rtc.getPeer(g)||(yield this._rtc.createPeer(g));let E=this._rtc.getPeer(g);E.ontrack=x=>{let[L]=x.streams,C=document.getElementById("camera_"+g);C&&(C.srcObject=L)},this._socket.emit("mafia",{answer:yield this._rtc.createAnswer(g,H),userA:u,userB:g})}else if(G&&this.userService.user._id===g){if(console.log("we approve connection"),!this._rtc.getPeer(u)){yield this._rtc.createPeer(u);let E=this._rtc.getPeer(u);E.ontrack=x=>{let[L]=x.streams,C=document.getElementById("camera_"+u);C&&(C.srcObject=L)}}yield this._rtc.setRemoteAnswer(u,G)}else N&&this.userService.user._id===u&&(console.log("we add ice",N),this._rtc.addIceCandidate(g,N));else{console.log("we have new user"),yield this._rtc.createPeer(u);let E=this._rtc.getPeer(u);E.onicecandidate=x=>{console.log("onicecandidate",x),x.candidate&&this._socket.emit("mafia",{candidate:x.candidate,userB:this.userService.user._id,userA:u})},E.ontrack=x=>{let[L]=x.streams,C=document.getElementById("camera_"+u);C&&(C.srcObject=L)},this._socket.emit("mafia",{offer:yield T.createOffer(u),userA:u,userB:this.userService.user._id})}}))}fetch(){this._http.post("/api/mafia/fetch",{url:this.gameId}).subscribe(i=>P(this,null,function*(){if(i){if(this.game=i,this.state=i.state,!this.players||this.players.length!==i.players.length){this.players=i.players;let r=document.getElementById("camera_"+this.userService.user._id);r&&(r.srcObject=yield this._rtc.initLocalStream()),this._socket.emit("mafia",{userA:this.userService.user._id})}}else this._router.navigateByUrl("/mafia")}))}static{this.\u0275fac=function(r){return new(r||n)(d(V),d(K),d(v),d(X),d(q))}}static{this.\u0275cmp=f({type:n,selectors:[["ng-component"]],standalone:!1,decls:6,vars:6,consts:[[4,"ngIf"],[3,"game","fetch",4,"ngIf"],[4,"ngFor","ngForOf"],["playsinline","","autoplay","",3,"id","muted",4,"ngIf"],["playsinline","","autoplay","",3,"id",4,"ngIf"],["playsinline","","autoplay","",3,"id","muted"],["playsinline","","autoplay","",3,"id"],[3,"fetch","game"]],template:function(r,a){r&1&&w(0,se,1,0,"app-games",0)(1,le,1,1,"div")(2,pe,1,1,"app-lobby",1)(3,ue,1,1,"app-day",1)(4,_e,1,1,"app-night",1)(5,fe,1,1,"app-ended",1),r&2&&(s("ngIf",a.state==="games"),c(),$(a.gameId&&a.game?1:-1),c(),s("ngIf",a.state==="lobby"),c(),s("ngIf",a.state==="day"),c(),s("ngIf",a.state==="night"),c(),s("ngIf",a.state==="ended"))},styles:["video[_ngcontent-%COMP%]{width:300px;height:300px;object-fit:cover}"]})}}return n})();function ve(n,p){if(n&1&&(e(0,"div",6)(1,"div",7),o(2),t(),e(3,"div",9),o(4," Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptatum facilis sit necessitatibus, rem consectetur pariatur sapiente incidunt laudantium praesentium aut iste omnis suscipit autem deleniti, nisi temporibus obcaecati eligendi? "),t(),e(5,"div",10)(6,"div",11)(7,"div",12),o(8," Smth here "),t()(),e(9,"div",11)(10,"div",12),o(11," Smth here "),t()(),e(12,"div",11)(13,"div",12),o(14," Smth here "),t()(),e(15,"div",11)(16,"div",12),o(17," Smth here "),t()(),e(18,"div",11)(19,"div",12),o(20," Smth here "),t()(),e(21,"div",11)(22,"div",12),o(23," Smth here "),t()(),e(24,"div",11)(25,"div",12),o(26," Smth here "),t()()()()),n&2){let i=p.$implicit;c(2),Q(" ",i.author.name||i.author.email," ")}}var A=(()=>{class n{constructor(i,r){this._http=i,this._router=r,this.games=[],this._http.get("/api/mafia/get").subscribe(a=>this.games=a)}create(){this._http.post("/api/mafia/create",{}).subscribe(i=>{this._router.navigateByUrl("/mafia/"+i.url)})}static{this.\u0275fac=function(r){return new(r||n)(d(v),d(q))}}static{this.\u0275cmp=f({type:n,selectors:[["app-games"]],standalone:!1,decls:11,vars:1,consts:[[1,"documents-wrapper"],[1,"documents-container"],[1,"documents-list"],[1,"documents-main"],[1,"documents-main-content"],["class","documents-main-row",4,"ngFor","ngForOf"],[1,"documents-main-row"],[1,"documents__title"],[3,"click"],[1,"documents__description"],[1,"documents-tags"],[1,"documents-tags__wrap"],[1,"documents-tags__item"]],template:function(r,a){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),w(5,ve,27,1,"div",5),e(6,"div",6)(7,"div",7),o(8,"Start new game"),t(),e(9,"wbutton",8),l("click",function(){return a.create()}),o(10,"Go"),t()()()()()()()),r&2&&(c(5),s("ngForOf",a.games))},dependencies:[k,h],encapsulation:2})}}return n})();function he(n,p){if(n&1){let i=b();e(0,"wbutton",7),l("click",function(){S(i);let a=m();return y(a.join())}),o(1,"Add my self as player"),t()}}function ge(n,p){if(n&1){let i=b();e(0,"wbutton",7),l("click",function(){S(i);let a=m();return y(a.leave())}),o(1,"Remove my self from players"),t()}}function xe(n,p){if(n&1){let i=b();e(0,"wbutton",7),l("click",function(){S(i);let a=m();return y(a.start())}),o(1,"Start game"),t()}}var ee=(()=>{class n{get joined(){return this.game?.players.map(i=>i.user._id).includes(this._userService.user._id)}get author(){return this.game?.author._id===this._userService.user._id}constructor(i,r){this._http=i,this._userService=r,this.fetch=new I}ngOnChanges(i){i.game&&(this.game=i.game.currentValue)}join(){this._http.post("/api/mafia/join",this.game).subscribe(()=>{this.fetch.emit()})}leave(){this._http.post("/api/mafia/leave",this.game).subscribe(()=>{this.fetch.emit()})}start(){this._http.post("/api/mafia/start",this.game).subscribe(()=>{this.fetch.emit()})}static{this.\u0275fac=function(r){return new(r||n)(d(v),d(V))}}static{this.\u0275cmp=f({type:n,selectors:[["app-lobby"]],inputs:{game:"game"},outputs:{fetch:"fetch"},standalone:!1,features:[B],decls:9,vars:3,consts:[[1,"documents-wrapper"],[1,"documents-container"],[1,"documents-list"],[1,"documents-main"],[1,"documents-main-content"],[1,"documents-main-row"],[3,"click",4,"ngIf"],[3,"click"]],template:function(r,a){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),w(6,he,2,0,"wbutton",6)(7,ge,2,0,"wbutton",6)(8,xe,2,0,"wbutton",6),t()()()()()()),r&2&&(c(6),s("ngIf",!a.joined),c(),s("ngIf",a.joined),c(),s("ngIf",a.author))},dependencies:[j,h],encapsulation:2})}}return n})();var te=(()=>{class n{constructor(i){this._http=i,this.fetch=new I}night(){this._http.post("/api/mafia/night",this.game).subscribe(()=>{this.fetch.emit()})}static{this.\u0275fac=function(r){return new(r||n)(d(v))}}static{this.\u0275cmp=f({type:n,selectors:[["app-day"]],inputs:{game:"game"},outputs:{fetch:"fetch"},standalone:!1,decls:8,vars:0,consts:[[1,"documents-wrapper"],[1,"documents-container"],[1,"documents-list"],[1,"documents-main"],[1,"documents-main-content"],[1,"documents-main-row"],[3,"click"]],template:function(r,a){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"wbutton",6),l("click",function(){return a.night()}),o(7,"Sun down"),t()()()()()()())},dependencies:[h],encapsulation:2})}}return n})();var ie=(()=>{class n{constructor(i){this._http=i,this.fetch=new I}day(){this._http.post("/api/mafia/day",this.game).subscribe(()=>{this.fetch.emit()})}static{this.\u0275fac=function(r){return new(r||n)(d(v))}}static{this.\u0275cmp=f({type:n,selectors:[["app-night"]],inputs:{game:"game"},outputs:{fetch:"fetch"},standalone:!1,decls:8,vars:0,consts:[[1,"documents-wrapper"],[1,"documents-container"],[1,"documents-list"],[1,"documents-main"],[1,"documents-main-content"],[1,"documents-main-row"],[3,"click"]],template:function(r,a){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"wbutton",6),l("click",function(){return a.day()}),o(7,"Sun up"),t()()()()()()())},dependencies:[h],encapsulation:2})}}return n})();var ne=(()=>{class n{static{this.\u0275fac=function(r){return new(r||n)}}static{this.\u0275cmp=f({type:n,selectors:[["app-ended"]],inputs:{game:"game"},standalone:!1,decls:129,vars:0,consts:[[1,"documents-wrapper"],[1,"documents-container"],[1,"documents-list"],[1,"documents-main"],[1,"documents-main-content"],[1,"documents-main-row"],[1,"documents__title"],[1,"documents__description"],[1,"documents-tags"],[1,"documents-tags__wrap"],[1,"documents-tags__item"],[1,"documents-triggers"],[1,"documents-triggers__wrap"],[1,"documents-triggers__item"],[1,"documents-triggers__img"],["src","/assets/default.png","alt",""],[1,"documents-triggers__title"],[1,"documents-triggers__description"],[1,"documents-wrap"],[1,"documents-img"],[1,"documents-text"],[1,"documents-text__title"],[1,"documents-text__description"],["href","",1,"documents__btn"],[1,"documents-products-list"],[1,"documents-products__wrap"],[1,"documents-products__item"],[1,"documents-products__img"],["src","assets/logo.png","alt",""],[1,"documents-products__title"],[1,"documents-products__description"],[1,"documents-products__btn"],["type","primary"]],template:function(r,a){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6),o(7," Lorem ipsum dolor sit amet consectetur adipisicing elit. "),t(),e(8,"div",7),o(9," Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptatum facilis sit necessitatibus, rem consectetur pariatur sapiente incidunt laudantium praesentium aut iste omnis suscipit autem deleniti, nisi temporibus obcaecati eligendi? "),t()(),e(10,"div",5)(11,"div",6),o(12," Lorem ipsum dolor sit amet consectetur adipisicing elit. "),t(),e(13,"div",7),o(14," Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptatum facilis sit necessitatibus, rem consectetur pariatur sapiente incidunt laudantium praesentium aut iste omnis suscipit autem deleniti, nisi temporibus obcaecati eligendi? "),t(),e(15,"div",8)(16,"div",9)(17,"div",10),o(18," Smth here "),t()(),e(19,"div",9)(20,"div",10),o(21," Smth here "),t()(),e(22,"div",9)(23,"div",10),o(24," Smth here "),t()(),e(25,"div",9)(26,"div",10),o(27," Smth here "),t()(),e(28,"div",9)(29,"div",10),o(30," Smth here "),t()(),e(31,"div",9)(32,"div",10),o(33," Smth here "),t()(),e(34,"div",9)(35,"div",10),o(36," Smth here "),t()()()(),e(37,"div",5)(38,"div",6),o(39," Lorem ipsum dolor sit amet consectetur adipisicing elit. "),t(),e(40,"div",11)(41,"div",12)(42,"div",13)(43,"div",14),_(44,"img",15),t(),e(45,"div",16),o(46," Trigger title... "),t(),e(47,"div",17),o(48," Lorem ipsum dolor sit amet consectetur adipisicing elit "),t()()(),e(49,"div",12)(50,"div",13)(51,"div",14),_(52,"img",15),t(),e(53,"div",16),o(54," Trigger title... "),t(),e(55,"div",17),o(56," Lorem ipsum dolor sit amet consectetur adipisicing elit "),t()()(),e(57,"div",12)(58,"div",13)(59,"div",14),_(60,"img",15),t(),e(61,"div",16),o(62," Trigger title... "),t(),e(63,"div",17),o(64," Lorem ipsum dolor sit amet consectetur adipisicing elit "),t()()(),e(65,"div",12)(66,"div",13)(67,"div",14),_(68,"img",15),t(),e(69,"div",16),o(70," Trigger title... "),t(),e(71,"div",17),o(72," Lorem ipsum dolor sit amet consectetur adipisicing elit "),t()()()()(),e(73,"div",5)(74,"div",6),o(75," Lorem ipsum dolor sit amet consectetur adipisicing elit. "),t(),e(76,"div",18)(77,"div",19),_(78,"img",15),t(),e(79,"div",20)(80,"div",21),o(81," Lorem ipsum dolor sit amet consectetur adipisicing elit. "),t(),e(82,"div",22)(83,"p"),o(84," Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur accusantium quis minus mollitia voluptatum illo hic laborum laboriosam et commodi. Quas nulla doloribus mollitia vero nostrum laudantium dolores quidem provident. "),t(),e(85,"p"),o(86," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt accusantium eveniet quo? Minus quisquam odit magnam nulla. "),t(),e(87,"p"),o(88," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt accusantium eveniet quo? Minus quisquam odit magnam nulla. "),t()()()()(),e(89,"div",5)(90,"div",6),o(91," Lorem ipsum dolor sit amet consectetur adipisicing elit. "),t(),e(92,"a",23),o(93,"Press button"),t()(),e(94,"div",5)(95,"div",24)(96,"div",25)(97,"div",26)(98,"div",27),_(99,"img",28),t(),e(100,"div",29),o(101," Title of product card here "),t(),e(102,"div",30),o(103," Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nesciunt voluptates reiciendis sequi assumenda? Illo porro qui ducimus sint provident amet, molestias ut eligendi quod cumque, laudantium dicta quasi. Iure! "),t(),e(104,"div",31)(105,"wbutton",32),o(106,"Hello World"),t()()()(),e(107,"div",25)(108,"div",26)(109,"div",27),_(110,"img",28),t(),e(111,"div",29),o(112," Title of product card here "),t(),e(113,"div",30),o(114," Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nesciunt voluptates reiciendis sequi assumenda? Illo porro qui ducimus sint provident amet, molestias ut eligendi quod cumque, laudantium dicta quasi. Iure! "),t(),e(115,"div",31)(116,"wbutton",32),o(117,"Hello World"),t()()()(),e(118,"div",25)(119,"div",26)(120,"div",27),_(121,"img",28),t(),e(122,"div",29),o(123," Title of product card here "),t(),e(124,"div",30),o(125," Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nesciunt voluptates reiciendis sequi assumenda? Illo porro qui ducimus sint provident amet, molestias ut eligendi quod cumque, laudantium dicta quasi. Iure! "),t(),e(126,"div",31)(127,"wbutton",32),o(128,"Hello World"),t()()()()()()()()()()())},dependencies:[h],encapsulation:2})}}return n})();var Se=[{path:"",component:D},{path:":gameUrl",component:D}],Je=(()=>{class n{static{this.\u0275fac=function(r){return new(r||n)}}static{this.\u0275mod=U({type:n})}static{this.\u0275inj=R({imports:[J.forChild(Se),Y]})}}return n})();z(D,function(){return[k,j,A,ee,te,ie,ne]},[]);export{Je as MafiaModule};
