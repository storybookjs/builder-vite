import page from './Example.docs.mdx';
import { Button } from '../Button';

export default {
    title: 'app1/Example/MDX in stories',

    parameters: {
        docs: {
            page,
        },
    },
};

export function PrimaryButton() {
    return <Button primary label="Primary button" />;
}
