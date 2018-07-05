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
import Avatar from '@material-ui/core/Avatar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
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

const Comment = props => {
  const {
    classes = {},
    comment = {},
    deleteComment = () => {},
    voteComment = () => {}
  } = props;

  return (
    <Paper
      elevation={5}
      style={{
        margin: '2%',
        padding: '2% 1% 1% 3%',
        textAlign: 'start'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}
      >
        <div className={classes.standardRow}>
          <Chip
            avatar={
              <Avatar>
                <FaceIcon />
              </Avatar>
            }
            label={comment.author}
          />
          <Chip
            avatar={
              <Avatar>
                <AccessTimeIcon />
              </Avatar>
            }
            label={new Date(comment.timestamp).toLocaleString()}
          />
        </div>
        <div>
          <Link to={`/editComment/${comment.id}`}>
            <IconButton color="primary" aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={() => deleteComment(comment.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      <Typography className={classes.body}>{comment.body}</Typography>
      <div className={classes.standardRow}>
        <IconButton
          color="primary"
          aria-label="like"
          onClick={() => voteComment('upVote', comment.id)}
        >
          <ThumbUpIcon />
        </IconButton>
        <Chip label={comment.voteScore} />
        <IconButton
          color="secondary"
          aria-label="unlike"
          onClick={() => voteComment('downVote', comment.id)}
        >
          <ThumbDownIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(Comment);
