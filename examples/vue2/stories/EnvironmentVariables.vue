<template>
  <div>
    <h1>import​.meta​.env:</h1>
    <div>{{ env }}</div>
    <h1>import​.meta​.env​.STORYBOOK:</h1>
    <div>{{ storybook }}</div>
    <h1>dynamic:</h1>
    <div>{{ dynamic }}</div>
  </div>
</template>

<script>
export default {
  name: 'env-vars',
  props: {
    dynamic: {
      type: String,
      required: true,
    },
  },
  computed: {
    env() {
      return JSON.stringify(import.meta.env, null, 2);
    },
    storybook() {
      return import.meta.env.STORYBOOK;
    },
  },
};
</script>
