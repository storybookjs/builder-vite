import page from './Example.docs.mdx';
import { Button } from '../Button';

export default {
  // This title overrides the autotitle defined in the configuration object in main.js
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
