import{p as t}from"./index.da9f964c.js";import{H as c,L as l,a as p}from"./Header.stories.ebf5cdd8.js";import{b as o,j as e}from"./jsx-runtime.d25e7190.js";import"./Button.97450e9d.js";import"./iframe.641621a8.js";const n=({user:r,onLogin:s,onLogout:i,onCreateAccount:d})=>o("article",{children:[e(c,{user:r,onLogin:s,onLogout:i,onCreateAccount:d}),o("section",{children:[e("h2",{children:"Pages in Storybook"}),o("p",{children:["We recommend building UIs with a"," ",e("a",{href:"https://componentdriven.org",target:"_blank",rel:"noopener noreferrer",children:e("strong",{children:"component-driven"})})," ","process starting with atomic components and ending with pages."]}),e("p",{children:"Render pages with mock data. This makes it easy to build and review page states without needing to navigate to them in your app. Here are some handy patterns for managing page data in Storybook:"}),o("ul",{children:[e("li",{children:'Use a higher-level connected component. Storybook helps you compose such data from the "args" of child component stories'}),e("li",{children:"Assemble data in the page component from your services. You can mock these services out using Storybook."})]}),o("p",{children:["Get a guided tutorial on component-driven development at"," ",e("a",{href:"https://storybook.js.org/tutorials/",target:"_blank",rel:"noopener noreferrer",children:"Storybook tutorials"}),". Read more in the"," ",e("a",{href:"https://storybook.js.org/docs",target:"_blank",rel:"noopener noreferrer",children:"docs"}),"."]}),o("div",{className:"tip-wrapper",children:[e("span",{className:"tip",children:"Tip"})," Adjust the width of the canvas with the"," ",e("svg",{width:"10",height:"10",viewBox:"0 0 12 12",xmlns:"http://www.w3.org/2000/svg",children:e("g",{fill:"none",fillRule:"evenodd",children:e("path",{d:"M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z",id:"a",fill:"#999"})})}),"Viewports addon in the toolbar"]})]})]});n.propTypes={user:t.exports.shape({}),onLogin:t.exports.func.isRequired,onLogout:t.exports.func.isRequired,onCreateAccount:t.exports.func.isRequired};n.defaultProps={user:null};n.__docgenInfo={description:"",methods:[],displayName:"Page",props:{user:{defaultValue:{value:"null",computed:!1},type:{name:"shape",value:{}},required:!1,description:""},onLogin:{type:{name:"func"},required:!0,description:""},onLogout:{type:{name:"func"},required:!0,description:""},onCreateAccount:{type:{name:"func"},required:!0,description:""}}};const v={parameters:{storySource:{source:`import { Page } from './Page';
import * as HeaderStories from './Header.stories';

export default {
  title: 'Example/Page',
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
`,locationsMap:{"logged-in":{startLoc:{col:17,line:9},endLoc:{col:45,line:9},startBody:{col:17,line:9},endBody:{col:45,line:9}},"logged-out":{startLoc:{col:17,line:9},endLoc:{col:45,line:9},startBody:{col:17,line:9},endBody:{col:45,line:9}}}}},title:"Example/Page",component:n},a=r=>e(n,{...r}),g=a.bind({});g.args={...l.args};const h=a.bind({});h.args={...p.args};const b=["LoggedIn","LoggedOut"];export{g as LoggedIn,h as LoggedOut,b as __namedExportsOrder,v as default};
//# sourceMappingURL=Page.stories.2fa9443a.js.map
