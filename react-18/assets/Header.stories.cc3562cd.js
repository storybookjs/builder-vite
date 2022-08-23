var g=Object.defineProperty;var l=(o,n)=>g(o,"name",{value:n,configurable:!0});import{p as t}from"./index.da9f964c.js";import{B as d}from"./Button.fc23cfbd.js";import{j as e,b as a,F as m}from"./jsx-runtime.fcdea948.js";var f=Object.defineProperty,h=l((o,n)=>f(o,"name",{value:n,configurable:!0}),"__name$1");const r=h(({user:o,onLogin:n,onLogout:p,onCreateAccount:u})=>e("header",{children:a("div",{className:"wrapper",children:[a("div",{children:[e("svg",{width:"32",height:"32",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",children:a("g",{fill:"none",fillRule:"evenodd",children:[e("path",{d:"M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",fill:"#FFF"}),e("path",{d:"M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",fill:"#555AB9"}),e("path",{d:"M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",fill:"#91BAF8"})]})}),e("h1",{children:"Acme"})]}),e("div",{children:o?e(d,{size:"small",onClick:p,label:"Log out"}):a(m,{children:[e(d,{size:"small",onClick:n,label:"Log in"}),e(d,{primary:!0,size:"small",onClick:u,label:"Sign up"})]})})]})}),"Header");r.propTypes={user:t.exports.shape({}),onLogin:t.exports.func.isRequired,onLogout:t.exports.func.isRequired,onCreateAccount:t.exports.func.isRequired};r.defaultProps={user:null};r.__docgenInfo={description:"",methods:[],displayName:"Header",props:{user:{defaultValue:{value:"null",computed:!1},type:{name:"shape",value:{}},required:!1,description:""},onLogin:{type:{name:"func"},required:!0,description:""},onLogout:{type:{name:"func"},required:!0,description:""},onCreateAccount:{type:{name:"func"},required:!0,description:""}}};var L=Object.defineProperty,v=l((o,n)=>L(o,"name",{value:n,configurable:!0}),"__name");const _={parameters:{storySource:{source:`import { Header } from './Header';

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
`,locationsMap:{"logged-in":{startLoc:{col:17,line:8},endLoc:{col:47,line:8},startBody:{col:17,line:8},endBody:{col:47,line:8}},"logged-out":{startLoc:{col:17,line:8},endLoc:{col:47,line:8},startBody:{col:17,line:8},endBody:{col:47,line:8}}}}},title:"Example/Header",component:r},s=v(o=>e(r,{...o}),"Template"),i=s.bind({});i.args={user:{}};const c=s.bind({});c.args={};const y=["LoggedIn","LoggedOut"],B=Object.freeze(Object.defineProperty({__proto__:null,default:_,LoggedIn:i,LoggedOut:c,__namedExportsOrder:y},Symbol.toStringTag,{value:"Module"}));export{r as H,i as L,c as a,B as b};
//# sourceMappingURL=Header.stories.cc3562cd.js.map
