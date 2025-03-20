(()=>{"use strict";var e={ID:"136e7df001306b9f2159f668",GROUP:"apf-cohort-202",TOKEN:"4cd658cb-1e44-455e-b7e2-d1aa8fb1ef45",getCards:function(){return fetch("https://nomoreparties.co/v1/".concat(this.GROUP,"/cards"),{headers:{authorization:this.TOKEN}}).then((function(e){return e.json()}))},getProfile:function(){return fetch("https://nomoreparties.co/v1/".concat(this.GROUP,"/users/me"),{headers:{authorization:this.TOKEN}}).then((function(e){return e.json()}))},editProfile:function(e,t){return fetch("https://nomoreparties.co/v1/".concat(this.GROUP,"/users/me"),{method:"PATCH",headers:{authorization:this.TOKEN,"Content-Type":"application/json"},body:JSON.stringify({name:e,about:t})}).catch((function(e){return console.log(e)}))},addCard:function(e,t){return fetch("https://nomoreparties.co/v1/".concat(this.GROUP,"/cards"),{method:"POST",headers:{authorization:this.TOKEN,"Content-Type":"application/json"},body:JSON.stringify({name:e,link:t})}).catch((function(e){return console.log(e)}))},deleteCard:function(e){return fetch("https://nomoreparties.co/v1/".concat(this.GROUP,"/cards/",e),{method:"DELETE",headers:{authorization:this.TOKEN}}).catch((function(e){return console.log(e)}))},addLike:function(e){return fetch("https://nomoreparties.co/v1/".concat(this.GROUP,"/cards/likes/",e),{method:"PUT",headers:{authorization:this.TOKEN}}).catch((function(e){return console.log(e)}))},deleteLike:function(e){return fetch("https://nomoreparties.co/v1/".concat(this.GROUP,"/cards/likes/",e),{method:"DELETE",headers:{authorization:this.TOKEN}}).catch((function(e){return console.log(e)}))},editAvatar:function(e){return fetch("https://nomoreparties.co/v1/".concat(this.GROUP,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this.TOKEN,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).catch((function(e){return console.log(e)}))}};function t(t){var n=y.querySelector(".places__item").cloneNode(!0),o=n.querySelector(".card__title"),r=n.querySelector(".card__image"),c=n.querySelector(".card__like-button"),i=n.querySelector(".card__delete-button"),u=n.querySelector(".card__likes");return c.addEventListener("click",(function(){c.classList.contains("card__like-button_is-active")?(c.classList.remove("card__like-button_is-active"),e.deleteLike(t._id).then((function(e){return e.json()})).then((function(e){u.textContent=e.likes.length}))):(c.classList.add("card__like-button_is-active"),e.addLike(t._id).then((function(e){return e.json()})).then((function(e){u.textContent=e.likes.length})))})),e.ID==t.owner._id?i.addEventListener("click",(function(n){e.deleteCard(t._id).then((function(e){return e.json()})).then((function(e){"Пост удалён"==e.message?n.target.closest(".card").remove():console.log("что-то пошло не так")}))})):n.removeChild(i),t.likes.length>0&&t.likes.forEach((function(t){t._id==e.ID&&c.classList.add("card__like-button_is-active")})),r.addEventListener("click",(function(){h.src=t.link,m.textContent=t.name,k(f)})),o.textContent=t.name,r.alt=t.name,r.src=t.link,u.textContent=t.likes.length,n}var n=document.querySelector(".places__list"),o=document.querySelector(".popup_type_edit"),r=o.querySelector(".popup__input_type_name"),c=o.querySelector(".popup__input_type_description"),i=document.querySelector(".profile__title"),u=document.querySelector(".profile__description"),a=document.querySelector(".profile__image"),s=document.querySelector(".popup_type_new-card"),l=s.querySelector(".popup__input_type_card-name"),p=s.querySelector(".popup__input_type_url"),d=document.querySelector(".popup_type_edit-avatar"),_=d.querySelector(".popup__input_type_url"),f=document.querySelector(".popup_type_image"),h=f.querySelector(".popup__image"),m=f.querySelector(".popup__caption"),y=document.querySelector("#card-template").content;o.classList.add("popup_is-animated"),s.classList.add("popup_is-animated"),f.classList.add("popup_is-animated"),d.classList.add("popup_is-animated"),e.getCards().then((function(e){e.forEach((function(e){return n.append(t(e))}))})),e.getProfile().then((function(e){i.textContent=e.name,u.textContent=e.about,a.style.backgroundImage="url('".concat(e.avatar,"')")})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){r.value=i.textContent,c.value=u.textContent,k(o)}));var v=o.querySelector(".popup__form");v.addEventListener("submit",(function(t){t.preventDefault(),v.querySelector(".popup__button").textContent="Сохранение...",e.editProfile(r.value,c.value).then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){i.textContent=e.name,u.textContent=e.about,E(o)})).catch((function(e){console.log(e),alert("что-то пошло не так:(")})).finally((function(){return v.querySelector(".popup__button").textContent="Сохранить"}))})),document.querySelector(".profile__add-button").addEventListener("click",(function(){l.value=null,p.value=null,k(s)}));var S=s.querySelector(".popup__form");S.addEventListener("submit",(function(o){o.preventDefault(),S.querySelector(".popup__button").textContent="Создание...",e.addCard(l.value,p.value).then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){n.prepend(t(e)),E(s)})).catch((function(e){console.log(e),alert("что-то пошло не так:(")})).finally((function(){return S.querySelector(".popup__button").textContent="Создать"}))})),document.querySelector(".profile__edit-avatar").addEventListener("click",(function(){_.value=null,k(d)}));var q=d.querySelector(".popup__form");function k(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",L)}function E(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",L)}function L(e){"Escape"===e.key&&E(document.querySelector(".popup_is-opened"))}q.addEventListener("submit",(function(t){t.preventDefault(),q.querySelector(".popup__button").textContent="Сохранение...",e.editAvatar(_.value).then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){a.style.backgroundImage="url('".concat(e.avatar,"')"),E(d)})).catch((function(e){console.log(e),alert("что-то пошло не так:(")})).finally((function(){return q.querySelector(".popup__button").textContent="Сохранить"}))})),o.querySelector(".popup__close").addEventListener("click",(function(){return E(o)})),s.querySelector(".popup__close").addEventListener("click",(function(){return E(s)})),f.querySelector(".popup__close").addEventListener("click",(function(){return E(f)})),d.querySelector(".popup__close").addEventListener("click",(function(){return E(d)})),o.addEventListener("click",(function(e){e.currentTarget===e.target&&E(o)})),s.addEventListener("click",(function(e){e.currentTarget===e.target&&E(s)})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){Array.from(e.querySelectorAll(".popup__input")).forEach((function(t){t.addEventListener("input",(function(){!function(e,t){t.validity.valid?(function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.classList.remove("form__input-error_active"),n.textContent=""}(e,t),e.querySelector(".popup__button").removeAttribute("disabled","disabled")):(function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),o.textContent=n,o.classList.add("form__input-error_active")}(e,t,t.validationMessage),e.querySelector(".popup__button").setAttribute("disabled","disabled"))}(e,t)}))}))}(e)}))})();