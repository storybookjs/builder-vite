var m=Object.defineProperty;var e=(o,r)=>m(o,"name",{value:r,configurable:!0});import{j as p}from"./jsx-runtime.e5670e74.js";import{c as t,C as l,S as u}from"./Props.da272130.js";import"./iframe.90fff738.js";import{B as c}from"./Button.e2aa021c.js";import"./string.d81eabde.js";import"./es.map.constructor.b97f4295.js";import"./es.number.to-fixed.786c4e6c.js";import"./index.da9f964c.js";function s(){return s=Object.assign?Object.assign.bind():function(o){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(o[a]=n[a])}return o},s.apply(this,arguments)}e(s,"_extends");const d={},y="wrapper";function i({components:o,...r}){return t(y,s({},d,r,{components:o,mdxType:"MDXLayout"}),t("h1",null,"Embedding stories by reference in MDX files"),t("p",null,"In this example ",t("inlineCode",{parentName:"p"},"Example.stories.jsx"),` import an MDX file, which contains
references to stories by their unique ID.`),t("p",null,"See also ",t("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx"},"CSF Stories with arbitrary MDX"),"."),t("h2",null,"Button"),t(l,{mdxType:"Canvas"},t(u,{id:"example-mdx-in-stories--primary-button",mdxType:"Story"})),t("p",null,t("em",{parentName:"p"},"You should be able to see the source of the above story.")))}e(i,"MDXContent");i.isMDXComponent=!0;const E={title:"Example/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
;PrimaryButton.__docgenInfo={"description":"","methods":[],"displayName":"PrimaryButton"}`,locationsMap:{"primary-button":{startLoc:{col:7,line:14},endLoc:{col:1,line:16},startBody:{col:7,line:14},endBody:{col:1,line:16}}}},docs:{page:i}}},f=e(function(){return p(c,{primary:!0,label:"Primary button"})},"PrimaryButton2");f.__docgenInfo={description:"",methods:[],displayName:"PrimaryButton"};const _=["PrimaryButton"];export{f as PrimaryButton,_ as __namedExportsOrder,E as default};
//# sourceMappingURL=Example.stories.1444db30.js.map
