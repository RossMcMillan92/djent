import React, { Component } from 'react';

export default class App extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    hasLoaded = false;

    componentWillMount = () => {
        this.checkForHash();
    }

    componentWillUpdate = () => {
        this.checkForHash();
    }

    // lol
    checkForHash = () => {
        // I started with hash urls instead of normal urls, and now I need to support both.
        if (!this.hasLoaded && document.location.hash.includes('share/')) {
            this.context.router.push(document.location.hash.slice(1))
        } else {
            this.hasLoaded = true;
        }
    }

    render() {
        return (
            <div className="site">
                <section className="site__content">
                    { this.hasLoaded ? this.props.children : null }
                </section>
                <footer className="footer">
                    <p className="footer__copy">
                        By <a className="footer__link" href="http://rossmcmillan.co.uk" target="new">Ross McMillan</a>. View on <a className="footer__link" href="http://github.com/RossMcMillan92/djent" target="new">Github</a>.
                    </p>
                </footer>
            </div>
        );
    }
}
