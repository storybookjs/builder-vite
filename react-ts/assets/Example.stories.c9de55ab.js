var m=Object.defineProperty;var o=(r,e)=>m(r,"name",{value:e,configurable:!0});import{j as p}from"./jsx-runtime.e50c368b.js";import{c as t,C as l,S as u}from"./Props.537d7898.js";import"./iframe.a6bd28f8.js";import{B as c}from"./Button.ad91efb0.js";import"./string.9ae7e1d2.js";import"./es.map.constructor.a766125e.js";import"./es.number.to-fixed.46123269.js";function s(){return s=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(r[a]=n[a])}return r},s.apply(this,arguments)}o(s,"_extends");const d={},y="wrapper";function i({components:r,...e}){return t(y,s({},d,e,{components:r,mdxType:"MDXLayout"}),t("h1",null,"Embedding stories by reference in MDX files"),t("p",null,"In this example ",t("inlineCode",{parentName:"p"},"Example.stories.jsx"),` import an MDX file, which contains
references to stories by their unique ID.`),t("p",null,"See also ",t("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx"},"CSF Stories with arbitrary MDX"),"."),t("h2",null,"Button"),t(l,{mdxType:"Canvas"},t(u,{id:"example-mdx-in-stories--primary-button",mdxType:"Story"})),t("p",null,t("em",{parentName:"p"},"You should be able to see the source of the above story.")))}o(i,"MDXContent");i.isMDXComponent=!0;var b=Object.defineProperty,f=o((r,e)=>b(r,"name",{value:e,configurable:!0}),"__name");const j={title:"Example/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
`,locationsMap:{"primary-button":{startLoc:{col:7,line:14},endLoc:{col:1,line:16},startBody:{col:7,line:14},endBody:{col:1,line:16}}}},docs:{page:i}}},v=f(o(function(){return p(c,{primary:!0,label:"Primary button"})},"PrimaryButton2"),"PrimaryButton"),E=["PrimaryButton"];export{v as PrimaryButton,E as __namedExportsOrder,j as default};
//# sourceMappingURL=Example.stories.c9de55ab.js.map
