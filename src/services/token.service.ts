const TOKEN_KEY = "token";

const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    saveToken(accessToken: any) {
        localStorage.setItem(TOKEN_KEY, accessToken);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }
};

const IntroService = {
    getIntroStatus() {
        return localStorage.getItem('introStatus');
    },

    saveIntroStatus(introStatus: any) {
        localStorage.setItem('introStatus', introStatus);
    },
};

const loggedIn = (() => {
    if(TokenService.getToken() != null ) {
        return true;
    } else {
        return false;
    }
});


export { TokenService, IntroService, loggedIn };
