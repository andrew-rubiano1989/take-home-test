export enum ModalActionType {
    OPEN_UPLOAD_MODAL = "OPEN_UPLOAD_MODAL",
    CLOSE_UPLOAD_MODAL = "CLOSE_UPLOAD_MODAL"
}

export interface ModalAction {
    type: ModalActionType
}

export interface ModalState {
    open: boolean;
}

const initialState = {
    open: false
}

const openModal = (state: ModalState, action: ModalAction) => {
    return {...state, open: true}
}

const closeModal = (state: ModalState, action: ModalAction) => {
    return {...state, open: false}
}

const reducer = (state = initialState, action: ModalAction): ModalState => {
    switch (action.type) {
        case ModalActionType.OPEN_UPLOAD_MODAL: {
            return openModal(state, action)
        }
        case ModalActionType.CLOSE_UPLOAD_MODAL: {
            return closeModal(state, action)
        }
        default: return state
    }
}

export default reducer;