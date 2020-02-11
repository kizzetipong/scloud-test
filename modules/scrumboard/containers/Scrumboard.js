import _ from 'lodash'
import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import BoardColumn from '../components/BoardColumn'
import PostIt from '../components/PostIt'
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

  const configObj = Object.assign({}, configuration, urlParam)
  const columns = _.get(configObj, 'columns', [])
  const items = _.get(configObj, 'items', [])
  const disableDivider = _.get(configObj, 'disableDivider', false)

  useEffect(() => {
    if (socket && process.browser) {
      socket.emit('join', 'configuration')
      socket.on('data', dataHandler)
      return () => socket.off('data', dataHandler)
    }
  }, [socket])

  const dataHandler = (configuration) => {
    updateConfig(configuration)
  }

  return (
    <Box className={classes.board} display='flex' justifyContent='center'>
      {
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
  )
}

const mapStateToProps = state => ({
  configuration: state.scrumboard,
})

const mapDispatchToProps = dispatch => ({
  updateConfig: bindActionCreators(updateConfig, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScrumBoard)