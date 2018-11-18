var tokenEnum = require("../enums/tokenEnum");
var moment = require('moment');
var tokens = [];
//Request - ClientID, Name, Message, Type(Brewer, Viewer)
var tokenRequests = [];

var loginCreds = {
    u: "Steve",
    p: "BeerIsGood"
}


module.exports = {
login: function(login, cb) {
    if(login.UserName == loginCreds.u && login.Password == loginCreds.p) {
        delete login.Password;
        cb(createToken(login));
    } else {
        cb(false);
    }
},
logout: function(cb) {
    tokens = [];
    cb();
},
checkToken: function(token, cb) {
    if(tokens.findIndex(t => t.Token == token) != -1) {
        if(tokens[tokens.findIndex(t => t.Token == token)].Expiration > moment().format()) {
            console.log(tokens);
            cb(true);
        } else {
            removeToken(token);
            console.log(tokens);
            cb(false);
        }
    } else {
        console.log(tokens);
        cb(false);
    }
    tokenMaintence();
},
refreshToken: function(token) {
    if(tokens[tokens.findIndex(t => t.Token == token)].Expiration > moment().format()) {
        tokens[tokens.findIndex(t => t.Token == token)].Expiration = moment().add(15,'minutes').format();
        cb(true);
    } else {
        removeToken(token);
        cb(false);
    }
}

};

//requestToken -isBrewerLoggedIn -clientID, Name, Message
//getAllTokenRequests - Return all Reqeust Tokens
//decisionTokenRequest - Approve or Deny Token Reqeusts

function createToken(login) {
    login.Created = moment().format();
    login.Expiration = moment().add(15, 'minutes').format()
    login.Token = generateToken();
    tokens.push(login);
    return login;
}
function generateToken() {
    return Math.random().toString(36).replace('0.', '')+
    Math.random().toString(36).replace('0.', '');
}
function removeToken(token) {
    console.log("Remove");
    tokens.splice(tokens.findIndex(t => t.Token == token), 1);
} 
function tokenMaintence() {
    for(i = 0; i < tokens.length; i++){
        if(tokens[i].Expiration < moment().format()) {
            removeToken(tokens[i].Token);
        }
    }
}


