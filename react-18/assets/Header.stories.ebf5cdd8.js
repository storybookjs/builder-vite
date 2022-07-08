import{p as n}from"./index.da9f964c.js";import{B as l}from"./Button.97450e9d.js";import{j as e,b as r,F as u}from"./jsx-runtime.d25e7190.js";const o=({user:t,onLogin:i,onLogout:c,onCreateAccount:p})=>e("header",{children:r("div",{className:"wrapper",children:[r("div",{children:[e("svg",{width:"32",height:"32",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",children:r("g",{fill:"none",fillRule:"evenodd",children:[e("path",{d:"M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",fill:"#FFF"}),e("path",{d:"M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",fill:"#555AB9"}),e("path",{d:"M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",fill:"#91BAF8"})]})}),e("h1",{children:"Acme"})]}),e("div",{children:t?e(l,{size:"small",onClick:c,label:"Log out"}):r(u,{children:[e(l,{size:"small",onClick:i,label:"Log in"}),e(l,{primary:!0,size:"small",onClick:p,label:"Sign up"})]})})]})});o.propTypes={user:n.exports.shape({}),onLogin:n.exports.func.isRequired,onLogout:n.exports.func.isRequired,onCreateAccount:n.exports.func.isRequired};o.defaultProps={user:null};o.__docgenInfo={description:"",methods:[],displayName:"Header",props:{user:{defaultValue:{value:"null",computed:!1},type:{name:"shape",value:{}},required:!1,description:""},onLogin:{type:{name:"func"},required:!0,description:""},onLogout:{type:{name:"func"},required:!0,description:""},onCreateAccount:{type:{name:"func"},required:!0,description:""}}};const g={parameters:{storySource:{source:`import { Header } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
`,locationsMap:{"logged-in":{startLoc:{col:17,line:8},endLoc:{col:47,line:8},startBody:{col:17,line:8},endBody:{col:47,line:8}},"logged-out":{startLoc:{col:17,line:8},endLoc:{col:47,line:8},startBody:{col:17,line:8},endBody:{col:47,line:8}}}}},title:"Example/Header",component:o},a=t=>e(o,{...t}),s=a.bind({});s.args={user:{}};const d=a.bind({});d.args={};const m=["LoggedIn","LoggedOut"],v=Object.freeze(Object.defineProperty({__proto__:null,default:g,LoggedIn:s,LoggedOut:d,__namedExportsOrder:m},Symbol.toStringTag,{value:"Module"}));export{o as H,s as L,d as a,v as b};
//# sourceMappingURL=Header.stories.ebf5cdd8.js.map
