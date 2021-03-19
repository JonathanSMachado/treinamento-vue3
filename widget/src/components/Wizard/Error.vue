<template>
  <div class="flex flex-col items-center justify-between w-full my-5">
    <icon name="error" :color="brandColors.danger" size="70" />

    <p class="text-xl font-black text-center w-full mt-2">
      Droga! Aconteceu algum erro.
    </p>

    <div class="flex justify-center items-center w-full mt-2">
      <button class="rounded-full font-regular text-sm flex flex-col
        justify-center bg-brand-gray items-center py-2 px-5 cursor-pointer
        focus:outline-none hover:bg-gray-200 transition-all duration-200 outline-none"
        @click="goToSelectFeedbackType">
        Tente novamente
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../Icon/index.vue'
import pallete from '../../../pallete'
import useNavigation from '../../hooks/navigation'

interface SetupReturn {
  goToSelectFeedbackType(): void;
  brandColors: Record<string, string>;
}

export default defineComponent({
  components: { Icon },
  setup (): SetupReturn {
    const { goToSelectFeedbackType } = useNavigation()

    return {
      goToSelectFeedbackType,
      brandColors: pallete.brand
    }
  }
})
</script>
