<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import EnvironmentVariables from "./EnvironmentVariables.svelte";
</script>

<Meta
  title="Environment Variables"
  component={EnvironmentVariables}
/>

<Template let:args>
  <EnvironmentVariables {...args} />
</Template>

<Story name="Info" args={{
  dynamic: import.meta.env.VITE_ENV_VAR,
}} />
