(()=>{"use strict";var e,t,n,a,s,i={203:(e,t,n)=>{n.d(t,{Rn:()=>s,oX:()=>i,DT:()=>r,tD:()=>o,Bo:()=>c,p6:()=>l,yQ:()=>h,J3:()=>d,ix:()=>m,BS:()=>u,AV:()=>w});const a="https://async-race-rss.herokuapp.com",s=async(e,t=7)=>{const n=await fetch(`${a}/garage?_page=${e}&_limit=${t}`);return{cars:await n.json(),count:Number(n.headers.get("X-Total-Count"))}},i=async e=>{const t=await fetch(`${a}/garage/${e}`);return await t.json()},r=async e=>{const t=await fetch(`${a}/garage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return await t.json()},o=async e=>{const t=await fetch(`${a}/garage/${e}`,{method:"DELETE"});return await t.json()},c=async(e,t)=>{const n=await fetch(`${a}/garage/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return await n.json()},l=async e=>{const t=await fetch(`${a}/engine?id=${e}&status=started`);return await t.json()},h=async e=>{const t=await fetch(`${a}/engine?id=${e}&status=stopped`);return await t.json()},d=async e=>{const t=await fetch(`${a}/engine?id=${e}&status=drive`);return 200===t.status?await t.json():{success:!1}},m=async(e,t="time",n="ASC",s=10)=>{const r=await fetch(`${a}/winners?_page=${e}&_limit=${s}&_sort=${t}&_order=${n}`),o=await r.json(),c=Number(r.headers.get("X-Total-Count"));return{winnersWithCars:await Promise.all(o.map((async e=>Object.assign(Object.assign({},e),await i(e.id))))),count:c}},u=async e=>{const t=await fetch(`${a}/winners/${e}`,{method:"DELETE"});return await t.json()},w=async(e,t)=>{const n=await(async e=>(await fetch(`${a}/winners/${e}`)).status)(e);if(200===n){const n=await(async e=>{const t=await fetch(`${a}/winners/${e}`);return await t.json()})(e);await(async(e,t)=>{const n=await fetch(`${a}/winners/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return await n.json()})(e,{wins:n.wins+=1,time:t<n.time?t:n.time})}else 404===n&&await(async e=>{const t=await fetch(`${a}/winners`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return await t.json()})({id:e,wins:1,time:t})}},565:(e,t,n)=>{n.d(t,{L:()=>s});var a=n(334);class s extends a.w{constructor(e,t,n){super(e,"div",n),this.element.innerHTML=`\n      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 476">\n        <path d="M557.583 7c-1.5086.009-4.7211.3061-6.4687.9375l-3.5 1.5 8.6562 35.844-124.81.2813c-77.963.1653-166.52-11.504-232.93-9.5-66.412 2.0036-152.12 28-152.12 28l-13.687 3.7811c-19.251 5.2963-25.718 97.367-25.718 166.78 0 1.113.0266 2.2531.0312 3.375-.0046 1.122-.0312 2.262-.0312 3.375 0 69.414 6.4673 161.48 25.718 166.78l13.687 3.7812s85.711 25.996 152.12 28c66.412 2.0038 154.97-9.6653 232.93-9.5l124.81.2813-8.6562 35.844 3.5 1.5c1.7476.6314 4.96.9285 6.4687.9375.8486.005 1.7551-.0744 2.6875-.25.3107-.0584.6235-.1412.9375-.2188.3046-.0754.6326-.1568.9375-.25.6284-.1926 1.2635-.422 1.875-.6875 1.8215-.792 3.5342-1.9028 4.7812-3.2812.01-.0107.0217-.0208.0312-.0312.6248-.6965 1.1123-1.4528 1.4687-2.2812l12.156-31.25 109.94.25c23.9 11.942 45.511 10.719 73.593 10.719 133.25 0 187.63-86.586 187-201.38 0-.7802-.019-1.5656-.031-2.3438.012-.778.031-1.5636.031-2.3438.6282-114.79-53.749-201.38-187-201.38-28.082 0-49.693-1.2235-73.593 10.719l-109.94.25-12.156-31.25c-.3565-.8284-.844-1.5846-1.4687-2.2811-.01-.0104-.0213-.0206-.0312-.0312-1.247-1.3785-2.9597-2.4892-4.7812-3.2812-.6115-.2655-1.2465-.4949-1.875-.6875-.305-.0931-.633-.1746-.9375-.25-.314-.0776-.6268-.1604-.9375-.2188-.9324-.1756-1.8389-.255-2.6875-.25z" fill="${t}" />\n        <path d="M347.403 368.55c-33.364 0-65.307 1.8-94.811 5.0625 25.66 48.714 97.985 30.265 205.56 31.531 49.686.5847 89.543 1.8793 121.53 2.375-47.16-23.334-133.53-38.969-232.28-38.969zM207.563 120.69l-77.749 12.469c-27.15 4.3542-48.947 48.773-50.999 104.84 2.0523 56.071 23.849 100.49 50.999 104.84l77.749 12.469c13.296 0 24-10.704 24-24v-186.62c0-13.296-10.704-24-24-24zm431.46-34.22c-2.9692 0-5.8933.3321-8.7812.9687-.0104-.01-.0208-.021-.0312-.0312l-63.843 12.312c-17.728 6.6047-32 14.272-32 32v212.56c0 17.728 14.272 25.395 32 32l63.843 12.312c.0105-.0102.0208-.021.0312-.0312 2.8879.6366 5.812.9688 8.7812.9688 45.395 0 82.198-57.363 82.312-151.53-.114-94.169-36.916-151.53-82.312-151.53zM347.403 107.46c-33.364 0-65.307-1.8-94.811-5.0625 25.66-48.714 97.985-30.265 205.56-31.531 49.686-.5847 89.543-1.8793 121.53-2.375-47.16 23.334-133.53 38.969-232.28 38.969z" fill="#3c3c3c" />\n      </svg>\n    `}}},881:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{l:()=>l});var a=n(334),s=n(565),i=n(203),r=n(923),o=n(562),c=e([r,o]);[r,o]=c.then?await c:c;class l extends a.w{constructor(e){super(null,"li",["cars__item"]),this.element.dataset.carId=`${e.id}`,this.optionsWrapper=new a.w(this.element,"div",["cars__options-wrapper"]),this.selectBtn=new a.w(this.optionsWrapper.element,"button",["btn","cars__select-btn"],"Select",[["type","button"]]),this.removeBtn=new a.w(this.optionsWrapper.element,"button",["btn","cars__remove-btn"],"Remove",[["type","button"]]),this.carName=new a.w(this.optionsWrapper.element,"span",["cars__car-name"],`${e.name}`),this.roadWrapper=new a.w(this.element,"div",["cars__road-wrapper"]),this.engineControls=new a.w(this.roadWrapper.element,"div",["cars__engine-controls"]),this.startBtn=new a.w(this.engineControls.element,"button",["btn","cars__start-btn"],"A",[["type","button"]]),this.stopBtn=new a.w(this.engineControls.element,"button",["btn","cars__stop-btn"],"B",[["type","button"],["disabled",""]]),this.road=new a.w(this.roadWrapper.element,"div",["cars__road"]),this.addCarImage(e.color),this.finish=new a.w(this.road.element,"div",["cars__finish"]),this.selectBtn.element.addEventListener("click",(()=>this.onSelectBtnClick())),this.removeBtn.element.addEventListener("click",(()=>this.onRemoveBtnClick())),this.startBtn.element.addEventListener("click",(()=>this.onStartBtnClick())),this.stopBtn.element.addEventListener("click",(()=>this.onStopBtnClick()))}addCarImage(e){this.carImage=new s.L(this.road.element,e,["car"])}async onSelectBtnClick(){const e=Number(this.element.dataset.carId),t=await(0,i.oX)(e);r.h.selectedCar=t;const n=document.querySelector("#update-name"),a=document.querySelector("#update-color"),s=document.querySelector("#update-btn");n.value=t.name,a.value=t.color,null==s||s.removeAttribute("disabled")}async onRemoveBtnClick(){const e=Number(this.element.dataset.carId);await(0,i.tD)(e),await(0,i.BS)(e),await(0,r.Q_)(),(0,o.tV)();const t=document.querySelector(".garage__cars");t&&(t.innerHTML="",l.createCar(t));const n=document.querySelector(".garage__title");n&&(n.textContent=`Garage (${r.h.carsNumber})`)}async onStartBtnClick(){this.startBtn.element.setAttribute("disabled",""),this.stopBtn.element.removeAttribute("disabled");const e=Number(this.element.dataset.carId);(0,o.BL)(e,"")}async onStopBtnClick(){const e=Number(this.element.dataset.carId);(0,o.sT)(e)}static createCar(e){e.innerHTML="",r.h.cars.forEach((t=>{const n=new this(t);e.appendChild(n.element)}))}}}))},334:(e,t,n)=>{n.d(t,{w:()=>a});class a{constructor(e=null,t="div",n=[],a="",s=[]){this.element=document.createElement(t),n.length&&this.element.classList.add(...n),e&&e.appendChild(this.element),this.element.textContent=a,s.length&&this.setAttributes(s)}setAttributes(e){e.forEach((e=>{const[t,n]=e;this.element.setAttribute(t,n)}))}}},53:(e,t,n)=>{n.d(t,{G:()=>s});var a=n(334);class s extends a.w{constructor(e,t){super(e,"div",["popup-overlay"]),this.popup=new a.w(this.element,"div",["popup"],t)}show(){this.element.classList.add("popup-overlay--active")}close(){this.element.classList.remove("popup-overlay--active")}}},607:(e,t,n)=>{n.a(e,(async e=>{var t=n(723),a=e([t]);t=(a.then?await a:a)[0];const s=document.body;new t.T(s)}))},535:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{B:()=>d});var a=n(334),s=n(923),i=n(203),r=n(881),o=n(974),c=n(53),l=n(562),h=e([s,l,r]);[s,l,r]=h.then?await h:h;class d extends a.w{constructor(e){super(e,"div",["garage"]),this.title=new a.w(this.element,"h1",["garage__title"],`Garage (${s.h.carsNumber})`),this.pageControls=new a.w(this.element,"div",["garage__page-controls"]),this.pageCount=new a.w(this.pageControls.element,"p",["garage__page-count"],`Page №${s.h.garagePage}`),this.prevBtn=new a.w(this.pageControls.element,"button",["btn","garage__prev-btn"],"Prev",[["type","button"]]),this.nextBtn=new a.w(this.pageControls.element,"button",["btn","garage__next-btn"],"Next",[["type","button"]]),this.Controls=new a.w(this.element,"div",["garage__controls"]),this.carCreateControls=new a.w(this.Controls.element,"div",["garage__group"]),this.carNameCreateInput=new a.w(this.carCreateControls.element,"input",["garage__name-input"],"",[["type","text"],["name","name"],["autocomplete","off"]]),this.carColorCreateInput=new a.w(this.carCreateControls.element,"input",["garage__color-input"],"",[["type","color"],["name","color"],["autocomplete","off"]]),this.carCreateBtn=new a.w(this.carCreateControls.element,"button",["btn","garage__btn"],"Create",[["disabled",""]]),this.carUpdateControls=new a.w(this.Controls.element,"div",["garage__group"]),this.carNameUpdateInput=new a.w(this.carUpdateControls.element,"input",["garage__name-input"],"",[["id","update-name"],["type","text"],["name","name"],["autocomplete","off"]]),this.carColorUpdateInput=new a.w(this.carUpdateControls.element,"input",["garage__color-input"],"",[["id","update-color"],["type","color"],["name","color"],["autocomplete","off"]]),this.carUpdateBtn=new a.w(this.carUpdateControls.element,"button",["btn","garage__btn"],"Update",[["id","update-btn"],["disabled",""]]),this.raceControls=new a.w(this.Controls.element,"div",["garage__group"]),this.raceBtn=new a.w(this.raceControls.element,"button",["btn","garage__btn"],"Race"),this.resetBtn=new a.w(this.raceControls.element,"button",["btn","garage__btn"],"Reset",[["disabled",""]]),this.generateBtn=new a.w(this.raceControls.element,"button",["btn","garage__btn","garage__btn--generate"],"Generate cars"),this.carsField=new a.w(this.element,"ul",["garage__cars","cars"]),r.l.createCar(this.carsField.element),this.controlPaginationButtons(),this.requestFrame={requestID:0},this.carNameCreateInput.element.addEventListener("change",(()=>this.onCarNameCreateInputChange())),this.carCreateBtn.element.addEventListener("click",(()=>this.onCarCreateBtnClick())),this.carUpdateBtn.element.addEventListener("click",(()=>this.onCarUpdateBtnClick())),this.generateBtn.element.addEventListener("click",(()=>this.onGenerateBtnClick())),this.prevBtn.element.addEventListener("click",(()=>this.onPrevBtnClick())),this.nextBtn.element.addEventListener("click",(()=>this.onNextBtnClick())),this.raceBtn.element.addEventListener("click",(()=>this.onRaceBtnClick())),this.resetBtn.element.addEventListener("click",(()=>this.onResetBtnClick()))}onCarNameCreateInputChange(){this.carCreateBtn.element.removeAttribute("disabled")}async onCarCreateBtnClick(){const e=this.carNameCreateInput.element.value,t=this.carColorCreateInput.element.value;await(0,i.DT)({name:e,color:t}),this.carNameCreateInput.element.value="",this.carCreateBtn.element.setAttribute("disabled",""),await(0,s.Q_)(),this.changeCarsNumber(),r.l.createCar(this.carsField.element),this.controlPaginationButtons()}async onCarUpdateBtnClick(){var e;if(null===(e=s.h.selectedCar)||void 0===e?void 0:e.id){const e=this.carNameUpdateInput.element.value,t=this.carColorUpdateInput.element.value;await(0,i.Bo)(s.h.selectedCar.id,{name:e,color:t}),this.carNameUpdateInput.element.value="",this.carUpdateBtn.element.setAttribute("disabled",""),await(0,s.Q_)(),r.l.createCar(this.carsField.element)}}async onGenerateBtnClick(){const e=(0,o.c5)(100);await Promise.all(e.map((e=>(0,i.DT)(e)))),await(0,s.Q_)(),this.changeCarsNumber(),r.l.createCar(this.carsField.element),this.controlPaginationButtons()}async onNextBtnClick(){s.h.garagePage+=1,this.changePageNumber(),await(0,s.Q_)(),r.l.createCar(this.carsField.element),this.controlRaceButtons(),this.controlPaginationButtons()}async onPrevBtnClick(){s.h.garagePage-=1,this.changePageNumber(),await(0,s.Q_)(),r.l.createCar(this.carsField.element),this.controlRaceButtons(),this.controlPaginationButtons()}async onRaceBtnClick(){this.raceBtn.element.setAttribute("disabled","");const e=await(0,l.S3)();if(e){const{id:t,time:n,name:a}=e,s=+(n/1e3).toFixed(3);(0,i.AV)(t,s),this.showPopup(a,s)}this.resetBtn.element.removeAttribute("disabled")}onResetBtnClick(){this.resetBtn.element.setAttribute("disabled",""),(0,l.mc)(),this.raceBtn.element.removeAttribute("disabled")}controlRaceButtons(){this.raceBtn.element.removeAttribute("disabled"),this.resetBtn.element.setAttribute("disabled","")}controlPaginationButtons(){7*s.h.garagePage>=s.h.carsNumber?this.nextBtn.element.setAttribute("disabled",""):this.nextBtn.element.removeAttribute("disabled"),1===s.h.garagePage?this.prevBtn.element.setAttribute("disabled",""):this.prevBtn.element.removeAttribute("disabled")}changeCarsNumber(){this.title.element.textContent=`Garage (${s.h.carsNumber})`}changePageNumber(){this.pageCount.element.textContent=`Page №${s.h.garagePage}`}showPopup(e,t){this.popup=new c.G(this.element,`The winner is ${e}! Time is ${t} seconds.`),this.popup.show(),setTimeout((()=>{this.popup&&this.popup.close()}),5e3)}}}))},723:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{T:()=>c});var a=n(334),s=n(923),i=n(535),r=n(654),o=e([r,s,i]);[r,s,i]=o.then?await o:o;class c extends a.w{constructor(e){super(e,"div",["page"]),this.nav=new a.w(this.element,"div",["page__nav"]),this.garageBtn=new a.w(this.nav.element,"button",["btn","garage-btn"],"Garage",[["disabled",""]]),this.winnersBtn=new a.w(this.nav.element,"button",["btn","winners-btn"],"Winners"),this.garage=new i.B(this.element),this.winners=new r.O(this.element),this.winners.element.style.display="none",this.garageBtn.element.addEventListener("click",(()=>this.onGarageBtnClick())),this.winnersBtn.element.addEventListener("click",(()=>this.onWinnersBtnClick()))}onGarageBtnClick(){this.garage.element.style.display="block",this.winners.element.style.display="none",this.winnersBtn.element.removeAttribute("disabled"),this.garageBtn.element.setAttribute("disabled","")}async onWinnersBtnClick(){this.winners.element.style.display="block",this.garage.element.style.display="none",this.garageBtn.element.removeAttribute("disabled"),this.winnersBtn.element.setAttribute("disabled",""),this.winners.element.remove(),await(0,s.Xx)(),this.winners=new r.O(this.element)}}}))},654:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{O:()=>c});var a=n(565),s=n(334),i=n(923),r=n(562),o=e([i,r]);[i,r]=o.then?await o:o;class c extends s.w{constructor(e){super(e,"div",["winners"]),this.title=new s.w(this.element,"h1",["winners__title"],`Winners (${i.h.winnersNumber})`),this.pageControls=new s.w(this.element,"div",["winners__page-controls"]),this.pageCount=new s.w(this.pageControls.element,"p",["winners__page-count"],`Page №${i.h.winnersPage}`),this.prevBtn=new s.w(this.pageControls.element,"button",["btn","winners__prev-btn"],"Prev",[["type","button"]]),this.nextBtn=new s.w(this.pageControls.element,"button",["btn","winners__next-btn"],"Next",[["type","button"]]),this.table=new s.w(this.element,"table",["winners__table"]),this.tableHead=new s.w(this.table.element,"thead"),this.numberTh=new s.w(this.tableHead.element,"th",[],"№"),this.carTh=new s.w(this.tableHead.element,"th",[],"Car"),this.nameTh=new s.w(this.tableHead.element,"th",[],"Name"),this.winsTh=new s.w(this.tableHead.element,"th",["winners__wins"],"Wins"),this.timeTh=new s.w(this.tableHead.element,"th",["winners__time"],"Best time (s)"),this.tableBody=new s.w(this.table.element,"tbody"),this.addWinners(),this.controlPaginationButtons(),this.prevBtn.element.addEventListener("click",(()=>this.onPrevBtnClick())),this.nextBtn.element.addEventListener("click",(()=>this.onNextBtnClick())),this.winsTh.element.addEventListener("click",(()=>this.onWinsThClick())),this.timeTh.element.addEventListener("click",(()=>this.onTimeThClick()))}addWinners(){this.tableBody.element.innerHTML="";const{winners:e}=i.h;e.forEach(((e,t)=>{this.row=new s.w(this.tableBody.element,"tr"),this.number=new s.w(this.row.element,"td",[],`${10*(i.h.winnersPage-1)+(t+1)}`),this.car=new s.w(this.row.element,"td"),this.carImage=new a.L(this.car.element,`${e.color}`,["winners__image"]),this.name=new s.w(this.row.element,"td",[],`${e.name}`),this.wins=new s.w(this.row.element,"td",[],`${e.wins}`),this.bestTime=new s.w(this.row.element,"td",[],`${e.time}`)}))}async onNextBtnClick(){i.h.winnersPage+=1,await(0,i.Xx)(),this.changeWinnersNumber(),this.addWinners(),this.controlPaginationButtons()}async onPrevBtnClick(){i.h.winnersPage-=1,await(0,i.Xx)(),this.changeWinnersNumber(),this.addWinners(),this.controlPaginationButtons()}controlPaginationButtons(){10*i.h.winnersPage>=i.h.winnersNumber?this.nextBtn.element.setAttribute("disabled",""):this.nextBtn.element.removeAttribute("disabled"),1===i.h.winnersPage?this.prevBtn.element.setAttribute("disabled",""):this.prevBtn.element.removeAttribute("disabled")}async onWinsThClick(){await(0,r.bW)("wins"),(0,r.h8)(this.winsTh.element),this.addWinners()}async onTimeThClick(){await(0,r.bW)("time"),(0,r.h8)(this.timeTh.element),this.addWinners()}changeWinnersNumber(){this.pageCount.element.textContent=`Page №${i.h.winnersPage}`}}}))},923:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{h:()=>c,Q_:()=>l,Xx:()=>h});var a=n(203);const{cars:s,count:i}=await(0,a.Rn)(1),{winnersWithCars:r,count:o}=await(0,a.ix)(1),c={cars:s,carsNumber:i,garagePage:1,winners:r,winnersNumber:o,winnersPage:1,selectedCar:null,carsRequestId:{},sort:"time",order:"ASC"},l=async()=>{const{cars:e,count:t}=await(0,a.Rn)(c.garagePage);c.cars=e,c.carsNumber=t},h=async()=>{const{winnersWithCars:e,count:t}=await(0,a.ix)(c.winnersPage,c.sort,c.order);c.winners=e,c.winnersNumber=t};e()}),1)},562:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{BL:()=>r,S3:()=>o,sT:()=>c,mc:()=>l,bW:()=>h,h8:()=>d,tV:()=>m});var a=n(203),s=n(923),i=e([s]);s=(i.then?await i:i)[0];const r=async(e,t)=>{const n=await(0,a.p6)(e),i=n.distance/n.velocity,r=document.querySelector(`.cars__item[data-car-id="${e}"] .cars__road`),o=null==r?void 0:r.querySelector(".cars__finish");if(r&&o){const t=o.getBoundingClientRect().right-r.getBoundingClientRect().left,n=r.querySelector(".car");s.h.carsRequestId[e]=((e,t,n)=>{let a;const s={requestID:0},i=r=>{a||(a=performance.now());const o=t/n*(r-a);e&&(e.style.left=`${Math.min(o,t)}px`),o<t&&(s.requestID=requestAnimationFrame(i))};return s.requestID=requestAnimationFrame(i),s})(n,t,i)}const c=await(0,a.J3)(e);return!1===c.success&&cancelAnimationFrame(s.h.carsRequestId[e].requestID),{id:e,time:i,driveRequest:c,name:t}},o=async()=>{const{cars:e}=s.h,t=e.map((async e=>r(e.id,e.name)));return await(async e=>{const t=(await Promise.all(e)).filter((e=>e.driveRequest.success));return t.length>0?t.reduce(((e,t)=>e.time<t.time?e:t)):null})(t)},c=async e=>{const t=document.querySelector(`.cars__item[data-car-id="${e}"]`),n=null==t?void 0:t.querySelector(".cars__start-btn"),i=null==t?void 0:t.querySelector(".cars__stop-btn"),r=null==t?void 0:t.querySelector(".car");i&&i.setAttribute("disabled",""),n&&n.removeAttribute("disabled"),await(0,a.yQ)(e),cancelAnimationFrame(s.h.carsRequestId[e].requestID),r&&(r.style.left="0px")},l=()=>{const{cars:e}=s.h;e.map((e=>c(e.id)))},h=async e=>{s.h.sort=e,s.h.order="ASC"===s.h.order?"DESC":"ASC",await(0,s.Xx)()},d=e=>{"ASC"===s.h.order?(e.classList.remove("sorted"),e.classList.add("sorted-reverse")):(e.classList.add("sorted"),e.classList.remove("sorted-reverse"))},m=()=>{const e=document.querySelector(".garage__next-btn");e&&(7*s.h.garagePage>=s.h.carsNumber?e.setAttribute("disabled",""):e.removeAttribute("disabled"))}}))},974:(e,t,n)=>{n.d(t,{c5:()=>i});const a=e=>e[Math.floor(Math.random()*e.length)],s=()=>{let e="#";for(let t=0;t<6;t++)e+=a("0123456789ABCDEF");return e},i=e=>{const t=[];for(let n=0;n<e;n++)t.push({name:`${a(["Ford","Honda","Mazda","Mitsubishi","Toyota","Dodge","Lamborghini","BMW","Porsche","Nissan"])} ${a(["Mustang","Civic","RX-7","Eclipse","Supra","Viper","Gallardo","M3 GTR","Cayman","Skyline"])}`,color:s()});return t}}},r={};function o(e){var t=r[e];if(void 0!==t)return t.exports;var n=r[e]={exports:{}};return i[e](n,n.exports,o),n.exports}e="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n=e=>{e&&(e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},a=e=>!--e.r&&e(),s=(e,t)=>e?e.push(t):a(t),o.a=(i,r,o)=>{var c,l,h,d=o&&[],m=i.exports,u=!0,w=!1,p=(t,n,a)=>{w||(w=!0,n.r+=t.length,t.map(((t,s)=>t[e](n,a))),w=!1)},g=new Promise(((e,t)=>{h=t,l=()=>(e(m),n(d),d=0)}));g[t]=m,g[e]=(e,t)=>{if(u)return a(e);c&&p(c,e,t),s(d,e),g.catch(t)},i.exports=g,r((i=>{if(!i)return l();var r,o;c=(i=>i.map((i=>{if(null!==i&&"object"==typeof i){if(i[e])return i;if(i.then){var r=[];i.then((e=>{o[t]=e,n(r),r=0}));var o={[e]:(e,t)=>(s(r,e),i.catch(t))};return o}}return{[e]:e=>a(e),[t]:i}})))(i);var h=new Promise(((e,n)=>{(r=()=>e(o=c.map((e=>e[t])))).r=0,p(c,r,n)}));return r.r?h:o})).then(l,h),u=!1},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o(607)})();