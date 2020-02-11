import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import BoardColumn from '../components/BoardColumn'
import PostIt from '../components/PostIt'
import FetchingBar from '../../common/FetchingBar'
import { updateConfig } from '../actions'

const useStyles = makeStyles((theme) => ({
  board: {
    height: '100%',
    padding: theme.spacing(6, 2),
    overflow: 'hidden',
  },
}))

const ScrumBoard = ({ configuration, updateConfig, urlParam, socket}) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)

  const configObj = Object.assign({}, configuration, urlParam)
  const columns = _.get(configObj, 'columns', [])
  const items = _.get(configObj, 'items', [])
  const disableDivider = _.get(configObj, 'disableDivider', false)

  useEffect(() => {
    if (socket && process.browser) {
      console.log('Subscribe configuration data from socket')
      socket.emit('join', 'configuration')
      socket.on('data', dataHandler)
      return () => socket.off('data', dataHandler)
    }
  }, [socket])

  const dataHandler = (configuration) => {
    console.log('Get data from socket')
    setLoading(false)
    updateConfig(configuration)
  }

  return (
    <React.Fragment>
      { loading  && <FetchingBar /> }
      <Box className={classes.board} display='flex' justifyContent='center'>
        {
          loading ?
            <React.Fragment>
              <Box flex={'1 1 0'}>
                <Skeleton variant='rect' width={320} height={600} />
              </Box>
              <Box flex={'1 1 0'}>
                <Skeleton variant='rect' width={320} height={600} />
              </Box>
              <Box flex={'1 1 0'}>
                <Skeleton variant='rect' width={320} height={600} />
              </Box>
              <Box flex={'1 1 0'}>
                <Skeleton variant='rect' width={320} height={600} />
              </Box>
            </React.Fragment>
            :
            columns.map((col) => {
              const colItems = _.filter(items, { columnId: col.id })
              return (
                <BoardColumn
                  key={col.id}
                  id={col.id}
                  header={col.header}
                  disableDivider={disableDivider}
                >
                  <Box display='flex' flexDirection='column' alignItems='center'>
                    {
                      colItems.map((colItem) =>
                        <PostIt
                          key={colItem.id}
                          id={colItem.id}
                          title={colItem.title}
                          content={colItem.content}
                          footer={colItem.owner}
                          color={colItem.color}
                        />
                      )
                    }
                  </Box>
                </BoardColumn>
              )
            })
        }
      </Box>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  configuration: state.scrumboard,
})

const mapDispatchToProps = dispatch => ({
  updateConfig: bindActionCreators(updateConfig, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScrumBoard)