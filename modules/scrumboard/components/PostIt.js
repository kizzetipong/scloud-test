import React from 'react'
import { Card, CardContent, CardActions, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    width: 200,
    maxHeight: 150,
    margin: theme.spacing(0.5),
    borderRadius: 0,
    backgroundColor: '#f3858e',
  },
  cardContentRoot: {
    padding: theme.spacing(1),
  },
}))

const PostIt = ({ id, title, content, footer, color}) => {
  const classes = useStyles()
  return (
    <Card
      key={id}
      className={classes.cardRoot}
      style={color ? { backgroundColor: color } : {} }
    >
      <CardContent classes={{ root: classes.cardContentRoot }}>
        <Typography vairiant='subtitle1'>
          {title}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant='body2' style={{ marginLeft: 'auto' }}>{footer}</Typography>
      </CardActions>
    </Card>
  )
}

export default PostIt