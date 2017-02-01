<template>
  <p>Hello</p>
</template>

<script>
  export default {
    name: 'hello-view',
    preFetch: (store) => {
      console.log('preFetch in Hello');
    }
  };
</script>
