var s=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var i=(r,e)=>{var n={};for(var t in r)p.call(r,t)&&e.indexOf(t)<0&&(n[t]=r[t]);if(r!=null&&s)for(var t of s(r))e.indexOf(t)<0&&l.call(r,t)&&(n[t]=r[t]);return n};import"./index.fdaa6df7.js";import{c as o,C as u,S as c}from"./Props.f49186d0.js";import{j as d}from"./jsx-runtime.ba8985d3.js";import{B as y}from"./Button.4b729409.js";import"./iframe.4dbd6135.js";import"./string.ee197102.js";import"./index.33068e5f.js";function a(){return a=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r},a.apply(this,arguments)}const f={},b="wrapper";function m(n){var t=n,{components:r}=t,e=i(t,["components"]);return o(b,a({},f,e,{components:r,mdxType:"MDXLayout"}),o("h1",null,"Embedding stories by reference in MDX files"),o("p",null,"In this example ",o("inlineCode",{parentName:"p"},"Example.stories.jsx"),` import an MDX file, which contains
references to stories by their unique ID.`),o("p",null,"See also ",o("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx"},"CSF Stories with arbitrary MDX"),"."),o("h2",null,"Button"),o(u,{mdxType:"Canvas"},o(c,{id:"example-mdx-in-stories--primary-button",mdxType:"Story"})),o("p",null,o("em",{parentName:"p"},"You should be able to see the source of the above story.")))}m.isMDXComponent=!0;var _={title:"Example/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
;PrimaryButton.__docgenInfo={"description":"","methods":[],"displayName":"PrimaryButton"}`,locationsMap:{"primary-button":{startLoc:{col:7,line:14},endLoc:{col:1,line:16},startBody:{col:7,line:14},endBody:{col:1,line:16}}}},docs:{page:m}}};const x=function(){return d(y,{primary:!0,label:"Primary button"})};x.__docgenInfo={description:"",methods:[],displayName:"PrimaryButton"};const v=["PrimaryButton"];export{x as PrimaryButton,v as __namedExportsOrder,_ as default};
//# sourceMappingURL=Example.stories.640e46e2.js.map
