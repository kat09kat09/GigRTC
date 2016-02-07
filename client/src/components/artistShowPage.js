import React,{Component} from 'react';
import {connect} from 'react-redux'
import _ from 'lodash'

class ArtistPage extends Component{

    constructor(props){
        super(props);

        this.state={
            artist : null
        }
    }

    componentWillMount(){
        var performanceProfile = _.find(this.props.allArtists,{user_name : this.props.params.artist_name});
        this.setState({
            artist : performanceProfile
        })
    }

    render(){
        return (
            <div>
                {this.state.artist.user_name}
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        allArtists : state.data.registeredArtists
    }
}

export default connect(mapStateToProps,null)(ArtistPage)
