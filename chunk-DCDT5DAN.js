import{jb as n,r as a}from"./chunk-SQEJUM2J.js";var p=(()=>{class e extends n{constructor(){super({name:"cybersportreservation",replace:t=>{t.status=t.status||"New"}})}yearmonth(){return`${new Date().getFullYear()}.${new Date().getMonth()}`}date(){return`${new Date().getFullYear()}.${new Date().getMonth()+1}.${new Date().getDate()}`}isPastDate(t){let r=new Date;r.setHours(0,0,0,0);let[o,s,i]=t.split(".").map(Number);return new Date(o,s-1,i)<r}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{p as a};
