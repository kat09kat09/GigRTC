import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchAllRegisteredArtists,getAllStreams,subscribeToArtist} from '../../actions/index'
import { Link } from 'react-router';
import _ from 'lodash';
import axios from 'axios'
import SearchBar from '../search_bar'

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    searchBar : {
        margin: '1rem auto'
    }
};

export class RegisteredArtists extends Component{

    constructor(props){
        super(props);
        this.state ={
            registeredArtists : null,
            allStreams : null
        }

    }

    componentWillMount(){
        this.props.fetchAllRegisteredArtists().then(function(data){
            this.setState({
                registeredArtists : data.payload.data.registeredArtists
            })
        }.bind(this));
        this.props.getAllStreams().then(function(info){
            this.setState({
                allStreams : info.payload.data
            })
        }.bind(this))
    }

    filterData(criteria){
        var results = _.filter(this.props.registeredArtists, function(artist) {
            if( criteria.selected === "Artist" && criteria.text){
               return  artist.display_name == criteria.text
            }
            else if(criteria.selected === "Genre" && criteria.text){
                return  artist.genre == criteria.text
            }
            else{
                return true;
            }

        });
        this.setState({
            registeredArtists : results
        })
    }

    createArtistSubscription(data){
       axios.post('/api/subscribeToArtist', {
            user_id: data.user_id,
            artist_id: data.artist_id

        })
    }

    render () {

        if (this.state.registeredArtists) {
            return(
                <div>
                    <div style={ styles.searchBar }>
                        <SearchBar filterData={this.filterData.bind(this)}/>
                    </div>

                    <div style={ styles.root }>
                        <ul>
                            { this.renderEvents() }
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div><h2>All The Artists We Host!</h2></div>
                </div>
            )
        }
    }

    renderEvents () {

        return this.state.registeredArtists.map((Artist)=> {
            var performanceProfile = _.find(this.props.allStreams,{room : Artist.user_name}) //This data's image will be used to fill up the banner for the tile, line 111

            return (
                <div className="artistCard">
                <li key={Artist.id}>
                        <Card>
                            <CardMedia
                                overlay={<CardTitle title={<span>My genre is {Artist.genre}</span>}  />}
                            >
                                <img src={Artist.user_image} />
                            </CardMedia>
                            <CardTitle title={
                              <div>
                                {Artist.display_name} <RaisedButton
                                    onTouchTap={()=>this.props.subscribeToArtist({artist_id : Artist.id,user_id : this.props.user_id })}
                                    label="Subscribe to me" />
                              </div>
                            }
                            subtitle={Artist.brief_description} />
                        </Card>
                </li>
                </div>
            )
        })
    }
}


function mapStateToProps(state){

    return{
        registeredArtists : state.data.registeredArtists,
        allStreams : state.data.allStreams,
        user_id : state.auth.userDetails.id
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchAllRegisteredArtists,getAllStreams,subscribeToArtist}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisteredArtists)
//to={`/router/artistPage/${Artist.user_name}`}