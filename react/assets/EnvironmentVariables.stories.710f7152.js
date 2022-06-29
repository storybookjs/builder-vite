var l=Object.defineProperty;var t=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;var d=(e,i,r)=>i in e?l(e,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[i]=r,a=(e,i)=>{for(var r in i||(i={}))c.call(i,r)&&d(e,r,i[r]);if(t)for(var r of t(i))s.call(i,r)&&d(e,r,i[r]);return e};import{a as u,j as n}from"./jsx-runtime.f1f00a27.js";import"./index.06140e01.js";function o({dynamic:e=""}){return u("div",{children:[n("h1",{children:"import\u200B.meta\u200B.env:"}),n("div",{children:JSON.stringify({STORYBOOK_ENV_VAR:"included",VITE_ENV_VAR:"included",BASE_URL:"/builder-vite/react/",MODE:"production",DEV:!1,PROD:!0},null,2)}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.STORYBOOK:"}),n("div",{children:"true"}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.STORYBOOK_ENV_VAR:"}),n("div",{children:"included"}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.VITE_ENV_VAR:"}),n("div",{children:"included"}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.ENV_VAR:"}),n("div",{children:{STORYBOOK_ENV_VAR:"included",VITE_ENV_VAR:"included",BASE_URL:"/builder-vite/react/",MODE:"production",DEV:!1,PROD:!0}.ENV_VAR}),n("h1",{children:"dynamic from props:"}),n("div",{children:e})]})}o.__docgenInfo={description:"",methods:[],displayName:"EnvironmentVariables",props:{dynamic:{defaultValue:{value:"''",computed:!1},required:!1}}};var _={parameters:{storySource:{source:`import { EnvironmentVariables } from './EnvironmentVariables';

export default {
  // This component uses auto-title
  component: EnvironmentVariables,
};

const Template = (args) => <EnvironmentVariables {...args} />;

export const Info = Template.bind({});
Info.args = {
  dynamic: import.meta.env.VITE_ENV_VAR,
};
`,locationsMap:{info:{startLoc:{col:17,line:8},endLoc:{col:61,line:8},startBody:{col:17,line:8},endBody:{col:61,line:8}}}}},component:o};const m=e=>n(o,a({},e)),V=m.bind({});V.args={dynamic:"included"};const B=["Info"];export{V as Info,B as __namedExportsOrder,_ as default};
//# sourceMappingURL=EnvironmentVariables.stories.710f7152.js.map
