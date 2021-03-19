<template>
  <component :is="name" v-bind="$props"/>
</template>

<script>
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDonw from './ChevronDonw.vue'
import Chat from './Chat.vue'
import Close from './Close.vue'
import ArrowRight from './ArrowRight.vue'
import Success from './Success.vue'
import Error from './Error.vue'

export default {
  components: { Loading, Copy, ChevronDonw, Chat, Close, ArrowRight, Success, Error },
  props: {
    name: { type: String, required: true }
  }
}
</script>
