<template>
  <div class="flex flex-col px-8 py-6 rounded bg-brand-gray">
    <div class="flex items-center justify-between w-full mb-8">
      <content-loader width="15%" height="20px" animation-duration="1.5s" />
      <content-loader width="15%" height="20px" animation-duration="1.5s" />
    </div>

    <content-loader width="100%" height="40px" animation-duration="1.9s" />

    <div class="flex justify-end mt-8">
      <content-loader width="5%" height="15px" animation-duration="1.5s" />
    </div>
  </div>
</template>

<script>
import ContentLoader from '../ContentLoader'
export default {
  components: { ContentLoader }
}
</script>
