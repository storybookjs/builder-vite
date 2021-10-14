<template>
    <div>
      <h1>import . meta . env:</h1>
      <div>{{env}}</div>
      <h1>import . meta . env . STORYBOOK:</h1>
      <div>{{storybook}}</div>
    </div>
</template>

<script>
export default {
    name: 'env-vars',
    computed: {
      env() {
        return JSON.stringify(import.meta.env, null, 2);
      },
      storybook() {
        return import.meta.env.STORYBOOK;
      }
    }
};
</script>
