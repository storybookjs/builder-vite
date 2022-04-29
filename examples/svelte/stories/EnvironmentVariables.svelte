<script>
  export const env = JSON.stringify(import.meta.env, null, 2);
  export const storybook = import.meta.env.STORYBOOK;
  export let dynamic = '';
</script>


<div>
  <h1>impor​.meta​.env:</h1>
  <div>{env}</div>
  <h1>import​.meta​.env​.STORYBOOK:</h1>
  <div>{storybook}</div>
  <h1>dynamic:</h1>
  <div>{dynamic}</div>
</div>

