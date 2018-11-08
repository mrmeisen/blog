import {fromJS, List} from "immutable";

import * as request from '../../utils/axios/api';
import * as Article from "./constants";

export const articleDetail = (article) => {
    return {
        type: Article.ARTICLE_DETAIL,
        article,
    };
};

const initialState = fromJS({
    ARTICLE_DETAIL: {},
});

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case Article.ARTICLE_DETAIL:
            return state.set(Article.ARTICLE_DETAIL, action.article);
        default:
            return state;
    }
};


export function increaseVisit(id) {
    return () => {
        request.increaseVisit(id).then(res => {
            if (res.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            }
        });
    };
}

export function getArticleDetail(id) {
    return (dispatch) => {
        request.articleDetail(id).then(res => {
            if (res.code === 0) {
                dispatch(articleDetail(res.data));
            } else if (res.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            } else {
                return dispatch(articleDetail({}));
            }
        });
    };
}

export function fetchArticle(id) {
    return request.articleDetail(id).then(res => {
        if (res.code === 0) {
            return res.data;
        } else {
            return {};
        }
    });
}
