import React from 'react';
import {
  Paper,
  Typography,
  Chip,
  IconButton,
  withStyles
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Comment from '@material-ui/icons/Comment';
import Avatar from '@material-ui/core/Avatar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CategoryIcon from '@material-ui/icons/Label';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const styles = {
  standardRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    alignItems: 'center'
  },
  rowReverse: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    flexGrow: 1,
    alignItems: 'center'
  },
  title: {
    color: 'deepskyblue',
    fontWeight: 'bold',
    fontSize: 20,
    margin: '1% 2% 3% 1%'
  },
  body: {
    margin: '2%',
    fontSize: 17
  }
};

const Post = props => {
  const {
    classes,
    post = {},
    deletePost = () => {},
    vote = () => {},
    url = ''
  } = props;

  return (
    <Paper
      elevation={5}
      style={{ margin: '2%', padding: '2% 1% 1% 3%', textAlign: 'start' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}
      >
        <Typography className={classes.title}>
          {url ? (
            post.title
          ) : (
            <Link
              to={`/${post.category}/${post.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {post.title}
            </Link>
          )}
        </Typography>
        <div>
          {url ? (
            <IconButton
              color="primary"
              aria-label="edit"
              onClick={() => {
                props.history.push(`/editPost/${post.id}`);
              }}
            >
              <EditIcon />
            </IconButton>
          ) : (
            <Link to={`editPost/${post.id}`}>
              <IconButton color="primary" aria-label="edit">
                <EditIcon />
              </IconButton>
            </Link>
          )}
          <IconButton aria-label="delete" onClick={() => deletePost(post.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.standardRow}>
        <Chip
          avatar={
            <Avatar>
              <FaceIcon />
            </Avatar>
          }
          label={post.author}
        />
        <Chip
          avatar={
            <Avatar>
              <AccessTimeIcon />
            </Avatar>
          }
          label={new Date(post.timestamp).toLocaleString()}
        />
        <Chip
          avatar={
            <Avatar>
              <CategoryIcon />
            </Avatar>
          }
          label={post.category}
        />
      </div>
      {url && <Typography className={classes.body}>{post.body}</Typography>}
      <div className={classes.standardRow}>
        <IconButton
          color="primary"
          aria-label="like"
          onClick={() => vote('upVote', post.id)}
        >
          <ThumbUpIcon />
        </IconButton>
        <Chip label={post.voteScore} />
        <IconButton
          color="secondary"
          aria-label="unlike"
          onClick={() => vote('downVote', post.id)}
        >
          <ThumbDownIcon />
        </IconButton>
      </div>
      <div className={classes.rowReverse}>
        <Comment />
        <Chip label={post.commentCount} />
      </div>
    </Paper>
  );
};

export default withStyles(styles)(Post);
