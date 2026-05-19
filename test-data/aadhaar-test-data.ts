export const aadhaarTestData = {
  valid: { name: 'Anubha Harish Borude', aadhaarNumber: '123456789245' },
  invalid: {
    shortNumber: '12345',
    alphaNumber: 'ABCD12345678',
    specialChars: '1234@567#901',
    longNumber: '12345678901234567',
  },
  boundary: { nameMaxLength: 'A'.repeat(150), twelveDigitNumber: '987654321098' },
  navigation: {
    menuSearchText: 'Add Aadhar Card Details',
    menuLinkName: 'Add Aadhar Card Details',
    extraScreensButton: 'Extra Screens',
  },
  viewports: {
    desktop: { width: 1920, height: 1080 },
    laptop: { width: 1366, height: 768 },
    tablet: { width: 820, height: 1180 },
    mobileIPhone: { width: 393, height: 852 },
    mobileGalaxy: { width: 360, height: 800 },
  },
};
