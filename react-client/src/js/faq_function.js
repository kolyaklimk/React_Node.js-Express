function FAQItem2(question, answer, date) {
  this._question = question;
  this._answer = answer;
  this._date = date instanceof Date ? date : new Date();
}

FAQItem2.prototype.getQuestion = function() {
  return this._question;
};

FAQItem2.prototype.setQuestion = function(newQuestion) {
  this._question = newQuestion;
};

FAQItem2.prototype.getAnswer = function() {
  return this._answer;
};

FAQItem2.prototype.setAnswer = function(newAnswer) {
  this._answer = newAnswer;
};

FAQItem2.prototype.getDate = function() {
  return this._date;
};

FAQItem2.prototype.display = function() {
  console.log(`Вопрос: ${this._question}`);
  console.log(`Ответ: ${this._answer}`);
  console.log(`Дата: ${this._date.toISOString()}`);
};

// Класс-наследник CustomFAQItem
function CustomFAQItem2(question, answer, date, customProperty) {
  FAQItem2.call(this, question, answer, date);
  this._customProperty = customProperty;
}

CustomFAQItem2.prototype = Object.create(FAQItem2.prototype);
CustomFAQItem2.prototype.constructor = CustomFAQItem2;

CustomFAQItem2.prototype.getCustomProperty = function() {
  return this._customProperty;
};

CustomFAQItem2.prototype.setCustomProperty = function(newCustomProperty) {
  this._customProperty = newCustomProperty;
};

CustomFAQItem2.prototype.display = function() {
  FAQItem2.prototype.display.call(this);
  console.log(`Пользовательское свойство: ${this._customProperty}`);
};

CustomFAQItem2.prototype.customFunction = function() {
  console.log('Выполнение пользовательской функции');
};


CustomFAQItem2.getDeviceName = function() {
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
};

// Функция для замера времени выполнения
function logTime(func) {
  return function() {
    const start = performance.now();
    const result = func.apply(this, arguments);
    const end = performance.now();
    console.log(`Функция logTime выполнилась за ${end - start} миллисекунд`);
    return result;
  };
}



const addFAQButton2 = document.getElementById("addFAQItem2");

addFAQButton2.addEventListener("click", function() {
  const questionInput = document.getElementById('question');
  const answerInput = document.getElementById('answer');

  const question = questionInput.value;
  const answer = answerInput.value;

  if (question && answer) {
    const faqItem = new CustomFAQItem2(question, answer, null, CustomFAQItem2.getDeviceName());
    faqItem.display();
    const decorated = logTime(faqItem.customFunction);
    decorated();

    const faqList = document.getElementById('ul2');
    const faqListItem = document.createElement('li');
    const details = document.createElement('details');
    const summary = document.createElement('summary');

    const questionSpan = document.createElement('span');
    questionSpan.classList.add('question');
    questionSpan.textContent = faqItem.getQuestion();
    const dateSpan = document.createElement('span');
    dateSpan.classList.add('date');

    const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    // Функция для добавления нуля перед однозначными числами
    function addLeadingZero(number) {
        return number < 10 ? `0${number}` : number;
    }
    const date = new Date(faqItem.getDate());
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
    answerParagraph.textContent = faqItem.getAnswer();
    content.appendChild(answerParagraph);
    details.appendChild(summary);
    details.appendChild(content);
    faqListItem.appendChild(details);
    faqList.appendChild(faqListItem);
    questionInput.value = '';
    answerInput.value = '';
  }
});