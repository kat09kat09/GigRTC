import React,{Component} from 'react';
import TextField from 'material-ui/lib/text-field';

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
                <TextField
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
        console.log(event.target.value)
    }
}
