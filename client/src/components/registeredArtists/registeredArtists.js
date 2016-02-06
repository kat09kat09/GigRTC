import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchAllRegisteredArtists} from '../../actions/index'
import { Link } from 'react-router';

import SearchBar from '../search_bar'

import GridList from '../../../node_modules/material-ui/lib/grid-list/grid-list';
import GridTile from '../../../node_modules/material-ui/lib/grid-list/grid-tile';
import StarBorder from '../../../node_modules/material-ui/lib/svg-icons/toggle/star-border';
import IconButton from '../../../node_modules/material-ui/lib/icon-button';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    gridList: {
        width: 800,
        height: 600,
        overflowY: 'auto',
        marginBottom: 24
    }
};

var reader  = new window.FileReader();

export class RegisteredArtists extends Component{

    componentWillMount(){
        this.props.fetchAllRegisteredArtists()
    }

    render () {

        if (this.props.registeredArtists) {
            return(
                <div>
                    <SearchBar/>
                    <div style={ styles.root }>
                        <GridList cellHeight={ 180 } style={ styles.gridList }>
                            { this.renderEvents() }
                        </GridList>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>All The Artists We Host!</div>
                </div>
            )
        }
    }

    renderEvents () {

        return this.props.registeredArtists.map((Artist)=> {
            console.log("PRESENT ARTIST",Artist.user_image.toString('ascii'));
            return (

                <Link to={`/router/activeStream/${Artist.user_name}`}>
                    <GridTile
                        key={Artist.id}

                        Name={Artist.user_name}
                        Brief Description={<span>by <b>{Artist.brief_description}</b></span>}
                        actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                    >
                        <img src={Artist.user_image}
                        />
                    </GridTile>
                </Link>
            )
        })
    }
}


function mapStateToProps(state){
    return{
        registeredArtists : state.data.data.registeredArtists
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchAllRegisteredArtists}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisteredArtists)
