const colours = {};

// Stock css colours
colours.blue = 'blue';
colours.red = 'red';
colours.green = 'green';
colours.black = 'black';
colours.orange = 'orange';

// Default colour scheme
colours.defaultOrange = '#DA7136';
colours.defaultPurple = '#42124F';
colours.defaultWhite = '#FBF9F1';
colours.lightBlue = '#4FCAAB';
colours.darkBlue = '#13AAB3';

// Colour scheme in use
colours.background = colours.defaultWhite;
colours.primary = colours.defaultOrange;
colours.seondary = colours.lightBlue;
colours.accent = colours.darkBlue;

colours.white = colours.defaultWhite;
colours.square = colours.primary;
colours.squareRevealed = colours.lightBlue;
colours.squareFlagged = colours.darkBlue;
colours.topBar = colours.defaultPurple;

module.exports = colours;