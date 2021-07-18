export enum ImageActionType {
    SET_IMAGES = "SET_IMAGES",
    REMOVE_IMAGE = "REMOVE_IMAGE"
}

export interface ImageAction {
    type: ImageActionType,
    searchTerm: string,
    images: string[]
}

export interface ImagesState {
    searchTerm: string,
    images: string[];
}

const initialState = {
    searchTerm: "",
    images: []
} as ImagesState

const setImages = (state: ImagesState, action: ImageAction) => {
    return {...state, images: action.images, searchTerm: action.searchTerm}
}

const removeImage = (state: ImagesState, action: ImageAction) => {
    return {
        ...state,
        images: state.images.filter((fileName: string) => fileName !== action.images[0])
    }
}

const reducer = (state = initialState, action: ImageAction): ImagesState => {
    switch (action.type) {
        case ImageActionType.SET_IMAGES: {
            return setImages(state, action)
        }
        case ImageActionType.REMOVE_IMAGE: {
            return removeImage(state, action)
        }
        default: return state
    }
}

export default reducer;