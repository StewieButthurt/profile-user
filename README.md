## Profile-user

Веб-версия проекта на heroku => [Profile User](https://profile-user.herokuapp.com/)

Напомню, что если приложение не открывать в течении 30 минут - оно уснет.
Поэтому первая загрузка приложений может занимать около 10-ти секунд.
Таким образом heroku экономит ресурсы.

## Авторизация пользователя

Можно авторизоваться от следующих пользователей<br>
Далее логин : пароль 

Bret : BretPassword<br>
Antonette : AntonettePassword<br>
Samantha : SamanthaPassword<br>
Karianne : KariannePassword<br>
Kamren : KamrenPassword<br>

## Установка с помощью Docker

Если отсутствует, то установить [Docker](https://docs.docker.com/desktop/)

1) В командной строке пишем "docker pull stewiebutthurt/cheers2019"
2) После загрузки запускаем командной "docker run -p 3000:3000 -d stewiebutthurt/cheers2019"

Теперь приложение доступно по адресу http://localhost:3000

## Наличие backend на Node.js

В тестовом задании была задача имитировать ответы всех запросов. 

Я все же решил пойти дальше и сделать REST API, чтобы получать реальные данные с сервера, на котором подготовлен файл json с нескольким кол-вом пользователей. 

При первой авторизации, если логин и пароль существуют в "базе", то ответом с сервера возвращается токен, сформированный с помощью модуля "jsonwebtoken". В токене зашифрован логин и id пользователя. Так же пароли пользователей хранятся в зашифрованном виде с помощью модуля "bcryptjs". Далее токен записывается в cookie, и используется для авто-логина.

При запросе на страницу "/", в middleware со стороны сервера идет запрос на проверку токена. Токен отправляется на сервер, дешифруется сверяется с данными в "базе", и в случае успеха возвращается профиль пользователя, которому принадлежат данные. Они записываются в store, после чего на странице пользователя мы их получаем через computed свойста. 

Данная конструкция позволяет заполнять store на сервере, посредством чего мы имеем сформированный код страницы на сервере для отрисовки на клиенте. 



**Тестовое задание:**

Создать приложение Профиль пользователя.

Пользователь при запуске приложения видит форму авторизации, вводит логин-пароль, попадает на страницу своего профиля с данными: имя, имейл, фото.

 

Ответы всех запросов (авторизация, получение данных) имитируются (mock).

 

Требования

1.    Использование vuejs

2.    Использование nuxtjs

3.    Использование vuetify (дизайн значения не имеет)

 

Результат

Ссылка на git-репозиторий, содержащий приложение, инструкции для его запуска

 

Дополнительное задание (необязательно)

Добавить в git репозиторий инструкции для запуска приложения внутри контейнера docker.
