import React, { Component } from "react";
import {
  View,
  ListView,
  ScrollView,
  FlatList,
  LayoutAnimation,
} from "react-native";

/**
 * Expandable List Component
 */

export class ExpandableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupStatus: this._getInitialGroupStatus(),
    };

    this.closeAll = this.closeAll.bind(this);
    this.toggleGroupStatus = this.toggleGroupStatus.bind(this);
    this._supportFlatList = this._supportFlatList.bind(this);
    this._renderGroupItem = this._renderGroupItem.bind(this);
    this._renderFlatListItem = this._renderFlatListItem.bind(this);
    this._renderListViewItem = this._renderListViewItem.bind(this);
    this._renderUsingView = this._renderUsingView.bind(this);
    this._renderUsingFlatList = this._renderUsingFlatList.bind(this);
    this._renderUsingListView = this._renderUsingListView.bind(this);

    this.openInitial();
  }

  /**
   * start the Animation
   */

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  /**
   *
   * @returns return the Flatlist
   */
  _supportFlatList() {
    return !!FlatList;
  }

  /**
   *
   * @returns retrun true or false
   */

  _getInitialGroupStatus() {
    const { initialOpenGroups = [], data = [] } = this.props;

    // supports users passing a array storing those rows they wanna keep open at first
    return new Array(data.length).fill(false).map((item, index) => {
      return initialOpenGroups.indexOf(index) !== -1;
    });
  }
  /**
   * close the groud
   */
  closeAll() {
    this.setState({
      groupStatus: this.state.groupStatus.map(() => false),
    });
  }

  /**
   * open the inital group
   */
  openInitial() {
    this.state.groupStatus[0] = true;
    this.setState({
      groupStatus: this.state.groupStatus,
    });
  }

  /**
   * @typedef {Object}
   * @param {Number} index
   * @param {boolean} closeOthers
   */

  toggleGroupStatus(index, closeOthers) {
    // closeOthers is optional. If it is true, all other list items will be closed when opening a list item.
    const newGroupStatus = this.state.groupStatus.map((status, idx) => {
      return idx !== index ? (closeOthers ? false : status) : !status;
    });

    this.setState({
      groupStatus: newGroupStatus,
    });
  }

  /**
   * @typedef {Function}
   * @param {Object} groupItem
   * @param {Number} groupId
   * @returns render group Item
   */

  _renderGroupItem(groupItem, groupId) {
    const status = this.state.groupStatus[groupId];
    const { groupHeaderData = [], groupListData = [] } = groupItem;
    const {
      renderGroupHeader,
      renderGroupListItem,
      groupStyle,
      groupSpacing,
    } = this.props;

    const groupHeader =
      renderGroupHeader &&
      renderGroupHeader({
        status,
        groupId,
        item: groupHeaderData,
        toggleStatus: this.toggleGroupStatus.bind(this, groupId),
      });

    const groupBody = groupListData.length > 0 && (
      <ScrollView bounces={false} style={!status && { height: 0 }}>
        {groupListData.map((listItem, index) => (
          <View key={`gid:${groupId}-rid:${index}`}>
            {renderGroupListItem &&
              renderGroupListItem({
                item: listItem,
                rowId: index,
                groupId,
              })}
          </View>
        ))}
      </ScrollView>
    );

    return (
      <View
        key={`group-${groupId}`}
        style={[
          groupStyle,
          groupId && groupSpacing && { marginTop: groupSpacing },
        ]}
      >
        {groupHeader}
        {groupBody}
      </View>
    );
  }

  /**
   * @typedef { Function}
   * @param {Object} Object contains the item and the index
   * @returns return Flatlist Item
   */

  _renderFlatListItem({ item, index }) {
    return this._renderGroupItem(item, index);
  }

  /**
   * @typedef {Function}
   * @param {Object} rowData
   * @param {Number} groupId
   * @param {Number} rowId
   * @returns return List View Item
   */
  _renderListViewItem(rowData, groupId, rowId) {
    return this._renderGroupItem(rowData, parseInt(rowId));
  }

  /**
   *
   * @returns return the Flatlist
   */

  _renderUsingFlatList() {
    const { data = [], style } = this.props;

    return (
      <FlatList
        data={data}
        style={style}
        extraData={this.state}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={this._renderFlatListItem}
      />
    );
  }

  _renderUsingView() {
    const { data = [], style } = this.props;

    return (
      <View style={style}>
        {data.map((item, groupId) => {
          return this._renderGroupItem(item, groupId);
        })}
      </View>
    );
  }

  _renderUsingListView() {
    const { data = [], style } = this.props;

    return (
      <ListView
        style={style}
        showsVerticalScrollIndicator={false}
        renderRow={this._renderListViewItem}
        dataSource={new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        }).cloneWithRows(data)}
      />
    );
  }

  render() {
    const strategy = {
      View: this._renderUsingView,
      ListView: this._renderUsingListView,
      FlatList: this._supportFlatList()
        ? this._renderUsingFlatList
        : this._renderUsingListView,
    };

    // when implementedBy is not given or not in the strategy, set a default value to it
    let { implementedBy } = this.props;
    if (!strategy[implementedBy]) {
      implementedBy = "FlatList";
    }

    return strategy[implementedBy]();
  }
}
