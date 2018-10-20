import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';

import { Link } from 'react-router-dom';
import Table from 'components/Table/Table';
import ItemGrid from 'components/Grid/ItemGrid';
import RegularCard from 'components/Cards/RegularCard';
import Arrow from '@material-ui/icons/KeyboardArrowRight';

function TableList(props) {
  const { title, nodes, index } = props;
  const list = [];
  const colours = ['blue', 'green', 'orange', 'red', 'purple'];

  nodes.forEach(node => {
    const button = (
      <Link to={`/talk/${node.uid}`} href={`/talk/${node.uid}`}>
        <Button variant="contained" color="primary">
          <Arrow />
        </Button>
      </Link>
    );
    list.push([node.name, button]);
  });

  return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
          cardTitle={title}
          headerColor={colours[colours.length % (index + 1)]}
          cardSubtitle="Feel free to add any of the nodes below into more defined groups!"
          content={
            <Table
              tableHeaderColor="primary"
              tableHead={['Name', '']}
              tableData={list}
            />
          }
        />
      </ItemGrid>
    </Grid>
  );
}

TableList.defaultProps = {
  index: 0,
};

TableList.propTypes = {
  title: PropTypes.string.isRequired,
  nodes: PropTypes.array.isRequired,
  index: PropTypes.number,
};

export default TableList;
