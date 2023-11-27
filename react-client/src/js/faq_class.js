// Базовый класс FAQItem
class FAQItem {
  constructor(question, answer, date = new Date()) {
    this._question = question;
    this._answer = answer;
    this._date = date instanceof Date ? date : new Date();
  }

  // Геттер для получения вопроса
  get question() {
    return this._question;
  }

  // Сеттер для установки вопроса
  set question(newQuestion) {
    this._question = newQuestion;
  }

  // Геттер для получения ответа
  get answer() {
    return this._answer;
  }

  // Сеттер для установки ответа
  set answer(newAnswer) {
    this._answer = newAnswer;
  }

  // Геттер для получения даты
  get date() {
    return this._date;
  }

  // Функция для демонстрации
  display() {
    console.log(`Вопрос: ${this._question}`);
    console.log(`Ответ: ${this._answer}`);
    console.log(`Дата: ${this._date.toISOString()}`);
  }
}

// Класс-наследник CustomFAQItem
class CustomFAQItem extends FAQItem {
  constructor(question, answer, date = new Date(), customProperty) {
    super(question, answer, date);
    this._customProperty = customProperty;
  }

  // Геттер для получения пользовательского свойства
  get customProperty() {
    return this._customProperty;
  }


  static getDeviceName() {
    const userAgent = navigator.userAgent;

    if (/Android/i.test(userAgent)) {
        return 'Android';
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        return 'iOS';
    } else if (/Windows Phone/i.test(userAgent)) {
        return 'Windows Phone';
    } else if (/Mac/i.test(userAgent)) {
        return 'Mac';
    } else if (/Windows/i.test(userAgent)) {
        return 'Windows';
    } else if (/Linux/i.test(userAgent)) {
        return 'Linux';
    } else {
        return 'Unknown';
    }
  }

  // Сеттер для установки пользовательского свойства
  set customProperty(newCustomProperty) {
    this._customProperty = newCustomProperty;
  }

  // Функция для демонстрации
  display() {
    super.display(); // Вызываем метод родительского класса
    console.log(`Пользовательское свойство: ${this._customProperty}`);
  }

  customFunction() {
    console.log('Выполнение пользовательской функции');
  }
}

function logTime(func) {
  return function() {
    const start = performance.now();
    const result = func.apply(this, arguments);
    const end = performance.now();
    console.log(`Функция logTime выполнилась за ${end - start} миллисекунд`);
    return result;
  };
}

const addFAQButton = document.getElementById("addFAQItem");

addFAQButton.addEventListener("click", function() {
  const questionInput = document.getElementById('question');
  const answerInput = document.getElementById('answer');

  const question = questionInput.value;
  const answer = answerInput.value;

  if (question && answer) {
    const faqItem = new CustomFAQItem(question, answer, null, CustomFAQItem.getDeviceName());
    faqItem.display();
    const decorated = logTime(faqItem.customFunction);
    decorated();

    const faqList = document.getElementById('ul1');
    const faqListItem = document.createElement('li');
    const details = document.createElement('details');
    const summary = document.createElement('summary');

    const questionSpan = document.createElement('span');
    questionSpan.classList.add('question');
    questionSpan.textContent = faqItem.question;
    const dateSpan = document.createElement('span');
    dateSpan.classList.add('date');

    const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    // Функция для добавления нуля перед однозначными числами
    function addLeadingZero(number) {
        return number < 10 ? `0${number}` : number;
    }
    const date = new Date(faqItem.date);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'p.m' : 'a.m';
    dateSpan.textContent = `${month} ${day}, ${year}, ${addLeadingZero(hours % 12 || 12)}:${addLeadingZero(minutes)} ${amOrPm}`;

    summary.appendChild(questionSpan);
    summary.appendChild(document.createTextNode(' - '));
    summary.appendChild(dateSpan);
    const content = document.createElement('div');
    const answerParagraph = document.createElement('p');
    answerParagraph.textContent = faqItem.answer;
    content.appendChild(answerParagraph);
    details.appendChild(summary);
    details.appendChild(content);
    faqListItem.appendChild(details);
    faqList.appendChild(faqListItem);
    questionInput.value = '';
    answerInput.value = '';
  }
});