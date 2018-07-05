import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { editComment } from '../redux/reducers/edit_comment';
import { loadComment } from '../redux/reducers/load_comment';
import {
  Paper,
  withStyles,
  Button,
  Typography,
  TextField
} from '@material-ui/core';
import compose from 'recompose/compose';
import CategoryHeader from '../components/categoryHeader';

const styles = {
  selector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: '1%'
  },
  title: {
    color: 'deepskyblue',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: '1%'
  }
};

class EditComment extends Component {
  state = {
    author: '',
    body: ''
  };
  componentDidMount() {
    const { commentId = '' } = this.props.match.params;
    this.props.actions.loadComment(commentId).then(({ response }) => {
      this.setState({
        author: response.author,
        body: response.body
      });
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    const { commentId = '' } = this.props.match.params;
    const postData = {
      ...this.state,
      timestamp: Date.now()
    };
    this.props.actions
      .editComment(postData, commentId)
      .then(() => this.props.history.goBack());
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleRadioChange = event => {
    this.props.history.push(`/${event.target.value}`);
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <CategoryHeader handleRadioChange={this.handleRadioChange} />
        <Paper elevation={5} style={{ margin: '4% 1%', padding: '2%' }}>
          <Typography className={classes.title}>Edit Comment</Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              required
              id="author"
              label="Author"
              margin="normal"
              style={{ width: '95%' }}
              onChange={this.handleChange('author')}
              value={this.state.author}
            />
            <TextField
              required
              id="content"
              label="Comment Content"
              margin="normal"
              style={{ width: '95%' }}
              onChange={this.handleChange('body')}
              value={this.state.body}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '2%' }}
              label="Submit"
              type="submit"
            >
              Save
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      loadComment,
      editComment
    },
    dispatch
  ),
  dispatch
});

export default compose(
  withStyles(styles, { name: 'EditComment' }),
  connect(
    null,
    mapDispatchToProps
  )
)(EditComment);
