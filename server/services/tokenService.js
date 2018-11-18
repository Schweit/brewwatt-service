//Token -ClientID, Name, Type(Brewer,Viewer), created, expires
var tokens = [];
//Request - ClientID, Name, Message, Type(Brewer, Viewer)
var tokenRequests = [];

var loginCreds = {
    u: "Steve",
    p: "BeerIsGood"
}


module.exports = {
login: function(u,p) {
    
}





}


//login
//logout
//checkToken - ValidateToken
//requestToken -isBrewerLoggedIn -clientID, Name, Message
//getAllTokenRequests - Return all Reqeust Tokens
//decisionTokenRequest - Approve or Deny Token Reqeusts
//removeToken - Remove Token
//refreshToken - reset Token expirationDate
//TokenMaintence -Remove Expired Tokens

function createToken(name, type) {
    var token = {
        Name: name,
        Type: type,
        Created: moment().format(),
        Experation: moment().add(15, 'minutes').format(),
        Token: generateToken()
    }
}
function generateToken() {
    return Math.random().toString(36).replace('0.', '')+
    Math.random().toString(36).replace('0.', '');
}


