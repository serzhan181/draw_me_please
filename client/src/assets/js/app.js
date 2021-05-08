import { canvasState } from './store/canvasState.js'
import { toggleModal, requestUsername } from './modals.js'
import { Room } from './room.js'

document.addEventListener('DOMContentLoaded', main)

function main() {
  // Modals
  toggleModal('shortcuts', 'shortcuts-modal', [
    'shortcuts-modal-overlay',
    'shortcuts-modal-close',
  ])

  if (window.location.pathname === '/') {
    Room.pullRooms()
    Room.listenCreateNewRoom()
  }

  if (!canvasState.username.length) {
    requestUsername({ callCallback: false })
  }
  // Check if user is in /room/{id}
  if (/room\/\w+/g.test(window.location.pathname)) {
    const id = location.pathname.replace('/room/', '')
    canvasState.setSessionId(id)
    new Room()
  }
}
