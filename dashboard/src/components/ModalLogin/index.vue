<template>
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input id="email-field" type="email" class="block w-full px-4 py-3 mt-1 text-md bg-gray-100 border-2 border-transparent rounded"
          placeholder="example@email.com"
          v-model="state.email.value"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }">
        <span id="email-error" class="block font-medium text-brand-danger"
          v-if="!!state.email.errorMessage">
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input id="password-field" type="password" class="block w-full px-4 py-3 mt-1 text-md bg-gray-100 border-2 border-transparent rounded"
          v-model="state.password.value"
          :class="{ 'border-brand-danger': !!state.password.errorMessage }">
        <span id="password-error" class="block font-medium text-brand-danger"
          v-if="!!state.password.errorMessage">
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button id="submit-button" type="submit" :disabled="state.isLoading" :class="{ 'opacity-50': state.isLoading }"
        class="float-right px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150">
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
</template>

<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import { validateEmptyAndEmail, validateEmptyAndLength3 } from '../../utils/validators'
import useModal from '../../hooks/useModal'
import services from '../../services'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import Icon from '../Icon'

export default {
  components: { Icon },
  setup () {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasError: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true

        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          window.localStorage.setItem('token', data.token)
          state.isLoading = false
          router.push({ name: 'Feedbacks' })
          modal.close()
          return
        }

        if (errors.status === 404) {
          toast.error('E-mail não encontrado!')
        }

        if (errors.status === 401) {
          toast.error('E-mail/Senha inválidos!')
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o login!')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasError = !!error
        toast.error('Ocorreu um erro ao fazer o login!')
      }
    }

    return { state, close: modal.close, handleSubmit }
  }

}
</script>
