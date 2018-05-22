import axios from 'axios';
import {
    loadArticle,
    loadPopularArticles,
    matchTagArticle,
    articleList,
    allArticleTags, listPartArticles, countArticles, confirmCompliment
} from "../actions/article.index";
import { clearErrorMsg, errorMsg,} from "../actions/user.index";

import * as Article from '../actions/constants';

const initArticle = {
    tags: '',
    content: '',
    title: '',
    summary: '',
    thumb: '',
    visit: 0,
    publish: false,
    compliment: 0,
};

const initState = [initArticle];

export function articlesList(state = initState, action) {
    switch (action.type) {
        case Article.LIST_ALL_ARTICLE:
            return action.payload;
        case Article.LIST_PART_ARTICLE:
            return action.payload;
        default:
            return state;
    }
}

export function matchTagArticles(state = initState, action) {
    return Article.MATCH_TAG_ARTICLE === action.type ? action.payload : state;
}

export function articleLoad(state = initArticle, action) {
    return Article.LOAD_ARTICLE === action.type ? action.payload : state;
}

export function popularArticlesLoad(state = initState, action) {
    return Article.LOAD_POPULAR === action.type ? action.payload : state;
}

export function articleTags(state = [], action) {
    return Article.ALL_ARTICLE_TAGS === action.type ? action.payload : state;
}

export function articleCount(state = 0, action) {
    return Article.COUNT_ARTICLE === action.type ? action.payload : state;
}

export function compliment(state = 0, action) {
    switch (action.type) {
        case Article.ARTICLE_CONFIRM_COMPLIMENT:
            return action.compliment;
        case Article.ARTICLE_CANCEL_COMPLIMENT:
            return action.compliment;
        default:
            return state;
    };
}


const msgInitState = {
    errorMsg: '',
    successMsg: ''
};

export function articlesMsg(state = msgInitState, action) {
    switch (action.type) {
        case Article.PUBLISH_ARTICLE_MSG:
            return {...state, successMsg: action.msg};
        case Article.ARTICLE_UPDATED_MSG:
            return {...state, successMsg: action.msg};
        case Article.ERROR_MSG:
            return {...state, errorMsg: action.msg};
        case Article.CLEAR_ERROR_MSG:
            return {...state, errorMsg: ''};
        case Article.CLEAR_MSG:
            return {...state, errorMsg: '', successMsg: ''};
        default:
            return state;
    }
}

/**
 * 获取博客列表
 */
export function getArticleList() {
    return dispatch => {
        axios.get('/api/articles/list').then(res => {
            if (res.data.code === 0) {
                dispatch(articleList(res.data.data));
            } else if (res.data.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            } else {
                dispatch(articleList([]));
            }
        }).catch(err => {
            alert("系统错误，请刷新后重试");
        });
    };
}

/**
 * 根据id 获取article
 * @param id 博客id
 */
export function getSpecifiedArticle(id) {
    return dispatch => {
        axios.get('/api/articles/info', {
            params: {id: id}
        }).then(res => {
            if (res.data.code === 0) {
                dispatch(loadArticle(res.data.data));
            } else if (res.data.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            } else {
                alert("系统错误，请返回首页重试！");
                dispatch(loadArticle({}));
            }
        }).catch(err => {
            alert("系统错误，请刷新后重试");
        });
    };
}

/**
 * 获取热门博客
 */
export function getPopularArticle() {
    return dispatch => {
        axios.get('/api/articles/popular').then(res => {
            if (res.data.code === 0) {
               dispatch(loadPopularArticles(res.data.data));
            } else {
               dispatch(loadPopularArticles([]));
            }
        });
    };
}

/**
 * 获取部分博客文章
 * @param skip 开始
 * @param limit 结束
 * @returns {Function}
 */
export function getPartArticles({skip, limit}) {
    return dispatch => {
        axios.get('/api/articles/part', {
            params: {
                page: skip,
                size: limit,
            }
        }).then(res => {
            if (res.data.code === 0) {
                dispatch(listPartArticles(res.data.data));
            } else if (res.data.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            } else {
                dispatch(listPartArticles([]));
            }
        });
    } ;
}

/**
 * 发布博客
 * @param thumb
 * @param content
 * @param summary
 * @param title
 * @param tags
 * @param visit
 * @param publish
 * @returns {function(*)}
 */
export function publishArticle({thumb, content, summary, title, tags, visit, publish}) {
    return dispatch => {
        axios.post('/api/articles/publish', {thumb, content, summary, title, tags: tags.join(','), visit, publish}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(clearErrorMsg());
                publish ? alert('发布文章成功') : alert('保存文章成功');
                // publish ? dispatch(publishArticleMsg('发布文章成功!')) : dispatch(publishArticleMsg('保存文章成功!'));
            } else if (res.data.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}


/**
 * 累加博客访问
 * @param id
 * @param visit
 * @returns {function()}
 */
export function reduceVisit({id}) {
    return () => {
        axios.get('/api/articles/visit', {params: {id: id}}).then(res => {
            if (res.data.code === 0) {
                getPopularArticle();
            } else if (res.data.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            }
        });
    };
}

/**
 * 删除博客
 * @param id
 * @returns {function(*)}
 */
export function deleteArticle(id) {
    return dispatch => {
        axios.get('/api/articles/delete?id=' + id).then(res => {
            if (res.data.code !== 0) {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}

/**
 * 更新博客
 * @param id
 * @param content
 * @param summary
 * @param title
 * @param tags
 * @param publish
 * @param thumb
 */
export function updateArticle({id, content, summary, title, tags, publish, thumb}) {
    return dispatch => {
        axios.post('/api/articles/update', {id, content, summary, title, tags: tags.join(','), publish, thumb}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                getSpecifiedArticle(id);
                dispatch(clearErrorMsg());
               // dispatch(updateArticleMsg('更新成功'));
                alert('更新成功');
            } else if (res.data.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            } else {
                alert(res.data.msg);
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}

/**
 * 查询包含
 * 这里将tag转换为通过 ',' 连接的字符串 ,然后在后台通过 ','分割获取字符串 查询数据库
 * @param tag
 * @returns {Function}
 */
export function findMatchTagsArticle({tag}) {
    return dispatch => {
        axios.get('/api/articles/relative?tag=' + new Array(tag).join(',')).then(res => {
            if (res.data.code === 0) {
                dispatch(matchTagArticle(res.data.data));
            } else if (res.data.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            }
        });
    };
}

/**
 * 获取所有的tag
 * @returns {Function}
 */
export function getAllArticleTags() {
    return dispatch => {
        axios.get('/api/articles/tags').then(res => {
            if (res.data.code === 0 ) {
                dispatch(allArticleTags(res.data.data));
            }
        });
    };
}

/**
 * 统计
 */
export function doCountArticles() {
    return dispatch => {
        axios.get('/api/articles/count').then(res => {
            if (res.data.code === 0) {
                dispatch(countArticles(res.data.data));
            }
        });
    };
}

export function doConfirmCompliment(id) {
    return dispatch => {
        axios.get('/api/articles/compliment/confirm?id=' + id).then(res => {
            if (res.data.code === 0) {
                dispatch(confirmCompliment(res.data.data));
            }
        });
    };
}

export function doCancelCompliment(id) {
    return dispatch => {
        axios.get('/api/articles/compliment/cancel?id=' + id).then(res => {
            if (res.data.code === 0) {
                dispatch(confirmCompliment(res.data.data));
            }
        });
    };
}
