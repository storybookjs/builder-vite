var f=Object.defineProperty;var s=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var i=(n,e,o)=>e in n?f(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o,c=(n,e)=>{for(var o in e||(e={}))h.call(e,o)&&i(n,o,e[o]);if(s)for(var o of s(e))L.call(e,o)&&i(n,o,e[o]);return n};import{P as l}from"./index.33068e5f.js";import{B as d}from"./Button.9b01f3c7.js";import{j as r,a,F as v}from"./jsx-runtime.f1f00a27.js";const t=({user:n,onLogin:e,onLogout:o,onCreateAccount:m})=>r("header",{children:a("div",{className:"wrapper",children:[a("div",{children:[r("svg",{width:"32",height:"32",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",children:a("g",{fill:"none",fillRule:"evenodd",children:[r("path",{d:"M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",fill:"#FFF"}),r("path",{d:"M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",fill:"#555AB9"}),r("path",{d:"M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",fill:"#91BAF8"})]})}),r("h1",{children:"Acme"})]}),r("div",{children:n?r(d,{size:"small",onClick:o,label:"Log out"}):a(v,{children:[r(d,{size:"small",onClick:e,label:"Log in"}),r(d,{primary:!0,size:"small",onClick:m,label:"Sign up"})]})})]})});t.propTypes={user:l.shape({}),onLogin:l.func.isRequired,onLogout:l.func.isRequired,onCreateAccount:l.func.isRequired};t.defaultProps={user:null};t.__docgenInfo={description:"",methods:[],displayName:"Header",props:{user:{defaultValue:{value:"null",computed:!1},type:{name:"shape",value:{}},required:!1,description:""},onLogin:{type:{name:"func"},required:!0,description:""},onLogout:{type:{name:"func"},required:!0,description:""},onCreateAccount:{type:{name:"func"},required:!0,description:""}}};var y={parameters:{storySource:{source:`import { Header } from './Header';

export default {
  // This component uses auto-title
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
`,locationsMap:{"logged-in":{startLoc:{col:17,line:8},endLoc:{col:47,line:8},startBody:{col:17,line:8},endBody:{col:47,line:8}},"logged-out":{startLoc:{col:17,line:8},endLoc:{col:47,line:8},startBody:{col:17,line:8},endBody:{col:47,line:8}}}}},component:t};const u=n=>r(t,c({},n)),p=u.bind({});p.args={user:{}};const g=u.bind({});g.args={};const _=["LoggedIn","LoggedOut"];var B=Object.freeze(Object.defineProperty({__proto__:null,default:y,LoggedIn:p,LoggedOut:g,__namedExportsOrder:_},Symbol.toStringTag,{value:"Module"}));export{t as H,p as L,g as a,B as b};
//# sourceMappingURL=Header.stories.abbbc422.js.map
