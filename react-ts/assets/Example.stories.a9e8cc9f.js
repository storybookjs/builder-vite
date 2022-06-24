import"./index.06140e01.js";import{c as t,C as n,S as a}from"./Props.c496e2bd.js";import{j as s}from"./jsx-runtime.f1f00a27.js";import{B as i}from"./Button.a811d429.js";import"./iframe.4f367d79.js";import"./string.ee197102.js";const m={},p="wrapper";function o({components:e,...r}){return t(p,{...m,...r,components:e,mdxType:"MDXLayout"},t("h1",null,"Embedding stories by reference in MDX files"),t("p",null,"In this example ",t("inlineCode",{parentName:"p"},"Example.stories.jsx"),` import an MDX file, which contains
references to stories by their unique ID.`),t("p",null,"See also ",t("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx"},"CSF Stories with arbitrary MDX"),"."),t("h2",null,"Button"),t(n,{mdxType:"Canvas"},t(a,{id:"example-mdx-in-stories--primary-button",mdxType:"Story"})),t("p",null,t("em",{parentName:"p"},"You should be able to see the source of the above story.")))}o.isMDXComponent=!0;var b={title:"Example/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
`,locationsMap:{"primary-button":{startLoc:{col:7,line:14},endLoc:{col:1,line:16},startBody:{col:7,line:14},endBody:{col:1,line:16}}}},docs:{page:o}}};const f=function(){return s(i,{primary:!0,label:"Primary button"})},h=["PrimaryButton"];export{f as PrimaryButton,h as __namedExportsOrder,b as default};
//# sourceMappingURL=Example.stories.a9e8cc9f.js.map
