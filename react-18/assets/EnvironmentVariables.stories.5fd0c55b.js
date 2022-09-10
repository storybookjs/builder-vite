var o=Object.defineProperty;var i=(e,t)=>o(e,"name",{value:t,configurable:!0});import{b as d,j as n}from"./jsx-runtime.e5670e74.js";import"./iframe.90fff738.js";function r({dynamic:e=""}){return d("div",{children:[n("h1",{children:"import\u200B.meta\u200B.env:"}),n("div",{children:JSON.stringify({STORYBOOK_ENV_VAR:"included",VITE_ENV_VAR:"included",BASE_URL:"/builder-vite/react-18/",MODE:"production",DEV:!1,PROD:!0},null,2)}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.STORYBOOK:"}),n("div",{children:"true"}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.STORYBOOK_ENV_VAR:"}),n("div",{children:"included"}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.VITE_ENV_VAR:"}),n("div",{children:"included"}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.ENV_VAR:"}),n("div",{children:{STORYBOOK_ENV_VAR:"included",VITE_ENV_VAR:"included",BASE_URL:"/builder-vite/react-18/",MODE:"production",DEV:!1,PROD:!0}.ENV_VAR}),n("h1",{children:"dynamic from props:"}),n("div",{children:e})]})}i(r,"EnvironmentVariables");r.__docgenInfo={description:"",methods:[],displayName:"EnvironmentVariables",props:{dynamic:{defaultValue:{value:"''",computed:!1},required:!1}}};const u={parameters:{storySource:{source:`import { EnvironmentVariables } from './EnvironmentVariables';

export default {
  title: 'Environment Variables',
  component: EnvironmentVariables,
};

const Template = (args) => <EnvironmentVariables {...args} />;

export const Info = Template.bind({});
Info.args = {
  dynamic: import.meta.env.VITE_ENV_VAR,
};
`,locationsMap:{info:{startLoc:{col:17,line:8},endLoc:{col:61,line:8},startBody:{col:17,line:8},endBody:{col:61,line:8}}}}},title:"Environment Variables",component:r},a=i(e=>n(r,{...e}),"Template"),l=a.bind({});l.args={dynamic:"included"};const V=["Info"];export{l as Info,V as __namedExportsOrder,u as default};
//# sourceMappingURL=EnvironmentVariables.stories.5fd0c55b.js.map
