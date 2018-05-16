import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import superagent  from 'superagent';
import './Uploader.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getPhotos } from '../../redux/ducks/reducer';
import { savePhotos } from '../../redux/ducks/reducer';



class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      images: []
    }
  }
  
  onDrop = (photo) => {
    var tempArr = this.state.files;
    console.log(photo);
    tempArr.push(photo[0]);
    this.setState({
        files: tempArr
    })
    //this.setState({ files });
    // the upload http request can go here for an immediate upload after the drop. I'm just using submit button for now.
  }

    upload = (e) => {
        e.preventDefault();
        var tempArr = [];
        for(let i = 0; i<this.state.files.length; i++){
            superagent
                .post('/api/upload')
                .attach('item', this.state.files[i]) // 'painting' has to match with another string in /server/index.js (line 38)
                .end((error, response) => {
                    // this.setState({ url: response.text })
                    // this.props.urlsend(response.text)
                    // console.log('response -> ', response.text)
                    tempArr.push(response.text)
                    console.log(tempArr);
                    if (error) console.log(error);
                    console.log('File Uploaded Succesfully');
                })
        }
        this.props.savePhotos(tempArr)
    }

  delete = () => {
    const url = this.state.image.image_url.split('/');
    const fileName = url[url.length-1];
    axios.delete(`/api/delete/${fileName}`)
    .then( res => {
        console.log(res.data);
        this.setState({ image: null });
    }).catch(err => console.log(err));
  }

  render() {
    return(
            <div>
                <form onSubmit={this.upload}>
                    <div className="uploader">
                        <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false}>
                            <button className="btn btn-warning"><i className="fas fa-plus">Select photos</i></button>
                        </Dropzone>
                        <h4>Chosen photos</h4>
                        <ul>
                            {this.state.files.length>0 && this.state.files.map((e, i) => <li key={i}>{e.name} - {e.size} bytes <img src={e.preview} className="prevImg" /></li>) }
                        </ul>
                    </div>
                    <div className="submit-btn">
                        <input className="btn" type="submit"/>
                    </div>
                </form>
                { this.state.image && <img src={this.state.image.image_url} alt="pic"/> }
                <button className="btn" onClick={this.delete}>Delete</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
  savePhotos: savePhotos,
  getPhotos: getPhotos
}

export default connect(null, mapDispatchToProps)(Uploader);