import"./index.b1fcdde0.js";import{c as t,C as n,S as a}from"./Props.d7641c41.js";import{j as i}from"./jsx-runtime.324548eb.js";import{B as s}from"./Button.07463c74.js";import"./iframe.787fca26.js";import"./string.ee197102.js";import"./index.33068e5f.js";const m={},p="wrapper";function e({components:o,...r}){return t(p,{...m,...r,components:o,mdxType:"MDXLayout"},t("h1",null,"Embedding stories by reference in MDX files"),t("p",null,"In this example ",t("inlineCode",{parentName:"p"},"Example.stories.jsx"),` import an MDX file, which contains
references to stories by their unique ID.`),t("p",null,"See also ",t("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx"},"CSF Stories with arbitrary MDX"),"."),t("h2",null,"Button"),t(n,{mdxType:"Canvas"},t(a,{id:"example-mdx-in-stories--primary-button",mdxType:"Story"})),t("p",null,t("em",{parentName:"p"},"You should be able to see the source of the above story.")))}e.isMDXComponent=!0;var h={title:"Example/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
;PrimaryButton.__docgenInfo={"description":"","methods":[],"displayName":"PrimaryButton"}`,locationsMap:{"primary-button":{startLoc:{col:7,line:14},endLoc:{col:1,line:16},startBody:{col:7,line:14},endBody:{col:1,line:16}}}},docs:{page:e}}};const l=function(){return i(s,{primary:!0,label:"Primary button"})};l.__docgenInfo={description:"",methods:[],displayName:"PrimaryButton"};const B=["PrimaryButton"];export{l as PrimaryButton,B as __namedExportsOrder,h as default};
//# sourceMappingURL=Example.stories.a0f3c8b8.js.map
