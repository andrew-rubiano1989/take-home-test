import { combineReducers } from 'redux'
import uploadModalReducer, { ModalState } from './modal'
import imagesReducer, {ImagesState} from './images'

export const reducers = combineReducers({
    uploadModal: uploadModalReducer,
    images: imagesReducer
})

export interface StoreState {
    uploadModal: ModalState,
    images: ImagesState
}