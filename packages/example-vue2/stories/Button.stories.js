import MyButton from './Button.vue';

export default {
    title: 'Example/Button',
    component: MyButton,
    argTypes: {
        backgroundColor: { control: 'color' },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large']
        },
        onClick: {},
    },
};

const Template = (args, {argTypes}) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { MyButton },
    props: Object.keys(argTypes),
    template: '<my-button v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
    label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
    size: 'large',
    label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    label: 'Button',
};
