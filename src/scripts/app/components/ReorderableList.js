import React, { Component } from 'react';
import Dragula from 'react-dragula';

class ReorderableList extends Component {
    dragulaDecorator = (container) => {
        if (container) {
            const options = {
                moves: (el, source, handle) => handle.classList.contains('js-handle'),
            };
            const drake = Dragula([container], options);

            drake.on('drop', () => {
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
                    key={ item.id }
                    data-key={ item.id }
                    className={ item.className }
                    onClick={ () => this.props.onListItemClick(i) }
                >
                    <div className="u-flex-row u-flex-justify">
                        <div className="block-list__body" >
                            { item.text }
                        </div>
                        <div className="block-list__item-handle js-handle" ></div>
                    </div>
                </li>
            ));

        return (
            <ul className="block-list u-mb1" ref={this.dragulaDecorator}>
                { listItems }
            </ul>
        );
    }
}

export default ReorderableList;
