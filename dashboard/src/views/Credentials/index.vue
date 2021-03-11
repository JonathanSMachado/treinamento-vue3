<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>
  <div class="flex flex-col justify-center items-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>
    <p class="text-lg text-center tex-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col px-5 w-full sm:w-2/3 md:w-3/4 lg:w-1/2 max-w-6xl py-10">
      <h1 class="text-3xl font-blac text-center text-brand-darkgray">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Esta aqui é sua chave de API
      </p>

      <content-loader v-if="store.Global.isLoading || state.isLoading"
        class="rounded" width="600px" height="50px" />

      <div v-else class="flex py-3 px-5 mt-2 rounded items-center justify-between bg-brand-gray">
        <span v-if="state.hasError">Erro ao carregar a apikey</span>
        <span v-else id="apikey-container">{{ store.User.currentUser.apiKey }}</span>
        <div v-if="!state.hasError" class="flex">
          <icon name="copy" :color="brandColors.graydark" size="24" class="cursor-pointer"
            @click="handleCopy"/>
          <icon id="generate-apikey-button" name="loading" :color="brandColors.graydark" size="24" class="cursor-pointer ml-3"
            @click="handleGenerateApiKey"/>
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader v-if="store.Global.isLoading || state.isLoading"
        class="rounded" width="600px" height="50px" />

      <div v-else class="py-3 px-5 mt-2 rounded bg-brand-gray overflow-scroll">
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <pre v-else>&lt;script src="https://jonathansmachado-feedbacker-widget.netlify.app?api_key={{ store.User.currentUser.apiKey }}"&gt;&lt;/script&gt;</pre>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import ContentLoader from '../../components/ContentLoader'
import useStore from '../../hooks/useStore'
import pallete from '../../../pallete'
import Icon from '../../components/Icon'
import { reactive, watch } from 'vue'
import services from '../../services'
import { setApiKey } from '../../store/user'
import { useToast } from 'vue-toastification'

export default {
  components: { ContentLoader, HeaderLogged, Icon },
  setup () {
    const store = useStore()
    const toast = useToast()
    const state = reactive({
      hasError: false,
      isLoading: false
    })

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    async function handleCopy () {
      toast.clear()
      try {
        await window.navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copiado!')
      } catch (error) {
        handleError(error)
      }
    }

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true

        const { data } = await services.users.generateApiKey()
        setApiKey(data.apiKey)

        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    function handleError (error) {
      state.hasError = !!error
      state.isLoading = false
    }

    return {
      store,
      state,
      handleGenerateApiKey,
      handleCopy,
      brandColors: pallete.brand
    }
  }
}
</script>
