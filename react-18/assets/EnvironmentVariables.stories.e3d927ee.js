var o=Object.defineProperty;var i=(n,r)=>o(n,"name",{value:r,configurable:!0});import{b as a,j as e}from"./jsx-runtime.fcdea948.js";import"./iframe.db4ba553.js";var d=Object.defineProperty,l=i((n,r)=>d(n,"name",{value:r,configurable:!0}),"__name$1");function t({dynamic:n=""}){return a("div",{children:[e("h1",{children:"import\u200B.meta\u200B.env:"}),e("div",{children:JSON.stringify({STORYBOOK_ENV_VAR:"included",VITE_ENV_VAR:"included",BASE_URL:"/builder-vite/react-18/",MODE:"production",DEV:!1,PROD:!0},null,2)}),e("h1",{children:"import\u200B.meta\u200B.env\u200B.STORYBOOK:"}),e("div",{children:"true"}),e("h1",{children:"import\u200B.meta\u200B.env\u200B.STORYBOOK_ENV_VAR:"}),e("div",{children:"included"}),e("h1",{children:"import\u200B.meta\u200B.env\u200B.VITE_ENV_VAR:"}),e("div",{children:"included"}),e("h1",{children:"import\u200B.meta\u200B.env\u200B.ENV_VAR:"}),e("div",{children:{STORYBOOK_ENV_VAR:"included",VITE_ENV_VAR:"included",BASE_URL:"/builder-vite/react-18/",MODE:"production",DEV:!1,PROD:!0}.ENV_VAR}),e("h1",{children:"dynamic from props:"}),e("div",{children:n})]})}i(t,"EnvironmentVariables");l(t,"EnvironmentVariables");t.__docgenInfo={description:"",methods:[],displayName:"EnvironmentVariables",props:{dynamic:{defaultValue:{value:"''",computed:!1},required:!1}}};var c=Object.defineProperty,m=i((n,r)=>c(n,"name",{value:r,configurable:!0}),"__name");const v={parameters:{storySource:{source:`import { EnvironmentVariables } from './EnvironmentVariables';

export default {
  title: 'Environment Variables',
  component: EnvironmentVariables,
};

const Template = (args) => <EnvironmentVariables {...args} />;

export const Info = Template.bind({});
Info.args = {
  dynamic: import.meta.env.VITE_ENV_VAR,
};
`,locationsMap:{info:{startLoc:{col:17,line:8},endLoc:{col:61,line:8},startBody:{col:17,line:8},endBody:{col:61,line:8}}}}},title:"Environment Variables",component:t},s=m(n=>e(t,{...n}),"Template"),u=s.bind({});u.args={dynamic:"included"};const E=["Info"];export{u as Info,E as __namedExportsOrder,v as default};
//# sourceMappingURL=EnvironmentVariables.stories.e3d927ee.js.map
