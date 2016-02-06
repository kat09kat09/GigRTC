import React,{Component} from 'react';

export default class searchBar extends Component{

    constructor(props){
        super(props);
        this.state={
            search : ''
        }
    }

    render(){
        return (
            <div>
                <input
                    placeholder="Find your favourite artists"
                    value = {this.state.term}
                    onChange={this.onInputChange.bind(this)} />
            </div>
        )
    }
    onInputChange(event){
        this.setState({
            term : event.target.value
        })
    }
}
