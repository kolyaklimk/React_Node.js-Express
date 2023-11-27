document.addEventListener("DOMContentLoaded", function () {
    const birthdateInput = document.getElementById("birthdate");
    const textInput = document.getElementById("text");
    const calculateAgeButton = document.getElementById("calculateAge");

    function getDayOfWeek(date) {
        const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
        return daysOfWeek[date.getDay()];
    }

    calculateAgeButton.addEventListener("click", function () {
    if (birthdateInput.value === '') {
            alert("Пожалуйста, выберите дату рождения.");
            return;
        }
        const birthdate = new Date(birthdateInput.value);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthdate.getFullYear();

        if (age < 18) {
            alert("Для использования сайта вам необходимо разрешение родителей.");
        } else {
            const dayOfWeek = getDayOfWeek(birthdate);
            alert(`Ваш возраст: ${age} лет. День недели вашего рождения: ${dayOfWeek}`);
            document.querySelector(".loader2").classList.add("animating");
            birthdateInput.classList.add("animating");
            textInput.classList.add("animating");
            calculateAgeButton.classList.add("animating");
        }
    });
});
