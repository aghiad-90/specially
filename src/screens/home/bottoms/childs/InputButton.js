import React, { Component } from 'react';
import {
    View,
    Text, StyleSheet, TouchableHighlight, TouchableOpacity
} from 'react-native';
import { theme } from '../../../../core/theme';

export default class InputButton extends Component {

    render() {
        return (
            <TouchableOpacity style={Style.inputButton} onPress={this.props.onPress}>
                <Text style={Style.inputButtonText}>{this.props.value}</Text>
            </TouchableOpacity>
        )
    }


}

const Style = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    displayContainer: {
        flex: 2,
        backgroundColor: '#193441',
        justifyContent: 'center'
    },

    displayText: {
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },

    inputContainer: {
        flex: 8,
        backgroundColor: '#3E606F'
    },

    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
    },

    inputButtonHighlighted: {
        backgroundColor: '#193441'
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.icon
    },

    inputRow: {
        flex: 1,
        flexDirection: 'row'
    }
});
