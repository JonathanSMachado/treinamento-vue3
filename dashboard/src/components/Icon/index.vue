<template>
  <component :is="name" v-bind="$props"/>
</template>

<script>
import Loading from './Loading'
import Copy from './Copy'
import ChevronDonw from './ChevronDonw'

export default {
  components: { Loading, Copy, ChevronDonw },
  props: {
    name: { type: String, required: true }
  }
}
</script>
