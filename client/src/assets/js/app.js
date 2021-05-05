import { canvasState } from './store/canvasState.js'
import { toggleModal } from './modals.js'
import { Room } from './ws.js'

document.addEventListener('DOMContentLoaded', main)

function main() {
  // Modals
  toggleModal('shortcuts', 'shortcuts-modal', [
    'shortcuts-modal-overlay',
    'shortcuts-modal-close',
  ])
  // Check if user is in /room/{id}
  if (/room\/\w+/g.test(window.location.pathname)) {
    const id = location.pathname.replace('/room/', '')
    canvasState.setSessionId(id)
    new Room()
  }
}
