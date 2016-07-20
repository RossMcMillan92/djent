import React, { Component } from 'react';

class Tabgroup extends Component {
    state = {
        activeTabIndex: 0,
    }
    componentWillMount = () => {
        const activeTab = this.props.children
            .find(pane => pane.props.isActive);
        const activeTabIndex = this.props.children.indexOf(activeTab);

        this.setState({
            activeTabIndex: activeTabIndex > -1 ? activeTabIndex : 0
        })
    }

    componentDidMount = () => this.checkTabSpace()

    checkTabSpace = () => {
        console.log('aaa', this.refs.tabs)
    }

    onTabClick = (index) => this.setState({ activeTabIndex: index });

    render = () => {
        const tabpanes = this.props.children
            .map((pane, i) => (
                <div key={i} className={`tabgroup__pane ${ i === this.state.activeTabIndex ? 'is-active' : '' }`}>
                    { pane }
                </div>
            ));
        const tabs = this.props.children
            .map((pane, i) => (
                <div key={i} className={`tabgroup__tab ${ i === this.state.activeTabIndex ? 'is-active' : '' }`} onClick={() => this.onTabClick(i)}>
                    { pane.props.title }
                </div>
            ));

        return (
            <div className="tabgroup">
                <div ref="tabs" className="tabgroup__tab-container">
                    { tabs }
                </div>
                <div className="tabgroup__pane-container">
                    { tabpanes }
                </div>
            </div>
        );
    }
}

class Tabpane extends Component {
    render = () => {

        return (
            <div className="">
                { this.props.children }
            </div>
        );
    }
}

export default Tabgroup;
export {
    Tabpane
}
