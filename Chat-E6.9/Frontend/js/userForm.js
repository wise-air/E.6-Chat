const urlUsers = "http://127.0.0.1:8000/api/chatusers";
const urlChatUsers = "http://127.0.0.1:8000/api/chatusers"
const nav = document.querySelector('.nav');
const request = new XMLHttpRequest();
const currentUserId = window.localStorage.getItem('currentUser');
const userForm = document.getElementById('userForm');

let getCurrentUser = function () {
    request.open('get', urlChatUsers, true);
    request.send();

    request.onload = function () {
        let myData = JSON.parse(request.response);
        let currentUser = myData[0]['name']['username'];
        let currentUserAvatar = myData[0]['avatar'];
        let currentUserElement = document.createElement('div');
        let currentUserAvatarElement = document.createElement('img');
        currentUserElement.setAttribute('class', 'author');
        currentUserAvatarElement.setAttribute('class', 'avatar');
        currentUserAvatarElement.setAttribute('src', currentUserAvatar);
        currentUserElement.innerHTML = `Текущий пользователь: ${currentUser}`;
        nav.prepend(currentUserAvatarElement);
        nav.prepend(currentUserElement);
    }
}

// let updateUser = function (e) {
//     e.preventDefault();
//     let myForm = new FormData(userForm);
//     let newName = myForm.get('name');
//     let newAvatar = myForm.get('avatar').name;
//     let body = {
//         "name": {
//             "username": newName
//         }, "avatar": newAvatar
//     }
//     body = JSON.stringify(body);

//     request.open('put', `${urlChatUsers}/${currentUserId}`, true);
//     request.setRequestHeader("Content-type", "application/json");
//     // request.setRequestHeader("Content-type", "multipart/form-data");
//     request.send(body);

//     request.onload = function () {
//         window.location.href = 'index.html'
//     }
// }

let updateUser = function (e) {
    e.preventDefault();
    let myForm = new FormData();
    let newAvatar = document.getElementById('id-avatar')
    let newName = document.getElementById('id-name')
    myForm.append('name', newName.value)
    myForm.append('avatar', newAvatar.files[0])
    options = {
        method: 'PUT',
        body: myForm,
    }

    fetch(`${urlChatUsers}/${currentUserId}`, options).then(response => response.json()).then(result => {
        window.location.href = '/index.html'
    })
}

document.addEventListener('DOMContentLoaded', getCurrentUser);
userForm.addEventListener('submit', updateUser);
