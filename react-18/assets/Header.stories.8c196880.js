var g=Object.defineProperty;var a=(o,l)=>g(o,"name",{value:l,configurable:!0});import{p as r}from"./index.da9f964c.js";import{B as s}from"./Button.e2aa021c.js";import{j as e,b as t,F as m}from"./jsx-runtime.e5670e74.js";const n=a(({user:o,onLogin:l,onLogout:p,onCreateAccount:u})=>e("header",{children:t("div",{className:"wrapper",children:[t("div",{children:[e("svg",{width:"32",height:"32",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",children:t("g",{fill:"none",fillRule:"evenodd",children:[e("path",{d:"M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",fill:"#FFF"}),e("path",{d:"M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",fill:"#555AB9"}),e("path",{d:"M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",fill:"#91BAF8"})]})}),e("h1",{children:"Acme"})]}),e("div",{children:o?e(s,{size:"small",onClick:p,label:"Log out"}):t(m,{children:[e(s,{size:"small",onClick:l,label:"Log in"}),e(s,{primary:!0,size:"small",onClick:u,label:"Sign up"})]})})]})}),"Header");n.propTypes={user:r.exports.shape({}),onLogin:r.exports.func.isRequired,onLogout:r.exports.func.isRequired,onCreateAccount:r.exports.func.isRequired};n.defaultProps={user:null};n.__docgenInfo={description:"",methods:[],displayName:"Header",props:{user:{defaultValue:{value:"null",computed:!1},type:{name:"shape",value:{}},required:!1,description:""},onLogin:{type:{name:"func"},required:!0,description:""},onLogout:{type:{name:"func"},required:!0,description:""},onCreateAccount:{type:{name:"func"},required:!0,description:""}}};const f={parameters:{storySource:{source:`import { Header } from './Header';

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
`,locationsMap:{"logged-in":{startLoc:{col:17,line:8},endLoc:{col:47,line:8},startBody:{col:17,line:8},endBody:{col:47,line:8}},"logged-out":{startLoc:{col:17,line:8},endLoc:{col:47,line:8},startBody:{col:17,line:8},endBody:{col:47,line:8}}}}},title:"Example/Header",component:n},d=a(o=>e(n,{...o}),"Template"),i=d.bind({});i.args={user:{}};const c=d.bind({});c.args={};const h=["LoggedIn","LoggedOut"],b=Object.freeze(Object.defineProperty({__proto__:null,default:f,LoggedIn:i,LoggedOut:c,__namedExportsOrder:h},Symbol.toStringTag,{value:"Module"}));export{n as H,i as L,c as a,b};
//# sourceMappingURL=Header.stories.8c196880.js.map
