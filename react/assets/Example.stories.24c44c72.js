import{j as e,a as o,F as s}from"./jsx-runtime.98fdd820.js";import{u as i,C as a,S as c}from"./Props.12ce4f90.js";import{B as m}from"./Button.6c1da02c.js";import"./iframe.5d11be32.js";import"./string.ee197102.js";import"./index.da9f964c.js";function r(n){const t=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",em:"em"},i(),n.components);return o(s,{children:[e(t.h1,{children:"Embedding stories by reference in MDX files"}),`
`,o(t.p,{children:["In this example ",e(t.code,{children:"Example.stories.jsx"}),` import an MDX file, which contains
references to stories by their unique ID.`]}),`
`,o(t.p,{children:["See also ",e(t.a,{href:"https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx",children:"CSF Stories with arbitrary MDX"}),"."]}),`
`,e(t.h2,{children:"Button"}),`
`,e(a,{children:e(c,{id:"examples-mdx-in-stories--primary-button"})}),`
`,e(t.p,{children:e(t.em,{children:"You should be able to see the source of the above story."})})]})}function d(n={}){const{wrapper:t}=Object.assign({},i(),n.components);return t?e(t,Object.assign({},n,{children:e(r,n)})):r(n)}const x={title:"Examples/MDX in stories",parameters:{storySource:{source:`import page from './Example.docs.mdx';
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
;PrimaryButton.__docgenInfo={"description":"","methods":[],"displayName":"PrimaryButton"}`,locationsMap:{"primary-button":{startLoc:{col:7,line:15},endLoc:{col:1,line:17},startBody:{col:7,line:15},endBody:{col:1,line:17}}}},docs:{page:d}}},l=function(){return e(m,{primary:!0,label:"Primary button"})};l.__docgenInfo={description:"",methods:[],displayName:"PrimaryButton"};const B=["PrimaryButton"];export{l as PrimaryButton,B as __namedExportsOrder,x as default};
//# sourceMappingURL=Example.stories.24c44c72.js.map
