import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, ScrollView, Dimensions } from 'react-native'
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MediaView from '../childs/MediaView';




class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, events: [], selectedCategory: 0, type: 1, ImagesData: { results: [] }, VideosData: { results: [] }, categories: [], assetsView: true

        }


    }

    componentDidMount() {

        console.log(this.props.navigation.state.params)
    }


    render() {
        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                {this.state.assetsView &&
                    <View style={{
                        justifyContent: 'center',
                        alignContent: 'center', alignItems: "center", backgroundColor: 'black',
                        position: 'absolute', width: '100%', height: '100%', zIndex: 999999999999999,
                    }}>
                        <MediaView {...this.props} isRightUser={this.props.data.userInfo.email && this.props.data.userInfo.role !== 'user' && this.props.data.userInfo._id === this.props.navigation.state.params.celebraty._id} celebraty={this.props.navigation.state.params.celebraty} startingIndex={this.props.navigation.state.params.startingIndex} assetsList={this.props.navigation.state.params.assetsList} assesCheck={this.props.navigation.state.params.assesCheck} onHide={() => { this.props.navigation.pop(); this.setState({ assetsView: false }) }} />
                    </View>
                }
            </Block >
        )
    }





}

const mapStateToProps = (state) => ({
    data: {
        userInfo: state.login.userInfo
    },
})
const mapDispatchToProps = (dispatch) => ({
    actions: {
        about: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
    },

});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(About))