var a=Object.defineProperty;var o=(e,t)=>a(e,"name",{value:t,configurable:!0});import{j as n,a as r,F as m}from"./jsx-runtime.f3067177.js";import{u as s,C as c,S as d}from"./Props.5389b429.js";import"./iframe.5142b79a.js";import{B as l}from"./Button.8607b9f8.js";import"./string.3640c6f3.js";import"./es.map.constructor.66ae9476.js";import"./es.number.to-fixed.83d3c591.js";import"./index.da9f964c.js";function i(e){const t=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",em:"em"},s(),e.components);return r(m,{children:[n(t.h1,{children:"Embedding stories by reference in MDX files"}),`
`,r(t.p,{children:["In this example ",n(t.code,{children:"Example.stories.jsx"}),` import an MDX file, which contains
references to stories by their unique ID.`]}),`
`,r(t.p,{children:["See also ",n(t.a,{href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx",children:"CSF Stories with arbitrary MDX"}),"."]}),`
`,n(t.h2,{children:"Button"}),`
`,n(c,{children:n(d,{id:"examples-mdx-in-stories--primary-button"})}),`
`,n(t.p,{children:n(t.em,{children:"You should be able to see the source of the above story."})})]})}o(i,"_createMdxContent");function p(e={}){const{wrapper:t}=Object.assign({},s(),e.components);return t?n(t,Object.assign({},e,{children:n(i,e)})):i(e)}o(p,"MDXContent");var u=Object.defineProperty,h=o((e,t)=>u(e,"name",{value:t,configurable:!0}),"__name");const D={title:"Examples/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
;PrimaryButton.__docgenInfo={"description":"","methods":[],"displayName":"PrimaryButton"}`,locationsMap:{"primary-button":{startLoc:{col:7,line:15},endLoc:{col:1,line:17},startBody:{col:7,line:15},endBody:{col:1,line:17}}}},docs:{page:p}}},y=h(o(function(){return n(l,{primary:!0,label:"Primary button"})},"PrimaryButton2"),"PrimaryButton");y.__docgenInfo={description:"",methods:[],displayName:"PrimaryButton"};const X=["PrimaryButton"];export{y as PrimaryButton,X as __namedExportsOrder,D as default};
//# sourceMappingURL=Example.stories.d7d71ba4.js.map
