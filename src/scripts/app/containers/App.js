import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div className="site">
                <section className="site__content">
                    {this.props.children}
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
