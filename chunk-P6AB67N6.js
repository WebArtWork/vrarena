import{e as M}from"./chunk-A5UXD4IR.js";import{Ab as S,M as n,N as p,O as d,T as u,Z as _,Za as v,db as w,f as m,i as r,ib as g,jb as C,r as f,rb as y,s as h,yb as b}from"./chunk-SQEJUM2J.js";var k={formId:"mafia",title:"Mafia",components:[{name:"Text",key:"name",focused:!0,fields:[{name:"Placeholder",value:"fill mafia title"},{name:"Label",value:"Title"}]},{name:"Text",key:"description",fields:[{name:"Placeholder",value:"fill mafia description"},{name:"Label",value:"Description"}]}]};var j=(()=>{class i extends C{constructor(){super({name:"mafia"})}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275prov=f({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var x=(()=>{class i{constructor(o,e,t,s,c){this._translate=o,this._mafiaService=e,this._alert=t,this._form=s,this._core=c,this.columns=["name","description"],this.form=this._form.getForm("mafia",k),this.config={paginate:this.setRows.bind(this),perPage:20,setPerPage:this._mafiaService.setPerPage.bind(this._mafiaService),allDocs:!1,create:()=>{this._form.modal(this.form,{label:"Create",click:(a,l)=>m(this,null,function*(){l(),this._preCreate(a),yield r(this._mafiaService.create(a)),this.setRows()})})},update:a=>{this._form.modal(this.form,[],a).then(l=>{this._core.copy(l,a),this._mafiaService.update(a)})},delete:a=>{this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this mafia?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>m(this,null,function*(){yield r(this._mafiaService.delete(a)),this.setRows()})}]})},buttons:[{icon:"cloud_download",click:a=>{this._form.modalUnique("mafia","url",a)}}],headerButtons:[{icon:"playlist_add",click:this._bulkManagement(),class:"playlist"},{icon:"edit_note",click:this._bulkManagement(!1),class:"edit"}]},this.rows=[],this._page=1,this.setRows()}setRows(o=this._page){this._page=o,this._core.afterWhile(this,()=>{this._mafiaService.get({page:o}).subscribe(e=>{this.rows.splice(0,this.rows.length),this.rows.push(...e)})},250)}_bulkManagement(o=!0){return()=>{this._form.modalDocs(o?[]:this.rows).then(e=>m(this,null,function*(){if(o)for(let t of e)this._preCreate(t),yield r(this._mafiaService.create(t));else{for(let t of this.rows)e.find(s=>s._id===t._id)||(yield r(this._mafiaService.delete(t)));for(let t of e){let s=this.rows.find(c=>c._id===t._id);s?(this._core.copy(t,s),yield r(this._mafiaService.update(s))):(this._preCreate(t),yield r(this._mafiaService.create(t)))}}this.setRows()}))}}_preCreate(o){delete o.__created}static{this.\u0275fac=function(e){return new(e||i)(n(y),n(j),n(g),n(S),n(w))}}static{this.\u0275cmp=p({type:i,selectors:[["ng-component"]],standalone:!1,decls:1,vars:3,consts:[["title","Games",3,"columns","config","rows"]],template:function(e,t){e&1&&_(0,"wtable",0),e&2&&u("columns",t.columns)("config",t.config)("rows",t.rows)},dependencies:[b],encapsulation:2})}}return i})();var P=[{path:"",component:x}],z=(()=>{class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=d({type:i})}static{this.\u0275inj=h({imports:[v.forChild(P),M]})}}return i})();export{z as GamesModule};
