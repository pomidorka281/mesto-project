export const ServerConnection = {

ID: '136e7df001306b9f2159f668',
GROUP: 'apf-cohort-202',
TOKEN: '4cd658cb-1e44-455e-b7e2-d1aa8fb1ef45',

getCards: function getCards() {
    return fetch("https://nomoreparties.co/v1/".concat(this.GROUP, "/cards"), {
        headers: {
            authorization: this.TOKEN
        }
    }).then(function (res) {
        return res.json();
    });
},

getProfile: function getProfile() {
    return fetch("https://nomoreparties.co/v1/".concat(this.GROUP, "/users/me"), {
        headers: {
            authorization: this.TOKEN
        }
    }).then(function (res) {
        return res.json();
    });
},

editProfile: function editProfile(name, about) {
    return fetch("https://nomoreparties.co/v1/".concat(this.GROUP, "/users/me"), {
        method: "PATCH",
        headers: {
            authorization: this.TOKEN,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).catch(function (err) {
        return console.log(err);
    });
},

addCard: function addCard(name, url) {
    return fetch("https://nomoreparties.co/v1/".concat(this.GROUP, "/cards"), {
        method: "POST",
        headers: {
            authorization: this.TOKEN,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            name: name,
            link: url
        })
    }).catch((err) => console.log(err));
},

deleteCard: function deleteCard(cardId) {
    return fetch("https://nomoreparties.co/v1/".concat(this.GROUP, "/cards/", cardId), {
        method: "DELETE",
        headers: {
            authorization: this.TOKEN
        }
    })
        .catch((err) => console.log(err));
},

addLike: function addLike(cardId) {
    return fetch("https://nomoreparties.co/v1/".concat(this.GROUP, "/cards/likes/", cardId), {
        method: "PUT",
        headers: {
            authorization: this.TOKEN
        }
    })
        .catch((err) => console.log(err));
},

deleteLike: function deleteLike(cardId) {
    return fetch("https://nomoreparties.co/v1/".concat(this.GROUP, "/cards/likes/", cardId), {
        method: "DELETE",
        headers: {
            authorization: this.TOKEN
        }
    })
        .catch((err) => console.log(err));
},

editAvatar: function editAvatar(url) {
    return fetch("https://nomoreparties.co/v1/".concat(this.GROUP, "/users/me/avatar"), {
        method: "PATCH",
        headers: {
        authorization: this.TOKEN,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            avatar: url
        })
    })
        .catch((err) => console.log(err));
}

};