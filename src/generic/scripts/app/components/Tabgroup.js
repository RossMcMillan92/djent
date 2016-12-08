import React, { Component } from 'react';

class Tabgroup extends Component {
    state = {
        activeTabIndex: 0,
    }
    tabs = [];

    componentWillMount = () => {
        const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
        this.setActiveTab(children);
    }

    setActiveTab = (children) => {
        const activeTab = children
            .find(pane => pane.props.isActive);
        const activeTabIndex = children.indexOf(activeTab);

        this.setState({
            activeTabIndex: activeTabIndex > -1 ? activeTabIndex : 0
        });
    }

    onTabClick = (index) => this.setState({ activeTabIndex: index });

    render = () => {
        const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
        const tabpanes = children
            .map((pane, i) => (
                <div key={i} className={`tabgroup__pane ${i === this.state.activeTabIndex ? 'is-active' : ''}`}>
                    { pane }
                </div>
            ));
        const tabs = children
            .map((pane, i) => (
                <div key={i} className={`tabgroup__tab ${i === this.state.activeTabIndex ? 'is-active' : ''}`} onClick={() => this.onTabClick(i)}>
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
    render = () => (
        <div className="">
            { this.props.children }
        </div>
    );
}

export default Tabgroup;
export {
    Tabpane
};
