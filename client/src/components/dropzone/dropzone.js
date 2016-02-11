import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {uploadPicture} from '../../actions/index'
import { bindActionCreators } from 'redux';

export class DropZone extends Component {

    constructor(props) {
        super(props);
        this.state = {rejected: false};
    }

    upload(files) {
        const file = files[0];
        //var data = this.convertToBase64(file.preview)
        this.props.uploadPicture(file.preview);
        this.setState({
            rejected: false,
            file: file,
            accepted: true
        });
    }

    reject() {
        this.setState({rejected: true});
    }

    remove(e) {
        e.preventDefault();
        this.setState({
            accepted: false,
            file: null
        });
    }

    render() {
        return (

            <div>
                {!this.state.accepted ?
                    <Dropzone
                        onDropAccepted={this.upload.bind(this)}
                        onDropRejected={this.reject.bind(this)}
                        style = {{
                            width: 200,
                            height: 200,
                            margin: '20px auto',
                            borderWidth: '4px',
                            padding: '20px',
                            borderColor: 'black',
                            borderStyle: 'dashed',
                            borderRadius: '5px',
                          }}
                        activeStyle = {{
                            borderStyle: 'solid',
                            backgroundColor: '#eee'
                          }}
                        rejectStyle = {{
                            borderStyle: 'solid',
                            backgroundColor: '#ffdddd'
                          }}
                        multiple={false}
                        accept="image/jpeg, image/png, image/bmp, image/gif">
                        { this.state.rejected ?
                            <div className="center-align">Invalid file type. Please use jpeg, bmp, gif or png.</div> :
                            <div className="center-align">Drag and drop an image here or click to select a file to upload</div> }
                    </Dropzone>
                    : <button onClick={this.remove.bind(this)}>Remove file</button>}
                {this.state.file ?
                    <div>
                        <h6>Image Preview:</h6>
                        <div>
                            <img style={{height: 100 + 'px'}} src={this.state.file.preview} />
                        </div>
                    </div> : null}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        environment : state.environment,
        userDetails : state.auth.userDetails,
        userPrivelege: state.auth.userPrivelege
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            uploadPicture
        },
        dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(DropZone)
