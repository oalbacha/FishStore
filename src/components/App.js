import React from "react";
import PropTypes from 'prop-types'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  }

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match
    // first reinstate localStorage
    const localStorageRef = localStorage.getItem(params.storeId)

    if(localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)})
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = fish => {
    // 1. take a copy of the existing state
    const fishes = {...this.state.fishes}
    // 2. Add the new piece of state to the copy you took
    fishes[`fish${Date.now()}`] = fish
    // 3. Set the new state to state with the setState built-in method
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    // 1. take a copy of current state
    const fishes = {...this.state.fishes}
    // 2. update the state
    fishes[key] = updatedFish
    // 3. set state
    this.setState({ fishes })
  }

  deleteFish = key => {
    // 1. take a copy of state
    const fishes = {...this.state.fishes}
    // 2. update state
    fishes[key] = null
    // 3. set state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes})
  }

  addToOrder = key => {
    // 1. copy state
    const order = { ...this.state.order }
    // 2. add to order or update quantity
    order[key] = order[key] + 1 || 1
    // 3. call setState to update state object
    this.setState({ order })
  }

  removeFromOrder = key => {
    // 1. copy state
    const order = { ...this.state.order }
    // 2. remove item from order - not mirroring to firebase so use delete key
    delete order[key]
    // 3. call setState to update state object
    this.setState({ order })
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className="menu">
          <Header tagline='Fresh Seafood Market' />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key =>
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />)}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App