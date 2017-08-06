import React from 'react'
import { dndContainer, dndElement } from 'react-dragula-hoc'

const ListItem = dndElement({ type: 'item' })(({ item, index, onClick }) => (
    <li
        key={ item.key }
        data-key={ item.key }
        className={ `block-list__item ${item.className}` }
        onClick={ () => onClick(index) }
    >
        <div className="u-flex-row u-flex-justify">
            <div className="u-flex-grow-1" >
                { item.body }
            </div>
            <div className="block-list__item-handle u-flex-shrink-0 js-handle" ></div>
        </div>
    </li>
))

const Items = dndContainer({
    containerType: 'list',
    acceptType: 'item',
    handleClassName: 'js-handle',
    direction: 'vertical',
    scrollContainerAtBoundaries: false,
})(({ children }) =>
    <ul className="block-list block-list--dark">
        { children }
    </ul>
)

const ReorderableList = ({ id, listItems, onListItemClick, onReorder }) =>
    <Items id={id} onChange={({ source }) => onReorder(source.elements)} >
        {
            listItems.map(
                (item, i) =>
                    <ListItem
                        id={item.key}
                        index={i}
                        item={item}
                        key={item.key}
                        onClick={onListItemClick}
                    />
            )
        }
    </Items>

export default ReorderableList
