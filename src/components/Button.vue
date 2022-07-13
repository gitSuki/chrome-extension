<template>
  <button @click="onClick()">Get Kitsunekko Data</button>
</template>

<script>
export default {
  name: 'Button',
  methods: {
    onClick() {
      this.$emit('generate-kitsunekko-data')
    }
  },
}
</script>