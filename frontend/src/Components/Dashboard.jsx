import React, { Component } from 'react';
import SurveyButton from './SurveyButton';
const axios = require('axios');

const SURVEYS_URL = 'http://localhost:8000/surveys/';

class Dashboard extends Component {
  state = {
    surveys: []
  };

  render() {
    return (
      <div className="content centered">
        <body>
          <h2 className="display-3">Welcome!</h2>
          <p>You have surveys to fill in:</p>
          <div className="d-flex flex-column justify-content-around">
            {this.state.surveys.map(item => (
              <SurveyButton name={item.title} />
            ))}
          </div>
        </body>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(SURVEYS_URL, { crossdomain: true })
      .then(response => {
        let data = JSON.parse(response.data);
        this.setState({
          surveys: data.map((x, i) => {
            return {
              key: i,
              title: x.title
            };
          })
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default Dashboard;
