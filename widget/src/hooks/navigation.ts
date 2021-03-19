import useStore from './store'
import { resetStore, setCurrentComponent, setFeedbackType } from '../store'

export interface Navigation {
  back(): void;
  next(): void;
  setErrorState(): void;
  setSuccessState(): void;
  goToSelectFeedbackType(): void;
}

export default function useNavigation (): Navigation {
  const store = useStore()

  function back (): void {
    if (store.currentComponent === 'WriteAFeedback') {
      setCurrentComponent('SelectFeedbackType')
      setFeedbackType('')
    }
  }

  function next (): void {
    if (store.currentComponent === 'SelectFeedbackType') {
      setCurrentComponent('WriteAFeedback')
    }
  }

  function setErrorState (): void {
    setCurrentComponent('Error')
  }

  function setSuccessState (): void {
    setCurrentComponent('Success')
  }

  function goToSelectFeedbackType (): void {
    resetStore()
  }

  return { back, next, setErrorState, setSuccessState, goToSelectFeedbackType }
}
