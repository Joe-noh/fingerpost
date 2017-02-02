<template>
  <div>
    <pre><code>{{spec}}</code></pre>
  </div>
</template>

<script>
function fetchSpec(store) {
  let url = 'http://petstore.swagger.io/v2/swagger.json';
  return store.dispatch('FETCH_SPEC', {url});
}

export default {
  name: 'hello-view',
  preFetch: fetchSpec,
  beforeMount() {
    fetchSpec(this.$store);
  },
  computed: {
    spec() {
      return this.$store.state.spec;
    }
  }
};
</script>
