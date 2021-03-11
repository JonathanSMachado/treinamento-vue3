<template>
  <div class="w-full">
    <content-loader
      class="mt-3 px-4 py-1 rounded"
      width="100%"
      height="32px"
      animation-duration="1.5s"
    />
    <content-loader
      class="mt-1 px-4 py-1 rounded"
      width="100%"
      height="32px"
      animation-duration="1.7s"
    />
    <content-loader
      class="mt-1 px-4 py-1 rounded"
      width="100%"
      height="32px"
      animation-duration="1.9s"
    />
    <content-loader
      class="mt-1 px-4 py-1 rounded"
      width="100%"
      height="32px"
      animation-duration="2.1s"
    />
  </div>
</template>

<script>
import ContentLoader from '../../components/ContentLoader'
export default {
  components: { ContentLoader }

}
</script>
