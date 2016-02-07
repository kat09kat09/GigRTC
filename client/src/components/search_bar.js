import React,{Component} from 'react';
import TextField from 'material-ui/lib/text-field';
import {connect} from 'react-redux'
import _ from 'lodash';
import Toggle from 'material-ui/lib/toggle';

const styles = {
    block: {
        maxWidth: 250,
    },
    toggle: {
        marginBottom: 16,
    },
};

var genre = false;
var artist = false;

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

                <Toggle
                    label="Name"
                    labelPosition="right"
                    style={styles.toggle}
                    onToggle={()=>artist=!artist}
                />
                <Toggle
                    label="Genre"
                    labelPosition="right"
                    style={styles.toggle}
                    onToggle={()=>{
                    genre=!genre
                    console.log("TOGGLE SWITCH",genre)
                    }}
                />
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
        });
        this.props.filterData(event.target.value);

    }
}
