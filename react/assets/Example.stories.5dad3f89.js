import{j as e,a as n,F as s}from"./jsx-runtime.531900c9.js";import{u as i,C as a,S as m}from"./Props.16a04797.js";import"./iframe.cb92c9c6.js";import{B as c}from"./Button.1004bac6.js";import"./string.b9eff9fb.js";import"./es.map.constructor.352c8f1d.js";import"./es.number.to-fixed.3e31350f.js";import"./index.da9f964c.js";function r(o){const t=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",em:"em"},i(),o.components);return n(s,{children:[e(t.h1,{children:"Embedding stories by reference in MDX files"}),`
`,n(t.p,{children:["In this example ",e(t.code,{children:"Example.stories.jsx"}),` import an MDX file, which contains
references to stories by their unique ID.`]}),`
`,n(t.p,{children:["See also ",e(t.a,{href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx",children:"CSF Stories with arbitrary MDX"}),"."]}),`
`,e(t.h2,{children:"Button"}),`
`,e(a,{children:e(m,{id:"examples-mdx-in-stories--primary-button"})}),`
`,e(t.p,{children:e(t.em,{children:"You should be able to see the source of the above story."})})]})}function d(o={}){const{wrapper:t}=Object.assign({},i(),o.components);return t?e(t,Object.assign({},o,{children:e(r,o)})):r(o)}const g={title:"Examples/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
;PrimaryButton.__docgenInfo={"description":"","methods":[],"displayName":"PrimaryButton"}`,locationsMap:{"primary-button":{startLoc:{col:7,line:15},endLoc:{col:1,line:17},startBody:{col:7,line:15},endBody:{col:1,line:17}}}},docs:{page:d}}},l=function(){return e(c,{primary:!0,label:"Primary button"})};l.__docgenInfo={description:"",methods:[],displayName:"PrimaryButton"};const M=["PrimaryButton"];export{l as PrimaryButton,M as __namedExportsOrder,g as default};
//# sourceMappingURL=Example.stories.5dad3f89.js.map
