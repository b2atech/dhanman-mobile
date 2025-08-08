import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  verticalScale,
  fontScale,
  spacing,
  fontSize,
  lineHeight,
  borderRadius,
  buttonHeight,
  inputHeight,
  responsivePadding,
  responsiveWidth,
} from '../utils/responsive';

const commonStyles = StyleSheet.create({
  alignItemCenter: {
    alignItems: 'center',
  },
  alignItemLeft: {
    alignItems: 'flex-start',
  },
  alignItemRight: {
    alignItems: 'flex-end',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  headerText: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    color: '#333',
    fontFamily: 'Poppins-ExtraLight',
  },
  headerBoldText: {
    fontSize: fontSize.xxl,
    lineHeight: lineHeight.xxl,
    color: '#333',
    fontWeight: 'bold',
    fontFamily: 'Poppins-ExtraLight',
  },
  descriptionText: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: inputHeight.md,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: responsivePadding.horizontal.sm,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    fontSize: fontSize.md,
  },
  container: {
    flexGrow: 1,
    padding: spacing.xs,
    backgroundColor: '#f7f7f7',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    color: 'red',
  },
  title: {
    fontSize: fontSize.xxxl,
    lineHeight: lineHeight.xxxl,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  searchBar: {
    height: inputHeight.md,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    paddingHorizontal: responsivePadding.horizontal.sm,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.md,
  },
  dropdown: {
    height: inputHeight.md,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    paddingHorizontal: responsivePadding.horizontal.sm,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
    paddingLeft: responsivePadding.horizontal.sm,
    fontSize: fontSize.md,
  },
  placeholderStyle: {
    color: '#999',
  },
  selectedTextStyle: {
    color: '#000',
  },
  dropdownItemTextStyle: {
    color: '#000',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  rounded: {
    borderRadius: borderRadius.lg,
  },
  fontPoppins: {
    fontFamily: 'Poppins-Regular',
  },
  shareButton: {
    padding: 2,
  },
  addButton: { position: 'absolute', top: -1, right: -7 },

  addCircle: {
    width: horizontalScale(22),
    height: horizontalScale(22),
    borderRadius: horizontalScale(11),
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  infoCircle: {
    width: horizontalScale(22),
    height: horizontalScale(22),
    borderRadius: horizontalScale(10),
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: '#fff',
    fontWeight: 'bold',
  },
  status: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    fontWeight: 'bold',
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  statusActive: {
    color: 'green',
  },
  statusInactive: {
    color: 'red',
  },
  visitorName: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: 'bold',
    color: '#3b5998',
    marginBottom: spacing.xs,
  },
  submitButton: {
    backgroundColor: '#3B6FD6',
    padding: spacing.md,
    borderRadius: borderRadius.xs,
    width: '100%',
    alignItems: 'center',
    marginTop: verticalScale(50),
    height: buttonHeight.md,
  },
  submitButtonText: {
    color: 'white',
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
    fontWeight: 'bold',
  },
});

export default commonStyles;
