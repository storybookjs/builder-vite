import"./index.06140e01.js";import{j as t,a as n,F as a}from"./jsx-runtime.f1f00a27.js";import{u as s,C as m,S as c}from"./Props.cb0479a6.js";import{B as d}from"./Button.9b01f3c7.js";import"./iframe.2cca53d5.js";import"./string.ee197102.js";import"./index.33068e5f.js";function l(o={}){const{wrapper:r}=Object.assign({},s(),o.components);return r?t(r,Object.assign({},o,{children:t(i,{})})):i();function i(){const e=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",em:"em"},s(),o.components);return n(a,{children:[t(e.h1,{children:"Embedding stories by reference in MDX files"}),`
`,n(e.p,{children:["In this example ",t(e.code,{children:"Example.stories.jsx"}),` import an MDX file, which contains
references to stories by their unique ID.`]}),`
`,n(e.p,{children:["See also ",t(e.a,{href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx",children:"CSF Stories with arbitrary MDX"}),"."]}),`
`,t(e.h2,{children:"Button"}),`
`,t(m,{children:t(c,{id:"examples-mdx-in-stories--primary-button"})}),`
`,t(e.p,{children:t(e.em,{children:"You should be able to see the source of the above story."})})]})}}var g={title:"Examples/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
import { Button } from '../components/Button';

export default {
  // This title overrides the autotitle
  title: 'Examples/MDX in stories',

  parameters: {
    docs: {
      page,
    },
  },
};

export function PrimaryButton() {
  return <Button primary label="Primary button" />;
}
;PrimaryButton.__docgenInfo={"description":"","methods":[],"displayName":"PrimaryButton"}`,locationsMap:{"primary-button":{startLoc:{col:7,line:15},endLoc:{col:1,line:17},startBody:{col:7,line:15},endBody:{col:1,line:17}}}},docs:{page:l}}};const p=function(){return t(d,{primary:!0,label:"Primary button"})};p.__docgenInfo={description:"",methods:[],displayName:"PrimaryButton"};const M=["PrimaryButton"];export{p as PrimaryButton,M as __namedExportsOrder,g as default};
//# sourceMappingURL=Example.stories.ff80bd47.js.map
