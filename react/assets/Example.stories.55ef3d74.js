var a=Object.defineProperty;var n=(o,t)=>a(o,"name",{value:t,configurable:!0});import{j as e,a as r,F as m}from"./jsx-runtime.ce048799.js";import{u as s,C as c,S as d}from"./Props.84d9ee38.js";import"./iframe.5e074374.js";import{B as l}from"./Button.42372bc7.js";import"./string.022dca0d.js";import"./es.map.constructor.f7273d9f.js";import"./es.number.to-fixed.2bc23382.js";import"./index.da9f964c.js";function i(o){const t=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",em:"em"},s(),o.components);return r(m,{children:[e(t.h1,{children:"Embedding stories by reference in MDX files"}),`
`,r(t.p,{children:["In this example ",e(t.code,{children:"Example.stories.jsx"}),` import an MDX file, which contains
references to stories by their unique ID.`]}),`
`,r(t.p,{children:["See also ",e(t.a,{href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx",children:"CSF Stories with arbitrary MDX"}),"."]}),`
`,e(t.h2,{children:"Button"}),`
`,e(c,{children:e(d,{id:"examples-mdx-in-stories--primary-button"})}),`
`,e(t.p,{children:e(t.em,{children:"You should be able to see the source of the above story."})})]})}n(i,"_createMdxContent");function p(o={}){const{wrapper:t}=Object.assign({},s(),o.components);return t?e(t,Object.assign({},o,{children:e(i,o)})):i(o)}n(p,"MDXContent");const P={title:"Examples/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
;PrimaryButton.__docgenInfo={"description":"","methods":[],"displayName":"PrimaryButton"}`,locationsMap:{"primary-button":{startLoc:{col:7,line:15},endLoc:{col:1,line:17},startBody:{col:7,line:15},endBody:{col:1,line:17}}}},docs:{page:p}}},u=n(function(){return e(l,{primary:!0,label:"Primary button"})},"PrimaryButton2");u.__docgenInfo={description:"",methods:[],displayName:"PrimaryButton"};const _=["PrimaryButton"];export{u as PrimaryButton,_ as __namedExportsOrder,P as default};
//# sourceMappingURL=Example.stories.55ef3d74.js.map
