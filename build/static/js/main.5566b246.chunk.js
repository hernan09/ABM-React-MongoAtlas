(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{112:function(e,t,a){e.exports=a(186)},117:function(e,t,a){},118:function(e,t,a){},186:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(3),r=a.n(l),i=(a(117),a(95)),c=a(96),s=a(107),d=a(97),m=a(108),u=a(190),h=a(188),p=a(189),f=a(191),b=(a(118),u.a.SubMenu,h.a.Header,h.a.Footer,h.a.Sider,h.a.Content,function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(d.a)(t).call(this))).borrarElemento=function(e){fetch("http://localhost:4000/cuentas/".concat(e),{method:"DELETE"}).then((function(e){return e.json()})).then((function(e){console.log(e)})),window.location.reload()},e.verElement=function(t){console.log(t);fetch("http://localhost:4000/cuentas/".concat(t),{method:"GET"}).then((function(e){return e.json()})).then((function(t){console.log(t),e.setState({item:t.name,price:t.Price,load:!0})}))},e.handleSubmit=function(e){e.preventDefault();var t={name:e.target[0].value,Price:e.target[1].value};console.log(t),fetch("http://localhost:4000/add",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){return console.error("Error:",e)})).then((function(e){window.location.reload()}))},e.state={objs:[],load:!1,item:String,price:String},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({load:!0}),fetch("http://localhost:4000/cuentas").then((function(e){return e.json()})).then((function(t){e.setState({objs:t,load:!0})}))}},{key:"render",value:function(){var e=this;this.state.load;return o.a.createElement("div",{className:"containerr"},o.a.createElement("form",{className:"asdasdform",onSubmit:this.handleSubmit},o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{type:"text",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",required:!0})),o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{type:"text",className:"form-control",id:"exampleInputPassword1",required:!0})),o.a.createElement("div",{className:"form-group form-check"}),o.a.createElement("button",{htmltype:"button",className:"btn btn-outline-primary btn-block"},"Add user")),o.a.createElement(p.a,{id:"lista",loading:this.load,size:"small",dataSource:this.state.objs,renderItem:function(t){return o.a.createElement(p.a.Item,null,t.name,o.a.createElement(f.a,{id:"btnb2",size:"small","data-toggle":"modal","data-target":"#exampleModal",onClick:function(){return e.verElement(t._id)},type:"primary"},"Show"),o.a.createElement(f.a,{id:"btnb",size:"small",onClick:function(){return e.borrarElemento(t._id)},type:"danger"},"Delete"))}}),o.a.createElement("div",{class:"modal fade",id:"exampleModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},o.a.createElement("div",{class:"modal-dialog",role:"document"},o.a.createElement("div",{class:"modal-content"},o.a.createElement("div",{class:"modal-header"},o.a.createElement("h5",{class:"modal-title",id:"exampleModalLabel"},this.state.item),o.a.createElement("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},o.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),o.a.createElement("div",{class:"modal-body"},this.state.price)))))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[112,1,2]]]);
//# sourceMappingURL=main.5566b246.chunk.js.map