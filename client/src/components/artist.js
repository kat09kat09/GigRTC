import React, {Component} from 'react';


export default class Artist extends Component {
  render() {
    return (
      <form>
        <input
          placeholder='Title'>
        </input>
        <input
          placeholder="Details about the stream">
        </input>
        <button>
          Start Broadcasting!
        </button>
      </form>
      <div>
      
      </div>
    )
  }
}