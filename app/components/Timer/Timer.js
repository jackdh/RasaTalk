import * as React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

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
    const { palette } = this.props;
    return (
      <span
        className="timer"
        style={{ color: palette.type === 'dark' ? '#fff' : '#000' }}
      >
        {difference}
      </span>
    );
  }
}

Timer.propTypes = {
  palette: PropTypes.object,
};

export default Timer;
