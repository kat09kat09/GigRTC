import React,{Component} from 'react'


class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
    }

    _handleSubmit(e) {
        e.preventDefault();
        this.props.onChange(this.state.imagePreviewUrl);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        const fileTypes = {
            "image/png"  : true,
            "image/jpeg" : true
        }

        if(fileTypes[file.type] && file.size < 1031612 ){
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
                this.props.onChange(reader.result)
            }
        }
        else{
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/2000px-Dialog-error-round.svg.png"
                });
            }
        }

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Image should be JPEG OR PNG and less than 1MB</div>);
        }

        return (
            <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        )
    }
}

export default ImageUpload;
