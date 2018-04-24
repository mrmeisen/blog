import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ReactMarkDown from 'react-markdown';
import NProgress from 'nprogress';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {findMatchTagsArticle, getAllArticleTags, getSpecifiedArticle, reduceVisit} from "../../reducers/article.redux";
import RightSideBar from "../RightSideBar";
import './article.scss';

class Article extends React.PureComponent {

    componentDidMount() {
        const {articleId} = this.props.match.params;
        const {tags} = this.props.location.state;
        NProgress.start();
        this.props.findMatchTagsArticle({tag: [...tags]});
        this.props.getSpecifiedArticle(articleId);
        this.props.getAllArticleTags();
    }

    showPostContent(articleId, visit, tags) {
        this.props.reduceVisit({id: articleId, visit: visit + 1});
        this.props.getSpecifiedArticle(articleId);
        this.props.history.push({
            pathname: `/article/${articleId}`,
            state: {tags: new Array(tags.split(','))}
        });
    }

    componentDidUpdate() {
        NProgress.done();
    }

    componentWillUnmount() {
        NProgress.done();
    }

    render () {
        const {title, content, date, tags} = this.props.article;
        const {articleTag, articles} = this.props;
        const relativeArticles = articles.sort(v => v.visit).reverse().slice(0, 5);
        let tag = [];
        articleTag.map(v => {
            tag = [...tag, ...v];
        });
        tag = Array.from(new Set(tag));
        return (
            <ReactCSSTransitionGroup
                component={'div'}
                className='container'
                transitionName='article'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                <div className={'article'}>
                    <section>
                        <h2>{title ? title.trim() : ''}</h2>
                        <p className='article-date'>{new Date(date).toDateString()}</p>
                        <ReactMarkDown source={content} escapeHtml={false} skipHtml={true}/>
                    </section>
                </div>
                <RightSideBar articles={relativeArticles}
                              showPostContent={(id, visit) => this.showPostContent(id, visit, tags)}
                              articleSideBarTitle={'相关文章'}
                />
            </ReactCSSTransitionGroup>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articleLoad,
        articles: state.articlesList,
        articleTag: state.articleTags,
    };
};

export default withRouter(connect(mapStateToProps, {getSpecifiedArticle, findMatchTagsArticle, getAllArticleTags, reduceVisit})(Article));
