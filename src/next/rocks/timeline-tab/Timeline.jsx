import React, {PropTypes} from 'react'
import Controls from './controls/Controls'
import Keylines from './Keylines'
import Timebar from './timebar/Timebar'
import Toolbar from './Toolbar'
import DividerLine from './DividerLine'
import customDrag from 'custom-drag'
import {connect} from 'react-redux'
import {HotKeys} from 'react-hotkeys'
import hotkeyMap from './hotkeyMap'
import {Scrollable, getTheme} from 'react-matterkit'
import InlineEaseEditor from './inline-ease-editor/InlineEaseEditor'

const projectManager = BETON.getRock('project-manager')

const dragOptions = {
  onDown(props, monitor, component) {
    monitor.setData({
      initDividerPos: component.state.dividerPos
    })
  },
  onDrag(props, monitor, component) {
    const offset = monitor.getDifferenceFromInitialOffset().x
    const {initDividerPos} = monitor.data
    component.setState({dividerPos: initDividerPos + offset})
  }
}

@connect(
  (state) => {
    const projectManager = BETON.getRock('project-manager')
    const {getCurrentTimelineId} = projectManager.selectors
    const timelineId = getCurrentTimelineId()
    if (!timelineId) {
      return {}
    }
    const timeline = projectManager.selectors.combineTimeline(timelineId)
    return {timeline}
  },
  () => {
    const projectManager = BETON.getRock('project-manager')
    return {
      actions: projectManager.actions,
      selectors: projectManager.selectors,
    }
  }
)
@customDrag(dragOptions, connect => ({
  dragRef: connect.getDragRef()
}))
export default class Timeline extends React.Component {
  static propTypes = {
    timeline: PropTypes.object,
    headHeight: PropTypes.number,
  }

  static defaultProps = {
    headHeight: 21
  }

  constructor(props) {
    super(props)
    this.state = {
      dividerPos: 300,
      fullWidth: 2000,
      scrollPosition: 0
    }
  }

  componentDidMount() {
    this.testOwnSize()
    setInterval(this.testOwnSize, 321)
  }

  testOwnSize = () => {
    const {width: nodeWidth} = React.findDOMNode(this).getBoundingClientRect()
    const {dividerPos, fullWidth} = this.state
    const {timeline} = this.props
    const {setWidthOfTimeline} = this.props.actions

    if (nodeWidth !== fullWidth) {
      this.setState({fullWidth: nodeWidth})
    }

    const timelineWidth = nodeWidth - dividerPos
    if (timeline && timeline.width !== timelineWidth) {
      console.log({timelineWidth, timeline})
      setWidthOfTimeline({
        timelineId: timeline.id,
        width: timelineWidth
      })
    }
  }

  handleChangeScrollPosition = (scroll) => {
    console.log('handleChangeScrollPosition', scroll)
    this.setState({scrollPosition: scroll})
  }

  render() {
    const {dividerPos, fullWidth, scrollPosition} = this.state
    const {timeline, actions, selectors, headHeight, dragRef} = this.props
    const colors = getTheme(this).getStyle('colors')
    const rootStyle = {
      backgroundColor: colors.grey4,
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    }

    if (!timeline) {
      return <div hidden/>
    }

    const hotkeyHandlers = {
      delete() {
        actions.deleteSelectedKeys({keyHolderId: timeline.id})
      }
    }
    const commonProps = {timeline, actions, selectors}

    //return <HotKeys  keyMap={hotkeyMap} handlers={hotkeyHandlers}>
      return <div style={rootStyle}>
        <div style={{display: 'flex', height: headHeight}}>
          <Toolbar {...commonProps} style={{width: dividerPos}}/>
          <Timebar {...commonProps} height={headHeight}/>
        </div>
        <Scrollable
          style = {{display: 'flex', flex: 1, alignItems: 'flex-start'}}
          onChangeVerticalScroll = {this.handleChangeScrollPosition}
          verticalScroll = {scrollPosition}>
          <Controls {...commonProps} style={{width: dividerPos}}/>
          <Keylines {...commonProps}/>
        </Scrollable>
        <DividerLine ref={dragRef} position={dividerPos}/>
        <InlineEaseEditor {...{
            timeline,
            actions,
            selectors,
            dividerPos,
            scrollPosition,
          }}/>
      </div>
    //</HotKeys>
  }
}
