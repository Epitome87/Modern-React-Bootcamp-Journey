import React from 'react';
import './JokeList.css';
import Joke from './Joke';
import axios from 'axios';

const JOKE_API_URL = 'https://icanhazdadjoke.com/';

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToFetch: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      // Set jokes to those in our local storage. OR if none exist, parsing "[]" means empty array
      jokes: JSON.parse(window.localStorage.getItem('jokes')) || '[]',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // If no jokes
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    const fetchedJokes = [];

    // Fetch jokes
    while (fetchedJokes.length < this.props.numJokesToFetch) {
      // Have to set a config object with the appropriate headers, as the joke API returns HTML!
      const joke = await axios.get(JOKE_API_URL, {
        headers: { Accept: 'application/json' },
      });

      // Todo: Prevent duplicate jokes (based on their ID)
      fetchedJokes.push({
        text: joke.data.joke,
        id: joke.data.id,
        votes: 0,
      });
    }

    // Set state with fetched jokes
    this.setState({ jokes: [...this.state.jokes, ...fetchedJokes] }, () =>
      // Local Storage onlys tores strings -- so convert jokes object to string
      window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleVote(id, delta) {
    const updatedJokes = this.state.jokes.map((joke) =>
      id === joke.id ? { ...joke, votes: joke.votes + delta } : joke
    );

    this.setState({ jokes: updatedJokes }, () =>
      window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.getJokes();
  }

  render() {
    const renderedJokes = this.state.jokes.map((joke) => {
      return (
        <Joke
          key={joke.id}
          id={joke.id}
          text={joke.text}
          votes={joke.votes}
          upvote={() => this.handleVote(joke.id, 1)}
          downvote={() => this.handleVote(joke.id, -1)}
        />
      );
    });

    return (
      <div className='JokeList'>
        <div className='JokeList__sidebar'>
          <h1 className='JokeList__title'>
            <span>Dad</span> Jokes
          </h1>
          <img
            src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
            alt='Crying with laughter Emoji'
          />
          <button className='JokeList__btn-jokes' onClick={this.handleClick}>
            New Jokes
          </button>
        </div>
        <div className='JokeList__jokes'>{renderedJokes}</div>
      </div>
    );
  }
}

export default JokeList;
