import{b as r,j as n}from"./jsx-runtime.3a99580b.js";import"./iframe.6f52621d.js";function i({dynamic:e=""}){return r("div",{children:[n("h1",{children:"import\u200B.meta\u200B.env:"}),n("div",{children:JSON.stringify({STORYBOOK_ENV_VAR:"included",VITE_ENV_VAR:"included",BASE_URL:"/builder-vite/react-18/",MODE:"production",DEV:!1,PROD:!0},null,2)}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.STORYBOOK:"}),n("div",{children:"true"}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.STORYBOOK_ENV_VAR:"}),n("div",{children:"included"}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.VITE_ENV_VAR:"}),n("div",{children:"included"}),n("h1",{children:"import\u200B.meta\u200B.env\u200B.ENV_VAR:"}),n("div",{children:{STORYBOOK_ENV_VAR:"included",VITE_ENV_VAR:"included",BASE_URL:"/builder-vite/react-18/",MODE:"production",DEV:!1,PROD:!0}.ENV_VAR}),n("h1",{children:"dynamic from props:"}),n("div",{children:e})]})}i.__docgenInfo={description:"",methods:[],displayName:"EnvironmentVariables",props:{dynamic:{defaultValue:{value:"''",computed:!1},required:!1}}};const l={parameters:{storySource:{source:`import { EnvironmentVariables } from './EnvironmentVariables';

export default {
  title: 'Environment Variables',
  component: EnvironmentVariables,
};

const Template = (args) => <EnvironmentVariables {...args} />;

export const Info = Template.bind({});
Info.args = {
  dynamic: import.meta.env.VITE_ENV_VAR,
};
`,locationsMap:{info:{startLoc:{col:17,line:8},endLoc:{col:61,line:8},startBody:{col:17,line:8},endBody:{col:61,line:8}}}}},title:"Environment Variables",component:i},t=e=>n(i,{...e}),o=t.bind({});o.args={dynamic:"included"};const c=["Info"];export{o as Info,c as __namedExportsOrder,l as default};
//# sourceMappingURL=EnvironmentVariables.stories.b1feac36.js.map
