import React, {Component} from 'react';
import PropTypes from 'prop-types';
import loadScript from 'load-script';
import DOMPurify from 'dompurify';

const SCRIPT = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js?config=TeX-MML-AM_HTMLorMML';

export default class extends Component {
    static propTypes = {
        config: PropTypes.object,
        className: PropTypes.string,
        math: PropTypes.string,
        style: PropTypes.string,
    };

    static defaultProps = {
        config: {},
        math: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            oldMath: props.math
        };
    }

    onLoad = (err) => {
        this.setState({
            loaded: true
        });
        if (err)
            console.log(err);
        else {
            MathJax.Hub.Config(Object.assign({
                showMathMenu: true,
                tex2jax: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
            }, this.props.config));
            window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, this.preview]);
        }
    };

    componentDidMount() {
        this.preview.innerHTML = DOMPurify.sanitize(this.props.math);
        this.state.loaded ? MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, this.preview]) : loadScript(SCRIPT, this.onLoad);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.math) return false;
        return nextProps.math !== this.state.oldMath;
    }

    componentDidUpdate(prevProps, prevState) {
        this.preview.innerHTML = this.props.math;
        MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, this.preview]);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({oldMath: nextProps.math});
    }

    render() {
        return (
            <div
                className={this.props.className}
                id='react-mathjax-preview'
                style={this.props.style}
            >
                <div
                    id='react-mathjax-preview-result'
                    ref={(node) => {
                        this.preview = node;
                    }}
                >
                </div>
            </div>
        );
    }
}
