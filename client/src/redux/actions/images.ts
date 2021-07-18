import Axios from "axios"
import store from "../../store"
import { ImageActionType } from "../reducers/images"

const baseUrl = 'http://localhost:3001'

export const loadImages = () => {
    return new Promise((resolve: any, reject: any) => {
        Axios.get(baseUrl + '/images').then((response: any) => {
            store.dispatch({
                type: ImageActionType.SET_IMAGES,
                searchText: "",
                images: response.data.images
            })
            resolve();
        }).catch(reject)
    })
}

export const queryImages = async (searchText: string) => {
    return new Promise((resolve: any, reject: any) => {
        Axios.get(baseUrl + `/images?search=${encodeURIComponent(searchText)}`).then((response: any) => {
            store.dispatch({
                type: ImageActionType.SET_IMAGES,
                searchText,
                images: response.data.images
            })
            resolve();
        }).catch(reject)
    })
}

export const uploadImage = async (image: File) => {
    return new Promise((resolve: any, reject: any) => {
        const formData = new FormData();
        formData.append('image', image);

        Axios.post(baseUrl + '/image', formData, {headers: {'content-type': 'multipart/form-data'}}).then((response: any) => {
            store.dispatch({
                type: ImageActionType.SET_IMAGES,
                images: [image]
            })
            resolve();
        }).catch(reject)
    })
}

export const deleteImage = async (imageName: string) => {
    return new Promise((resolve: any, reject: any) => {
        Axios.delete(baseUrl + '/image/' + imageName).then((response: any) => {
            store.dispatch({
                type: ImageActionType.REMOVE_IMAGE,
                images: [imageName]
            })
            resolve();
        }).catch(reject)
    })
}

export const ImageActions = {
    loadImages,
    queryImages,
    uploadImage,
    deleteImage
}