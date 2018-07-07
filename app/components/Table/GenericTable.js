/* eslint-disable react/no-multi-comp,react/sort-comp,no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { lighten } from '@material-ui/core/styles/colorManipulator';

/**
 * This is a work in progress. Currently looking like it might be easier to have individual tables for each.
 * @type {number}
 */

let counter = 0;
function createData(item) {
  counter += 1;
  return { id: counter, ...item };
}

class GenericHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      order,
      headers,
      orderBy,
      rowCount,
      numSelected,
      displayCheckbox,
      onSelectAllClick,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {displayCheckbox && (
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
          )}
          {headers.map(
            column => (
              <TableCell
                key={column.id}
                numeric={column.numeric || false}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

GenericHead.propTypes = {
  order: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  displayCheckbox: PropTypes.bool.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
};

const highlightColour = (type, theme) => {
  if (type === 'light') {
    return {
      color: theme.palette.secondary.main,
      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    };
  }
  return {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.dark,
  };
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight: highlightColour(theme.palette.type, theme),
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let GenericToolbar = props => {
  const { numSelected, handleDelete, title } = props;

  return (
    <Toolbar>
      <div>
        {numSelected > 0 ? (
          <Typography>{numSelected} selected</Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div>
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={() => handleDelete()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

GenericToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  handleDelete: PropTypes.func,
};

GenericToolbar = withStyles(toolbarStyles)(GenericToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3 + 6,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Generic extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'intent',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10,
      sorting: false,
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    if (prevState.data.length !== props.items.length) {
      const l = [];
      counter = 0;
      props.items.map(item => l.push(createData(item, 5, 5)));
      return {
        data: l,
        selected:
          prevState.data.length !== props.items.length
            ? []
            : prevState.selected,
      };
    }
    return { ...prevState };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy, sorting: true });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleDelete = () => {
    const selected = this.state.data.filter(item =>
      this.state.selected.includes(item.id),
    );
    const justIntents = selected.map(a => a.name);
    this.props.handleDelete(justIntents);
  };

  clk = (event, func, value) => {
    event.stopPropagation();
    func(value);
  };

  render() {
    const {
      classes,
      rowClick,
      title,
      headers,
      handleDelete,
      style,
    } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <GenericToolbar
          title={title}
          handleDelete={this.handleDelete}
          numSelected={selected.length}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <GenericHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              headers={headers}
              displayCheckbox={!!handleDelete}
            />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isSelected = this.isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isSelected}
                      style={style}
                      onClick={() => rowClick.func(row[rowClick.data])}
                    >
                      {handleDelete && (
                        <TableCell padding="checkbox" style={{ width: '25px' }}>
                          <Checkbox
                            checked={isSelected}
                            onClick={event => this.handleClick(event, row.id)}
                          />
                        </TableCell>
                      )}
                      {headers.map(cell => (
                        <TableCell
                          key={cell.id}
                          numeric={cell.numeric}
                          style={cell.style}
                          onClick={
                            typeof cell.cellClick !== 'undefined'
                              ? e => this.clk(e, cell.cellClick, row[cell.id])
                              : null
                          }
                        >
                          {row[cell.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100, 1000]}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

Generic.propTypes = {
  style: PropTypes.object,
  rowClick: PropTypes.object,
  handleDelete: PropTypes.func,
  title: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Generic);
