import{j as i}from"./jsx-runtime.b7c3683d.js";import{c as t,C as p,S as m}from"./Props.7234f8a6.js";import"./iframe.da1ca399.js";import{B as l}from"./Button.d5fae09d.js";import"./string.0bb2a6e9.js";import"./es.map.constructor.c3dac926.js";import"./es.number.to-fixed.51d5124f.js";function a(){return a=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(r[n]=o[n])}return r},a.apply(this,arguments)}const u={},c="wrapper";function s({components:r,...e}){return t(c,a({},u,e,{components:r,mdxType:"MDXLayout"}),t("h1",null,"Embedding stories by reference in MDX files"),t("p",null,"In this example ",t("inlineCode",{parentName:"p"},"Example.stories.jsx"),` import an MDX file, which contains
references to stories by their unique ID.`),t("p",null,"See also ",t("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx"},"CSF Stories with arbitrary MDX"),"."),t("h2",null,"Button"),t(p,{mdxType:"Canvas"},t(m,{id:"example-mdx-in-stories--primary-button",mdxType:"Story"})),t("p",null,t("em",{parentName:"p"},"You should be able to see the source of the above story.")))}s.isMDXComponent=!0;const g={title:"Example/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
`,locationsMap:{"primary-button":{startLoc:{col:7,line:14},endLoc:{col:1,line:16},startBody:{col:7,line:14},endBody:{col:1,line:16}}}},docs:{page:s}}},D=function(){return i(l,{primary:!0,label:"Primary button"})},M=["PrimaryButton"];export{D as PrimaryButton,M as __namedExportsOrder,g as default};
//# sourceMappingURL=Example.stories.7a3d92c6.js.map
