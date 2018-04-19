import axios from "axios/index";
import {getThumb, getImgPath} from "../actions/file.index";
import {clearErrorMsg, errorMsg} from "../actions/user.index";

import * as File from '../actions/constants';


const initState = {
    filePath: ''
};

export function imgFile(state = initState, action) {
    return action.type === File.RETURN_IMG_PATH ? Object.assign({}, {filePath: action.payload}) : state;
}

export function thumbFile(state = initState, action) {
    return action.type === File.RETURN_THUMB_IMG ? Object.assign({}, {filePath: action.payload}) : state;
}

export function uploadImg(formData) {
    return dispatch => {
        axios.post('/api/file/upload', formData, {
            headers: {
                'Content-Type': 'multiple/form-data'
            }
        }).then(res => {
            if (res.status === 200 && res.data.code === 0){
                dispatch(getImgPath(res.data.data));
                dispatch(clearErrorMsg());
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}

export function uploadThumb(formData) {
    return dispatch => {
        axios.post('/api/file/upload', formData, {
            headers: {
                'Content-Type': 'multiple/form-data'
            }
        }).then(res => {
            if (res.status === 200 && res.data.code === 0){
                dispatch(getThumb(res.data.data));
                dispatch(clearErrorMsg());
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}
