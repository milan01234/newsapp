import React, { Component } from 'react'

export class loading extends Component {
  render() {
    return (
      <div>
        <div className='text-center'>
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>
      </div>
    )
  }
}

export default loading
