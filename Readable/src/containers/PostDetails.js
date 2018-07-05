import React, { Component } from 'react';
import Post from '../components/post';
import Comment from '../components/comment';
import { getAllPosts } from '../redux/reducers/post';
import { deletePost } from '../redux/reducers/delete_post';
import { vote } from '../redux/reducers/edit_post';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { loadPost } from '../redux/reducers/load_post';
import { getAllComments } from '../redux/reducers/comment';
import { deleteComment } from '../redux/reducers/delete_comment';
import { addComment } from '../redux/reducers/add_comment';
import { voteComment } from '../redux/reducers/edit_comment';
import CategoryHeader from '../components/categoryHeader';
import {
  Paper,
  withStyles,
  Button,
  Typography,
  TextField
} from '@material-ui/core';

const styles = {
  title: {
    color: '#0D47A1',
    fontWeight: 'bold',
    fontSize: 17,
    margin: '1% 2% 0% 1%'
  }
};

class PostDetails extends Component {
  state = {
    author: '',
    content: ''
  };
  componentDidMount() {
    const { postId = '' } = this.props.match.params;
    this.props.actions.loadPost(postId).then(({ response }) => {});
    this.props.actions.getAllComments(postId);
  }
  deletePost = postId => {
    this.props.actions.deletePost(postId).then(res => {
      if (res.response.deleted) this.props.actions.loadPost(postId);
      else alert('some error occured');
    });
  };
  votePost = (toggle, postId) => {
    this.props.actions
      .vote({ option: toggle }, postId)
      .then(({ response }) => this.props.actions.loadPost(postId));
  };
  deleteComment = commentId => {
    const { postId = '' } = this.props.match.params;
    this.props.actions.deleteComment(commentId).then(({ response }) => {
      this.props.actions.getAllComments(postId);
      this.props.actions.loadPost(postId);
    });
  };
  addComment = postData => {
    const { postId = '' } = this.props.match.params;
    this.props.actions.addComment(postData).then(({ response }) => {
      this.props.actions.getAllComments(postId);
      this.props.actions.loadPost(postId);
      this.setState({ author: '', content: '' });
    });
  };
  voteComment = (toggle, commentId) => {
    const { postId = '' } = this.props.match.params;
    this.props.actions
      .voteComment({ option: toggle }, commentId)
      .then(({ response }) => this.props.actions.getAllComments(postId));
  };
  handleSubmit = event => {
    event.preventDefault();
    const { postId = '' } = this.props.match.params;
    const postData = {
      id: Date.now(),
      timestamp: Date.now(),
      body: this.state.content,
      author: this.state.author,
      parentId: postId
    };
    this.addComment(postData);
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
    const { classes = {} } = this.props;
    const { post = {} } = this.props.post;
    const { comments = [] } = this.props.comment;
    const { category = '' } = this.props.match.params;

    if (!post.id)
      return (
        <div>
          <CategoryHeader handleRadioChange={this.handleRadioChange} />
          <Typography style={{ marginTop: '4%', color: 'white', fontSize: 30 }}>
            Sorry! I couldn't find this post.
          </Typography>
        </div>
      );
    return (
      <div>
        <CategoryHeader handleRadioChange={this.handleRadioChange} />
        <Post
          post={post}
          deletePost={this.deletePost}
          vote={this.votePost}
          url={post.id}
          history={this.props.history}
        />
        <Paper
          elevation={5}
          style={{
            margin: '2%',
            padding: '2% 1% 1% 3%',
            textAlign: 'start'
          }}
        >
          <form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
            <Typography className={classes.title}>Add Comment</Typography>
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
              onChange={this.handleChange('content')}
              value={this.state.content}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '2%' }}
              label="Submit"
              type="submit"
            >
              Add Comment
            </Button>
          </form>
        </Paper>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            deleteComment={this.deleteComment}
            voteComment={this.voteComment}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.loadPost,
  comment: state.comment
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      loadPost,
      getAllPosts,
      deletePost,
      vote,
      getAllComments,
      deleteComment,
      addComment,
      voteComment
    },
    dispatch
  ),
  dispatch
});

export default compose(
  withStyles(styles, { name: 'PostDetails' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PostDetails);
