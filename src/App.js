import React, { Component } from 'react';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';

class App extends Component {
    state = { videos: [] }

    onFormSubmit = async (term) => {
        const result = await youtube.get('/search', {
            params: {
                q: term
            }
        });

        this.setState({ videos: result.data.items })
    }

    render() {
        return (
            <div className='ui container'>
                <SearchBar onFormSubmit={this.onFormSubmit} />
                <VideoList videos={this.state.videos} />
            </div>
        );
    }
}

export default App;