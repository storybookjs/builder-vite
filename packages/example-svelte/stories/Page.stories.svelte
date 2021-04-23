<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Page from "./Page.svelte";
</script>

<Meta
  title="Example/Page"
  component={Page}
  argTypes={{
    onLogin: { action: "onLogin" },
    onLogout: { action: "onLogout" },
    onCreateAccount: { action: "onCreateAccount" },
  }}
/>

<Template let:args>
  <Page
    {...args}
    on:login={args.onLogin}
    on:logout={args.onLogout}
    on:createAccount={args.onCreateAccount}
  />
</Template>

<Story
  name="LoggedIn"
  args={{
    user: {},
  }}
/>

<Story name="LoggedOut" args={{}} />
