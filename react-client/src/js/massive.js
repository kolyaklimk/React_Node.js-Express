const employees = {
  "1 1": "8-912-345-67-89",
  "2 2": "8-923-456-78-90",
  "3 3": "8-934-567-89-01",
  "4 4": "8-934-567-89-02",
  "5 5": "8-934-567-89-03",
  "6 6": "8-934-567-89-04",
};


const find = document.getElementById("Find");
find.addEventListener("click", function() {
    const surname = document.querySelector("input[name='surname']").value;
    const initials = document.querySelector("input[name='initials']").value;
    const employee = employees[surname + " " + initials];
    if (employee) {
    alert(`Номер телефона: ${employee}`);
    }
    else {
    alert(`Сотрудник ${surname} ${initials} не найден`);
    }
});


const put = document.getElementById("Put");
put.addEventListener("click", function() {
    const surname = document.querySelector("input[name='surname']").value;
    const initials = document.querySelector("input[name='initials']").value;
    const phone = document.querySelector("input[name='phone']").value;
    employees[surname + " " + initials]=phone;
    const employee = employees[surname + " " + initials];
    if(surname && initials && phone){
    alert(`Сотрудник ${surname} ${initials} с номером ${phone} добавлен!`);
    }
    else{
    alert('Ошибка');
    }
});