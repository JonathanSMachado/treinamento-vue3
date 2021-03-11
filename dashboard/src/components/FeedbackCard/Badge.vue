<template>
  <span class="p-2 text-xs font-black text-white uppercase rounded-full"
    :class="`bg-brand-${classColor}`">
    {{ label }}
  </span>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    type: { type: String, required: true }
  },

  setup (props) {
    const label = computed(() => {
      if (props.type === 'ISSUE') {
        return 'problema'
      }

      if (props.type === 'IDEA') {
        return 'ideia'
      }

      return 'outros'
    })

    const classColor = computed(() => {
      if (props.type === 'ISSUE') {
        return 'danger'
      }

      if (props.type === 'IDEA') {
        return 'warning'
      }

      return 'graydark'
    })

    return {
      label,
      classColor
    }
  }

}
</script>
