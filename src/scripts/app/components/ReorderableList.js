import React, { Component } from 'react';
import Dragula from 'react-dragula';

class ReorderableList extends Component {
    drake;

    onComponentWillUnmount = () => {
        this.drake.destroy();
    }

    dragulaDecorator = (container) => {
        if (container) {
            const options = {
                moves: (el, source, handle) => handle.classList.contains('js-handle'),
            };
            this.drake = Dragula([container], options);

            this.drake.on('drop', () => {
                const newOrder = Array.from(container.children)
                    .map(el => el.getAttribute('data-key'));

                this.forceUpdate();
                this.props.onReorder(newOrder);
            });
        }
    };

    render() {
        const listItems = this.props.listItems
            .map((item, i) => (
                <li
                    key={ item.key }
                    data-key={ item.key }
                    className={ `block-list__item ${item.className}` }
                    onClick={ () => this.props.onListItemClick(i) }
                >
                    <div className="u-flex-row u-flex-justify">
                        <div className="block-list__body u-flex-grow-1" >
                            { item.body }
                        </div>
                        <div className="block-list__item-handle js-handle" ></div>
                    </div>
                </li>
            ));

        return (
            <ul className="block-list" ref={this.dragulaDecorator}>
                { listItems }
            </ul>
        );
    }
}

export default ReorderableList;
