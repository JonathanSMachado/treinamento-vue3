<template>
  <teleport to="body">
    <component :is="state.component"
      @open-box="handleOpenBox"
      @close-box="handleCloseBox"
    />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import Standby from './Standby.vue'
import Box from './Box.vue'
import useIframeControl from '../../hooks/iframe'
import useStore from '../../hooks/store'

type State = {
  component: string;
}

interface StateReturn {
  state: State;
  handleOpenBox(): void;
  handleCloseBox(): void;
}

export default defineComponent({
  components: { Box, Standby },
  setup (): StateReturn {
    const store = useStore()
    const iframe = useIframeControl()
    const state = reactive<State>({
      component: 'Standby'
    })

    watch(() => store.currentComponent, () => {
      iframe.updateCoreValuesOnStore()
    })

    function handleCloseBox (): void {
      iframe.notifyClose()
      state.component = 'Standby'
    }

    function handleOpenBox (): void {
      iframe.notifyOpen()
      state.component = 'Box'
    }

    return {
      state,
      handleCloseBox,
      handleOpenBox
    }
  }
})
</script>
