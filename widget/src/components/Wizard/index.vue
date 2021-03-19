<template>
  <component :is="store.currentComponent"
    @select-feedback-type="handleFeedbackType"
    @next="next"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SelectFeedbackType from './SelectFeedbackType.vue'
import WriteAFeedback from './WriteAFeedback.vue'
import Success from './Success.vue'
import ErrorState from './Error.vue'
import useNavigation, { Navigation } from '../../hooks/navigation'
import useStore from '../../hooks/store'
import { setFeedbackType, StoreState } from '../../store'

interface SetupReturn {
  store: StoreState;
  handleFeedbackType(type: string): void;
  next: Navigation['next'];
}

export default defineComponent({
  components: { SelectFeedbackType, WriteAFeedback, Success, Error: ErrorState },
  setup (): SetupReturn {
    const store = useStore()
    const { next } = useNavigation()

    function handleFeedbackType (type: string): void {
      setFeedbackType(type)
    }

    return { store, handleFeedbackType, next }
  }
})
</script>
