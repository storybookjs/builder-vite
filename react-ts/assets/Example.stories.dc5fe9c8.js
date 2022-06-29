var s=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var i=(r,o)=>{var n={};for(var t in r)m.call(r,t)&&o.indexOf(t)<0&&(n[t]=r[t]);if(r!=null&&s)for(var t of s(r))o.indexOf(t)<0&&l.call(r,t)&&(n[t]=r[t]);return n};import"./index.06140e01.js";import{c as e,C as u,S as c}from"./Props.3fa7792d.js";import{j as y}from"./jsx-runtime.f1f00a27.js";import{B as d}from"./Button.a811d429.js";import"./iframe.aa735192.js";import"./string.ee197102.js";function a(){return a=Object.assign||function(r){for(var o=1;o<arguments.length;o++){var n=arguments[o];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r},a.apply(this,arguments)}const f={},b="wrapper";function p(n){var t=n,{components:r}=t,o=i(t,["components"]);return e(b,a({},f,o,{components:r,mdxType:"MDXLayout"}),e("h1",null,"Embedding stories by reference in MDX files"),e("p",null,"In this example ",e("inlineCode",{parentName:"p"},"Example.stories.jsx"),` import an MDX file, which contains
references to stories by their unique ID.`),e("p",null,"See also ",e("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx"},"CSF Stories with arbitrary MDX"),"."),e("h2",null,"Button"),e(u,{mdxType:"Canvas"},e(c,{id:"example-mdx-in-stories--primary-button",mdxType:"Story"})),e("p",null,e("em",{parentName:"p"},"You should be able to see the source of the above story.")))}p.isMDXComponent=!0;var E={title:"Example/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
`,locationsMap:{"primary-button":{startLoc:{col:7,line:14},endLoc:{col:1,line:16},startBody:{col:7,line:14},endBody:{col:1,line:16}}}},docs:{page:p}}};const P=function(){return y(d,{primary:!0,label:"Primary button"})},v=["PrimaryButton"];export{P as PrimaryButton,v as __namedExportsOrder,E as default};
//# sourceMappingURL=Example.stories.dc5fe9c8.js.map
