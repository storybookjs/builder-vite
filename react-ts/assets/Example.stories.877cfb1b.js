import{j as i}from"./jsx-runtime.a0a861f6.js";import{c as t,C as p,S as m}from"./Props.0ab930fa.js";import{B as l}from"./Button.c75e0742.js";import"./iframe.76fa48fc.js";import"./string.ee197102.js";function a(){return a=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var o=arguments[r];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},a.apply(this,arguments)}const u={},c="wrapper";function s({components:e,...r}){return t(c,a({},u,r,{components:e,mdxType:"MDXLayout"}),t("h1",null,"Embedding stories by reference in MDX files"),t("p",null,"In this example ",t("inlineCode",{parentName:"p"},"Example.stories.jsx"),` import an MDX file, which contains
references to stories by their unique ID.`),t("p",null,"See also ",t("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx"},"CSF Stories with arbitrary MDX"),"."),t("h2",null,"Button"),t(p,{mdxType:"Canvas"},t(m,{id:"example-mdx-in-stories--primary-button",mdxType:"Story"})),t("p",null,t("em",{parentName:"p"},"You should be able to see the source of the above story.")))}s.isMDXComponent=!0;const h={title:"Example/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
`,locationsMap:{"primary-button":{startLoc:{col:7,line:14},endLoc:{col:1,line:16},startBody:{col:7,line:14},endBody:{col:1,line:16}}}},docs:{page:s}}},B=function(){return i(l,{primary:!0,label:"Primary button"})},g=["PrimaryButton"];export{B as PrimaryButton,g as __namedExportsOrder,h as default};
//# sourceMappingURL=Example.stories.877cfb1b.js.map
