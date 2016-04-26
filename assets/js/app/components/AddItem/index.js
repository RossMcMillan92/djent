import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';

/* component styles */
import { styles } from './styles.scss';

export class AddItem extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    fields: React.PropTypes.object.isRequired,
    items: React.PropTypes.array,
    addItem: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  onAdd = (event) => {
    if (this.props.fields.name.value) {
      /* add item*/
      this.props.addItem(this.props.fields);

      /* reset form */
      this.props.dispatch(reset('addItem'));
    }
    event.preventDefault();
  };

  render() {
    const {
      fields: { name },
    } = this.props;

    return (
      <form className={styles} onSubmit={this.onAdd}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter something"
            {...name}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-default" onClick={this.onAdd}>
            Add item
          </button>
        </div>
      </form>
    );
  }
}

AddItem = reduxForm({
  form: 'addItem',
  fields: ['name'],
  destroyOnUnmount: false,
})(AddItem);

export default AddItem;
