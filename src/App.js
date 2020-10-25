import React, { Component } from 'react';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';

class App extends Component {
    state = { videos: [], selectedVideo: null }

    componentDidMount() {
        this.onFormSubmit('hello')
    }

    onFormSubmit = async (term) => {
        const result = await youtube.get('/search', {
            params: {
                q: term
            }
        });

        this.setState({
            videos: result.data.items,
            selectedVideo: result.data.items[0]
        })
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video })
    }

    render() {
        return (
            <div className='ui container'>
                <SearchBar onFormSubmit={this.onFormSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;