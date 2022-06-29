var p=Object.defineProperty;var d=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var c=(r,o,n)=>o in r?p(r,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[o]=n,s=(r,o)=>{for(var n in o||(o={}))u.call(o,n)&&c(r,n,o[n]);if(d)for(var n of d(o))h.call(o,n)&&c(r,n,o[n]);return r};import{P as i}from"./index.33068e5f.js";import{H as m,L as f,a as y}from"./Header.stories.abbbc422.js";import{a as t,j as e}from"./jsx-runtime.f1f00a27.js";import"./Button.9b01f3c7.js";import"./index.06140e01.js";const a=({user:r,onLogin:o,onLogout:n,onCreateAccount:g})=>t("article",{children:[e(m,{user:r,onLogin:o,onLogout:n,onCreateAccount:g}),t("section",{children:[e("h2",{children:"Pages in Storybook"}),t("p",{children:["We recommend building UIs with a"," ",e("a",{href:"https://componentdriven.org",target:"_blank",rel:"noopener noreferrer",children:e("strong",{children:"component-driven"})})," ","process starting with atomic components and ending with pages."]}),e("p",{children:"Render pages with mock data. This makes it easy to build and review page states without needing to navigate to them in your app. Here are some handy patterns for managing page data in Storybook:"}),t("ul",{children:[e("li",{children:'Use a higher-level connected component. Storybook helps you compose such data from the "args" of child component stories'}),e("li",{children:"Assemble data in the page component from your services. You can mock these services out using Storybook."})]}),t("p",{children:["Get a guided tutorial on component-driven development at"," ",e("a",{href:"https://storybook.js.org/tutorials/",target:"_blank",rel:"noopener noreferrer",children:"Storybook tutorials"}),". Read more in the"," ",e("a",{href:"https://storybook.js.org/docs",target:"_blank",rel:"noopener noreferrer",children:"docs"}),"."]}),t("div",{className:"tip-wrapper",children:[e("span",{className:"tip",children:"Tip"})," Adjust the width of the canvas with the"," ",e("svg",{width:"10",height:"10",viewBox:"0 0 12 12",xmlns:"http://www.w3.org/2000/svg",children:e("g",{fill:"none",fillRule:"evenodd",children:e("path",{d:"M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z",id:"a",fill:"#999"})})}),"Viewports addon in the toolbar"]})]})]});a.propTypes={user:i.shape({}),onLogin:i.func.isRequired,onLogout:i.func.isRequired,onCreateAccount:i.func.isRequired};a.defaultProps={user:null};a.__docgenInfo={description:"",methods:[],displayName:"Page",props:{user:{defaultValue:{value:"null",computed:!1},type:{name:"shape",value:{}},required:!1,description:""},onLogin:{type:{name:"func"},required:!0,description:""},onLogout:{type:{name:"func"},required:!0,description:""},onCreateAccount:{type:{name:"func"},required:!0,description:""}}};var S={parameters:{storySource:{source:`import { Page } from './Page';
import * as HeaderStories from './Header.stories';

export default {
  // This component uses auto-title
  component: Page,
};

const Template = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
`,locationsMap:{"logged-in":{startLoc:{col:17,line:9},endLoc:{col:45,line:9},startBody:{col:17,line:9},endBody:{col:45,line:9}},"logged-out":{startLoc:{col:17,line:9},endLoc:{col:45,line:9},startBody:{col:17,line:9},endBody:{col:45,line:9}}}}},component:a};const l=r=>e(a,s({},r)),v=l.bind({});v.args=s({},f.args);const L=l.bind({});L.args=s({},y.args);const T=["LoggedIn","LoggedOut"];export{v as LoggedIn,L as LoggedOut,T as __namedExportsOrder,S as default};
//# sourceMappingURL=Page.stories.2d0096a3.js.map
