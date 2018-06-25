import * as React from 'react';
import moment from 'moment';

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: moment(),
    };
  }

  componentDidMount() {
    setInterval(() => {
      const diff = moment().diff(this.state.start);
      this.setState({
        difference: moment.utc(diff).format('HH:mm:ss'),
      });
    }, 1000);
  }

  render() {
    const { difference } = this.state;
    return <span className="timer">{difference}</span>;
  }
}

export default Timer;
