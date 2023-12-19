# React + Node.js-Express
 
[MongoDB](#head11)

[Разбор важных аспектов Backend](#head22) 

[Разбор важных аспектов Front](#head33) 

## Backend Node.js: 
1. Express + Validator (веб-сервер /валидация запросов)
2. MongoDB/Mongoose (работа с базой данных)
3. JSON Web Token (аутентификация /авторизация)
4. Multer (загрузка файлов/изображений)
5. BCrypt (шифрование пароля)
   
<a name="head11"><h2>MongoDB</h2></a>

1. Возможно потребуется VPN
2. Зарегистрироваться на сайте [MongoDB](https://www.mongodb.com/) и выбрать бесплатный тариф
3. Создать кластер
4. Чтобы подключить БД к приложению, требуется ссылка на эту БД. Чтобы её взять надо:
   - выбрать в списке DEPLOYMENT -> Database
   - В созданном кластере нажать на кнопку `Connect`
   - После чего в пункте *Connect to your application* нажать на кнопку `Drivers`
   - Внизу будет код, следующего вида:
      ```python
      mongodb+srv://admin:<password>@cluster228.hdf1337.mongodb.net/?retryWrites=true&w=majority
      ```
      где надо поменять данные в строке: *admin* на имя пользователя кластера, и *password* на его пароль

<a name="head22"><h2>Разбор важных аспектов Backend:</h2></a>

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
```
   После чего проект надо запускать командой `npm run startapp`
   
7. Подключение к MongoDB:
```javascript
   mongoose.connect('mongodb+srv://admin:admin@cluster228.hdf1337.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));
```

8. Для того, чтобы хранить изображения на сервере, надо использовать `Multer`. Так выглядит настройка в *index.js*:
```javascript
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.use(express.json({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAdmin, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});
```
Таким образом картинки будут храниться в папке *uploads* и открываться по ссылке */uploads/{img name}*

9. Для того, чтобы хранить *Id* пользователя и другие полезные данные, можно использовать токен `JSON Web Token`
```javascript
const token = jwt.sign(
            {
                _id: user._id,
                admin: user.admin,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );
```
В данном случае сохраняется *Id* и является ли пользователь админом. Также указано, что токен действителен 30 дней. И указан ключ, по которому будет происходить расшифровка токена - *'secret123'*
Расшифровка токена:
```javascript
const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
const decoded = jwt.verify(token, 'secret123');
```
В данном случае *decoded* будет хранить в себе *decoded.admin* и *decoded._id*

10. Для валидации запросов, можно воспользоваться `express-validator`:
```javascript
export const registerValidator = [
    body('email', 'Error email').isEmail(),
    body('password', 'Password should be more then 5 symbols').isLength({ min: 5 }),
    body('firstName', 'FirstName should be more then 3 symbols').isLength({ min: 3 }),
    body('lastName', 'lastName should be more then 3 symbols').isLength({ min: 3 }),
    body('patronymic', 'Patronymic should be more then 3 symbols').isLength({ min: 3 }),
    body('phoneNumber', 'Error phoneNumber').isMobilePhone(),
    body('birthDate', 'Error birthDate').isDate(),
    body('birthDate', 'BirthDate should be more then 18').custom((value) => {
        const age = (new Date().getTime() - new Date(value).getTime()) / (365 * 24 * 60 * 60 * 1000);
        return age >= 18;
    }),
];
```
Данная библиотека имеет различные методы для проверки данных, такие как *isEmail()*, *isMobilePhone()* и тд. В *body* сначала передаётся имя поля, которое надо проверить, а после текст, если валидация не пройдёт. После *body* идут условия проверки. Также можно написать свою собственную проверку с помощью *custom*.

Пример использования валидации:
```javascript
app.post('/auth/register', Validator.registerValidator, handleValidationErrors, UserController.register);
```

11. Чтобы зашифровать пароль, можно воспользоваться `BCrypt`:
```javascript
await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
```
Сравнение зашифрованного пароля и пароля, который пользователь отправил на сервер:
```javascript
const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return req.status(404).json({
                message: 'Error email/password',
            });
        }
```
12. Также стоит отметить, что модели и контроллеры вынесены в отдельные папки, чтобы структурировать проект.

<a name="head33"><h2>Разбор важных аспектов Front:</h2></a>

1. Создать проект `npx create-react-app my-app`
2. Чтобы установить необходимые библиотеки достаточно написать в консоли `npm i`
3. Установка *router-dom* - `npm install react-touter-dom`. С помощью этой библиотеки удобно указывать пути к страницам.
4. Запустить *React* приложение - `npm start`
5. В файле *package.json* необходимо дописать прокси, чтобы клиент мог обращаться к серверу:
```json
"proxy": "http://localhost:8000"
```

6. Пример установки пути к странице в *App.js*:
```html
<BrowserRouter>
    <Routes>
        <Route path="rooms" element={<ListRoomsPage />}>
        </Route>
    </Routes>
</BrowserRouter>
```
6. Для работы с состоянием и данными пользователя использовался провайдер:
```html
<AuthContext.Provider value={{
            token, login, logout, _id, isAdmin, isAuthenticated, ready
        }}>
```
Провайдер в свою очерез использует хук:
```javascript
const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [isAdmin, setAdmin] = useState(null)

    const login = useCallback((jwtToken, id, admin) => {
        setToken(jwtToken)
        setUserId(id)
        setAdmin(admin)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, isAdmin: admin
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setAdmin(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.isAdmin)
        }
        setReady(true)
    }, [login])


    return { login, logout, token, userId, isAdmin, ready }
}
```
Можно обратить внимание, что важные данные как токен и тд храняться в *localStorage*.
