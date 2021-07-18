import store from "../../store"
import { ModalActionType } from "../reducers/modal"

export const openUploadModal = () => {
    store.dispatch({
        type: ModalActionType.OPEN_UPLOAD_MODAL
    })
}

export const closeUploadModal = () => {
    store.dispatch({
        type: ModalActionType.CLOSE_UPLOAD_MODAL
    })
}

export const ModalActions = {
    openUploadModal,
    closeUploadModal
}