import React from 'react'
import PropTypes from 'prop-types'
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  myInput = React.createRef()
  goToStore = event => {
    // 1. prevent form from submitting
    event.preventDefault()
    // 2. get the text user entered
    const storeName = this.myInput.current.value
    // 3. route to '/store/text-user-entered
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          ref={this.myInput}
          type='text'
          required placeholder='Store name'
          defaultValue={getFunName()}
        />
        <button type='submit'>Visit store → </button>
      </form>
    )
  }
}

export default StorePicker