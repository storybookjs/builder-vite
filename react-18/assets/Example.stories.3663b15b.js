var m=Object.defineProperty;var o=(r,e)=>m(r,"name",{value:e,configurable:!0});import{j as p}from"./jsx-runtime.fcdea948.js";import{c as t,C as l,S as u}from"./Props.39400511.js";import"./iframe.db4ba553.js";import{B as c}from"./Button.fc23cfbd.js";import"./string.b3eb7273.js";import"./es.map.constructor.ee23c920.js";import"./es.number.to-fixed.2c3f38f8.js";import"./index.da9f964c.js";function i(){return i=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(r[a]=n[a])}return r},i.apply(this,arguments)}o(i,"_extends");const d={},y="wrapper";function s({components:r,...e}){return t(y,i({},d,e,{components:r,mdxType:"MDXLayout"}),t("h1",null,"Embedding stories by reference in MDX files"),t("p",null,"In this example ",t("inlineCode",{parentName:"p"},"Example.stories.jsx"),` import an MDX file, which contains
references to stories by their unique ID.`),t("p",null,"See also ",t("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx"},"CSF Stories with arbitrary MDX"),"."),t("h2",null,"Button"),t(l,{mdxType:"Canvas"},t(u,{id:"example-mdx-in-stories--primary-button",mdxType:"Story"})),t("p",null,t("em",{parentName:"p"},"You should be able to see the source of the above story.")))}o(s,"MDXContent");s.isMDXComponent=!0;var f=Object.defineProperty,b=o((r,e)=>f(r,"name",{value:e,configurable:!0}),"__name");const v={title:"Example/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
import { Button } from '../Button';

export default {
  title: 'Example/MDX in stories',

  parameters: {
    docs: {
      page,
    },
  },
};

export function PrimaryButton() {
  return <Button primary label="Primary button" />;
}
;PrimaryButton.__docgenInfo={"description":"","methods":[],"displayName":"PrimaryButton"}`,locationsMap:{"primary-button":{startLoc:{col:7,line:14},endLoc:{col:1,line:16},startBody:{col:7,line:14},endBody:{col:1,line:16}}}},docs:{page:s}}},x=b(o(function(){return p(c,{primary:!0,label:"Primary button"})},"PrimaryButton2"),"PrimaryButton");x.__docgenInfo={description:"",methods:[],displayName:"PrimaryButton"};const E=["PrimaryButton"];export{x as PrimaryButton,E as __namedExportsOrder,v as default};
//# sourceMappingURL=Example.stories.3663b15b.js.map
