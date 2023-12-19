# React + Node.js-Express
 
## Backend Node.js: 
1. Express + Validator (веб-сервер /валидация запросов)
2. MongoDB/Mongoose (работа с базой данных)
3. JSON Web Token (аутентификация /авторизация)
4. Multer (загрузка файлов/изображений)
5. BCrypt (шифрование пароля)

## MongoDB
1. Возможно потребуется VPN
2. Зарегистрироваться на сайте [MongoDB](https://www.mongodb.com/) и выбрать бесплатный тариф
3. Создать кластер
4. Чтобы подключить БД к приложению, требуется ссылка на эту БД. Чтобы её взять надо:
   - выбрать в списке DEPLOYMENT -> Database
   - В созданном кластере нажать на кнопку `Connect`
   - После чего в пункте *Connect to your application* нажать на кнопку `Drivers`
   - Внизу будет код, следующего вида:
      ```python
      mongodb+srv://admin:<password>@cluster228.qsy1337.mongodb.net/?retryWrites=true&w=majority
      ```
      где надо поменять данные в строке: *admin* на имя пользователя кластера, и *password* на его пароль

## Разбор Backend:
1. Для удобной работы с POST/GET/PUT/DELETE запросами скачать [Insomnia](insomnia)
2. Скачать и установить последнюю версию LTS [node.js](https://nodejs.org/en)
3. Для создания файла package.json прописать в консоли папки проекта: `npm init`
4. Установить библиотеки:
   - `npm install bcrypt`
   - `npm install express`
   - `npm install express-validator`
   - `npm install jsonwebtoken`
   - `npm install mongoose`
   - `npm install multer`
   - `npm install nodemon` - автоматически перезапускает проект при обновлении файлов. 
5. Для работы с модулями в package.json добавить:
```json
   "type": "module"
  ``` 
6. Чтобы настроить *nodemon* в package.json надо написать:
   ```json
   "scripts": {
    "startapp": "nodemon index.js"
     }
  После чего проект надо запускать командой `npm run startapp`
  
