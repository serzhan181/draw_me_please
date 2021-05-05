import { canvasState } from './store/canvasState.js'
import { connectionHandler } from './ws.js'

export function toggleModal(
  triggerModalId,
  modalId,
  closeIds,
  defaultState = false
) {
  const trigger = document.getElementById(triggerModalId)
  const modal = document.getElementById(modalId)

  trigger.addEventListener('click', () => modal.classList.add('is-active'))

  if (defaultState) {
    trigger.click()
  }

  closeIds.forEach((id) => {
    document
      .getElementById(id)
      .addEventListener('click', () => modal.classList.remove('is-active'))
  })
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.classList.remove('is-active')
}

export function requestUsername() {
  toggleModal('username', 'username-modal', [], true)
  const username_input = document.getElementById('username-input')
  const submit_btn = document.getElementById('username-submit-btn')

  submit_btn.addEventListener('click', () => {
    if (username_input.value.length > 2) {
      closeModal('username-modal')
      canvasState.setUsername(username_input.value)
      connectionHandler()
    }
  })
}
