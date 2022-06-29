var g=Object.defineProperty;var s=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var d=(t,o,n)=>o in t?g(t,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[o]=n,i=(t,o)=>{for(var n in o||(o={}))p.call(o,n)&&d(t,n,o[n]);if(s)for(var n of s(o))h.call(o,n)&&d(t,n,o[n]);return t};import{H as m,L as u,a as f}from"./Header.stories.d6f1ec4c.js";import{a as r,j as e}from"./jsx-runtime.f1f00a27.js";import"./Button.a811d429.js";import"./index.06140e01.js";const a=({user:t,onLogin:o,onLogout:n,onCreateAccount:c})=>r("article",{children:[e(m,{user:t,onLogin:o,onLogout:n,onCreateAccount:c}),r("section",{children:[e("h2",{children:"Pages in Storybook"}),r("p",{children:["We recommend building UIs with a"," ",e("a",{href:"https://componentdriven.org",target:"_blank",rel:"noopener noreferrer",children:e("strong",{children:"component-driven"})})," ","process starting with atomic components and ending with pages."]}),e("p",{children:"Render pages with mock data. This makes it easy to build and review page states without needing to navigate to them in your app. Here are some handy patterns for managing page data in Storybook:"}),r("ul",{children:[e("li",{children:'Use a higher-level connected component. Storybook helps you compose such data from the "args" of child component stories'}),e("li",{children:"Assemble data in the page component from your services. You can mock these services out using Storybook."})]}),r("p",{children:["Get a guided tutorial on component-driven development at"," ",e("a",{href:"https://storybook.js.org/tutorials/",target:"_blank",rel:"noopener noreferrer",children:"Storybook tutorials"}),". Read more in the"," ",e("a",{href:"https://storybook.js.org/docs",target:"_blank",rel:"noopener noreferrer",children:"docs"}),"."]}),r("div",{className:"tip-wrapper",children:[e("span",{className:"tip",children:"Tip"})," Adjust the width of the canvas with the"," ",e("svg",{width:"10",height:"10",viewBox:"0 0 12 12",xmlns:"http://www.w3.org/2000/svg",children:e("g",{fill:"none",fillRule:"evenodd",children:e("path",{d:"M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z",id:"a",fill:"#999"})})}),"Viewports addon in the toolbar"]})]})]});try{a.displayName="Page",a.__docgenInfo={description:"",displayName:"Page",props:{user:{defaultValue:null,description:"",name:"user",required:!1,type:{name:"Record<string, any>"}},onLogin:{defaultValue:null,description:"",name:"onLogin",required:!0,type:{name:"MouseEventHandler<HTMLButtonElement>"}},onLogout:{defaultValue:null,description:"",name:"onLogout",required:!0,type:{name:"MouseEventHandler<HTMLButtonElement>"}},onCreateAccount:{defaultValue:null,description:"",name:"onCreateAccount",required:!0,type:{name:"MouseEventHandler<HTMLButtonElement>"}}}},typeof STORYBOOK_REACT_CLASSES!="undefined"&&(STORYBOOK_REACT_CLASSES["stories/Page.tsx#Page"]={docgenInfo:a.__docgenInfo,name:"Page",path:"stories/Page.tsx#Page"})}catch{}const H={title:"Example/Page",component:a},l=t=>e(a,i({},t)),v=l.bind({});v.args=i({},u.args);const y=l.bind({});y.args=i({},f.args);const S=["LoggedIn","LoggedOut"];export{v as LoggedIn,y as LoggedOut,S as __namedExportsOrder,H as default};
//# sourceMappingURL=Page.stories.adadb48b.js.map
