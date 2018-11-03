// ##############################
// // // ProfileCard styles
// #############################

import { boxShadow, grayColor, defaultFont } from '../styles';

const profileCardStyle = {
  card: {
    textAlign: 'center',
    marginBottom: '30px',

    // ...card,
  },
  cardHeader: {
    display: 'inline-block',
    width: '100%',
    padding: '0px',
  },
  cardAvatar: {
    maxWidth: '130px',
    maxHeight: '130px',
    margin: '-50px auto 0',
    borderRadius: '50%',
    overflow: 'hidden',
    ...boxShadow,
  },
  img: {
    width: '100%',
    height: 'auto',
    verticalAlign: 'middle',
    border: '0',
    minHeight: '130px',
    minWidth: '130px',
  },
  textAlign: {
    textAlign: 'center',
  },
  cardSubtitle: {
    color: grayColor,
    ...defaultFont,
    fontSize: '1em',
    textTransform: 'uppercase',
    marginTop: '10px',
    marginBottom: '10px',
  },
  cardTitle: {
    ...defaultFont,
    fontSize: '1.3em',
    marginTop: '10px',
    marginBottom: '10px',
  },
  cardDescription: {
    ...defaultFont,
    padding: '15px 20px',
    margin: '0 0 10px',
  },
  cardActions: {
    height: 'auto',
    display: 'inline',
  },
};

export default profileCardStyle;
