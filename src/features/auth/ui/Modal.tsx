import React from 'react';
import { Modal as RNModal, StyleSheet, Pressable, View, TouchableWithoutFeedback} from 'react-native';
import { MediumText } from '../../../shared/ui/texts';

type Props = {
    modalVisible: boolean
    handleClose: () => void
    handleSelectValue: (value: string) => void
    data: {value: string}[]
}

export const Modal = ({modalVisible, handleClose, handleSelectValue, data}: Props) => {
  return (
    <RNModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}>
        <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {data.map((item, index) => {
                        return (
                            <Pressable
                                key={index}
                                style={styles.button}
                                onPress={() => handleSelectValue(item.value)}
                            >
                                <MediumText 
                                    align="center" 
                                    size={15} 
                                    children={item.value} 
                                />
                            </Pressable>
                        )
                    })}
                </View>
            </View>
        </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
   centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
   },
   modalView: {
        width: '90%',
        backgroundColor: "#fff",
        borderRadius: 10,
   },
   button: {
        width: '100%',
        height: 48,
        justifyContent: 'center',
   }
});
