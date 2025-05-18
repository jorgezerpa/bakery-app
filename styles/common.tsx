import { StyleSheet } from 'react-native';


export const commonStyles = StyleSheet.create({
  watchButton: {
    paddingHorizontal:7,
    paddingVertical: 5, 
    backgroundColor:"#ccc",
    borderRadius: 7,
  },
  watchButtonText: {
    fontSize:16
  },
  watchTitle: {
    fontSize: 20
  },
  watchTime: {
    fontSize: 40
  },
  watchButtonsWrapper: {
    flexDirection:"row", 
    justifyContent:"flex-end", 
    gap: 10
  }
});
