import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPost } from '../redux/reducers/add_post';
import { loadPost } from '../redux/reducers/load_post';
import { editPost } from '../redux/reducers/edit_post';
import {
  RadioGroup,
  Paper,
  FormControlLabel,
  Radio,
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

const category = [
  {
    value: 'react',
    label: 'React'
  },
  {
    value: 'redux',
    label: 'Redux'
  },
  {
    value: 'udacity',
    label: 'Udacity'
  },
  {
    value: 'javascript',
    label: 'JavaScript'
  }
];

class AddPost extends Component {
  state = {
    author: '',
    body: '',
    category: 'react',
    title: '',
    edit: false
  };
  componentDidMount() {
    const { postId = '' } = this.props.match.params;

    if (postId) {
      this.props.actions.loadPost(postId).then(({ response }) => {
        this.setState({
          edit: true,
          author: response.author,
          body: response.body,
          category: response.category,
          title: response.title,
          id: response.id
        });
      });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const postData = {
      author: this.state.author,
      body: this.state.body,
      category: this.state.category,
      title: this.state.title,
      deleted: false,
      id: Date.now(),
      timestamp: Date.now()
    };
    if (this.state.edit)
      this.props.actions.editPost(
        {
          title: this.state.title,
          author: this.state.author,
          body: this.state.body,
          category: this.state.category
        },
        this.state.id
      );
    else this.props.actions.addPost(postData);
    this.props.history.goBack();
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
          <Typography className={classes.title}>
            {this.state.edit ? 'Edit Post' : 'Add Post'}
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <RadioGroup
              className={classes.selector}
              value={this.state.category}
              onChange={this.handleChange('category')}
            >
              {category.map(cat => (
                <FormControlLabel
                  key={cat.value}
                  value={cat.value}
                  control={<Radio />}
                  label={cat.label}
                />
              ))}
            </RadioGroup>
            <TextField
              required
              id="title"
              label="Post Title"
              margin="normal"
              style={{ width: '95%' }}
              onChange={this.handleChange('title')}
              value={this.state.title}
            />
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
              label="Post Content"
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
              {this.state.edit ? 'Save' : 'Add Post'}
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
      addPost,
      loadPost,
      editPost
    },
    dispatch
  ),
  dispatch
});

export default compose(
  withStyles(styles, { name: 'AddPost' }),
  connect(
    null,
    mapDispatchToProps
  )
)(AddPost);
