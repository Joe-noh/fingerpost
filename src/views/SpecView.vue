<template>
  <div>
    <h1>{{spec.info.title}} <small>{{spec.info.version}}</small></h1>

    <p>{{spec.info.description}}</p>

    <b>Paths</b>
    <dl>
      <template v-for="(pathSpec, path) in spec.paths">
        <template v-for="(methodSpec, method) in pathSpec">
          <dt><b>{{method | upcase}} {{path}}</b></dt>

          <dd>
            <p>{{methodSpec.summary}}</p>
            <p>{{methodSpec.description}}</p>

            <b>Parameters</b>
            <table border="1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="param in methodSpec.parameters">
                  <td>{{param.name}}<span v-if="param.required">*</span></td>
                  <td v-if="param.type">{{param.type}}</td>
                  <td v-else-if="param.schema">
                    <a :href="param.schema.$ref | definitionId">{{param.schema.$ref | definitionModelName}}</a>
                  </td>
                  <td v-else></td>
                  <td>{{param.description}}</td>
                </tr>
              </tbody>
            </table>
            <br>

            <b>Responses</b>
            <dl>
              <template v-for="(response, responseCode) in methodSpec.responses">
                <dt>{{responseCode}}</dt>
                <dd>
                  {{response.description}}
                  <p v-if="response.schema">
                    <a :href="response.schema.$ref | definitionId">{{response.schema.$ref | definitionModelName}}</a>
                  </p>
                </dd>
              </template>
            <dl>
          </dd>

          <br>
        </template>
      </template>
    </dl>

    <b>Definitions</b>
    <dl>
      <template v-for="(model, modelName) in spec.definitions">
        <dt :id="modelName">{{modelName}}</dt>
        <dd>
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(prop, propName) in model.properties">
                <td>{{propName}}</td>
                <td>{{prop.type}}</td>
                <td>{{prop.description}}</td>
              </tr>
            </tbody>
          </table>
        </dd>
      </template>
    </dl>
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
