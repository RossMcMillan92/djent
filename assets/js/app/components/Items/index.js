import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export class Items extends Component {

  static propTypes = {
    items: React.PropTypes.array,
    delItem: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  onDelete = (event) => {
    event.preventDefault();
    const index = event.currentTarget.dataset.index;
    this.props.delItem(index);
  };

  render() {
    const { items } = this.props;

    return (
      <div className={styles}>
        {!items.length && <span>Array is empty</span>}
        {
          items.map((item, index) =>
            <div className="checkbox" key={index}>
              <label>
                <input type="checkbox"
                  defaultChecked={item.done}
                />
                  {`${item.text}`}
                <span className="remove"
                  data-index={index}
                  onClick={this.onDelete}
                >
                  x
                </span>
              </label>
            </div>
          )
        }
        </div>
    );
  }
}
