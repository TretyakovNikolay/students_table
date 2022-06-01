let container = document.querySelector('.container');
let table = document.createElement('table');
let tbody = document.createElement('tbody');
let today = new Date();
let course;
let thead = document.createElement('thead');
let tr = document.createElement('tr');
let th1 = document.createElement('th');
let th2 = document.createElement('th');
let th3 = document.createElement('th');
let th4 = document.createElement('th');

class Student {
  constructor(surname, firstname, secondname, faculty, birthDate, yearstudy) {
    this.surname = surname
    this.firstname = firstname
    this.secondname = secondname
    this.faculty = faculty
    this.birthDate = birthDate
    this.yearstudy = yearstudy
    this.endStudyear = yearstudy + 4
  }

  //Соединяем ФИО
  get fio() {
    return this.surname.substr(0, 1).toUpperCase() + this.surname.substr(1).toLowerCase() + ' ' + this.firstname.substr(0, 1).toUpperCase() + this.firstname.substr(1).toLowerCase() + ' ' + this.secondname.substr(0, 1).toUpperCase() + this.secondname.substr(1).toLowerCase();
  }

  //Считаем на каком курсе учиться студент и закончил обучение

  studyPeriod() {
    let courseNumber = today.getFullYear() - this.yearstudy;
    if (courseNumber < 4) {
      return courseNumber + ' курс'; // из текущей даты берем год минус год начала обучения
    } else {
      return 'закончил'
    }
  }

  //Приводим дату к нужному формату
  getBirtDate() {
    const yyyy = this.birthDate.getFullYear();
    let mm = this.birthDate.getMonth() + 1; // месяц начинается с 0
    let dd = this.birthDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
  }

  // Получаем возраст
  getAge() {

    let age = today.getFullYear() - this.birthDate.getFullYear();
    let m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age + ' лет';
  }
}

//Массив со студентами
const students = [
  new Student('Третьяков', 'Николай', 'Алексеевич', 'Строительный', new Date(1996, 9, 29), 2015,),
  new Student('Иванов', 'Дмитрий', 'Александрович', 'Математический', new Date(2000, 6, 14), 2019),
  new Student('Крылова', 'Нина', 'Владимровна', 'Филологический', new Date(2001, 11, 6), 2020),
  new Student('Захаров', 'Максим', 'Олегович', 'Астрономический', new Date(2002, 4, 17), 2021),
]

//Создаем заголовок
function createTitle() {
  let title = document.createElement('h1');
  title.textContent = 'Список студентов';
  title.classList.add('h1');
  container.append(title);
}
createTitle();

//Создаем форму добавления студента
let titleform = document.createElement('h3');
let form = document.createElement('form');
let inputSurname = document.createElement('input');
let inputFirstname = document.createElement('input');
let inputSecondname = document.createElement('input');
let inputDate = document.createElement('input');
let inputFaculty = document.createElement('input');
let inputYear = document.createElement('input');
let button = document.createElement('button');

//Создаем форму добавления студента
function createForm() {
  titleform.classList.add('h3')
  titleform.textContent = 'Добавить студента'
  form.classList.add('form-group', 'form');
  form.id = 'form';
  inputSurname.classList.add('form-control', 'input');
  inputSurname.placeholder = 'Введите Фамилию';
  inputSurname.required = true;
  inputSurname.id = 'input-surname';
  inputFirstname.classList.add('form-control', 'input');
  inputFirstname.placeholder = 'Введите Имя';
  inputFirstname.required = true;
  inputFirstname.id = 'input-firstname';
  inputSecondname.classList.add('form-control', 'input');
  inputSecondname.placeholder = 'Введите Отчество';
  inputSecondname.required = true;
  inputSecondname.id = 'input-secondname';
  inputDate.classList.add('form-control', 'input');
  inputDate.placeholder = 'Введите дату рождения';
  inputDate.required = true;
  inputDate.id = 'input-date';
  inputDate.type = 'date';
  inputDate.min = '1900-01-01';
  inputDate.max = (today);
  inputFaculty.classList.add('form-control', 'input');
  inputFaculty.placeholder = 'Введите факультет';
  inputFaculty.required = true;
  inputFaculty.id = 'input-faculty';
  inputYear.classList.add('form-control', 'input');
  inputYear.required = true;
  inputYear.id = 'input-year';
  inputYear.placeholder = 'Введите год начала обучения';
  button.classList.add('btn', 'btn-primary')
  button.textContent = 'Добавить';
  button.type = 'submit';

  container.append(titleform);
  container.append(form);
  form.append(inputSurname);
  form.append(inputFirstname);
  form.append(inputSecondname);
  form.append(inputDate);
  form.append(inputFaculty);
  form.append(inputYear);
  form.append(button);
}
createForm();

//Создаем форму фильтрации списка студентов
function createFormfilter() {
  let titleformstudent = document.createElement('h3');
  let formfilter = document.createElement('form');
  let inputfilterFio = document.createElement('input');
  let inputfilterfaculty = document.createElement('input');
  let inputfilterStartstudy = document.createElement('input');
  let inputfilterEndstudy = document.createElement('input');
  let buttonfilter = document.createElement('button');

  titleformstudent.classList.add('h3')
  titleformstudent.textContent = 'Отфильтровать список'
  formfilter.classList.add('form-group', 'form');
  formfilter.id = "formFilter";
  inputfilterFio.placeholder = 'Введите ФИО';
  inputfilterFio.classList.add('form-control', 'input');
  inputfilterFio.id = 'inputfilterFio';
  inputfilterfaculty.classList.add('form-control', 'input');
  inputfilterfaculty.placeholder = 'Введите факультет';
  inputfilterfaculty.id = 'inputfilterfaculty';
  inputfilterStartstudy.classList.add('form-control', 'input');
  inputfilterStartstudy.placeholder = 'Введите год начала обучения';
  inputfilterStartstudy.id = 'inputfilterStartstudy';
  inputfilterEndstudy.classList.add('form-control', 'input');
  inputfilterEndstudy.placeholder = 'Введите год окончания обучения';
  inputfilterEndstudy.id = 'inputfilterEndstudy';
  buttonfilter.classList.add('btn', 'btn-primary')
  buttonfilter.textContent = 'Фильтровать';
  buttonfilter.type = 'submit';
  container.append(titleformstudent);
  container.append(formfilter);
  formfilter.append(inputfilterFio);
  formfilter.append(inputfilterfaculty);
  formfilter.append(inputfilterStartstudy);
  formfilter.append(inputfilterEndstudy);
  formfilter.append(buttonfilter);
}
createFormfilter()

//Создаем head таблицы сстудентов
function createTable() {
  let buttonSortfio = document.createElement('button');
  let buttonSortFaculty = document.createElement('button');
  let buttonSortBirthDate = document.createElement('button');
  let buttonSortYearstudy = document.createElement('button');

  table.classList.add('table');
  thead.classList.add('thead-light');
  th1.textContent = 'ФИО студента';
  buttonSortfio.dataset.column = 'fio';
  th2.textContent = 'Факультет';
  buttonSortFaculty.dataset.column = 'faculty';
  th3.textContent = 'Дата рождения и возраст';
  buttonSortBirthDate.dataset.column = 'birthDate';
  th4.textContent = 'Годы обучения и номер курса';
  buttonSortYearstudy.dataset.column = 'yearstudy';
  buttonSortfio.classList.add('buttonSort');
  buttonSortFaculty.classList.add('buttonSort');
  buttonSortBirthDate.classList.add('buttonSort');
  buttonSortYearstudy.classList.add('buttonSort');

  container.append(table);
  table.append(thead);
  thead.append(tr);
  tr.append(th1);
  th1.append(buttonSortfio);
  tr.append(th2);
  th2.append(buttonSortFaculty);
  tr.append(th3);
  th3.append(buttonSortBirthDate);
  tr.append(th4);
  th4.append(buttonSortYearstudy);
  table.append(tbody);
}

createTable()

// Добавляем студентов в таблицу из массива
function createStudent(student) {
  const studentTR = document.createElement('tr'),
    fioTD = document.createElement('td'),
    facultyTD = document.createElement('td'),
    birthDateTD = document.createElement('td'),
    yearstudyTD = document.createElement('td')

  fioTD.textContent = student.fio
  facultyTD.textContent = student.faculty
  birthDateTD.textContent = student.getBirtDate() + ' (' + student.getAge() + ')'
  yearstudyTD.textContent = student.yearstudy + '-' + student.endStudyear + ' (' + student.studyPeriod()  + ')'

  studentTR.append(fioTD)
  studentTR.append(facultyTD)
  studentTR.append(birthDateTD)
  studentTR.append(yearstudyTD)

  return studentTR;
}

//Сортировка студентов


let theadListThAll = thead.querySelectorAll('button');
let column = 'fio',
  columnDir = true

function getSortStudents(prop, dir) {
  const studentsCopy = [...students] //получаем копию нашего массива
  return studentsCopy.sort(function (studentA, studentB) { // сортируем объект по свойству
    if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
      return -1;
  })
}

//Фильтр студентов
function filter(students, prop, value) {
  let result = [],
    сopy = [...students] //получаем копию нашего массива

  for (const item of сopy) {
    if (String(item[prop]).includes(value) == true) result.push(item)
  }
  return result
}

//Отображаем актуальный список студентов
function render(students) {
  let studentsCopy = [...students] //получаем копию нашего массива
  tbody.innerHTML = ''

  studentsCopy = getSortStudents(column, columnDir) //Сортируем таблицу*/
  //Находим значения инпутов фильтрации
  const surnameVal = document.getElementById('inputfilterFio').value,
  facultyVal = document.getElementById('inputfilterfaculty').value,
  StartstudyVal = document.getElementById('inputfilterStartstudy').value;
  EndstudyVal = document.getElementById('inputfilterEndstudy').value;

//Пишем условие при котором фильтруется наша таблица
if (surnameVal !== '') studentsCopy = filter(studentsCopy, 'surname', surnameVal)
if (facultyVal !== '') studentsCopy = filter(studentsCopy, 'faculty', facultyVal)
if (StartstudyVal !== '') studentsCopy = filter(studentsCopy, 'yearstudy', StartstudyVal)
if (EndstudyVal !== '') studentsCopy = filter(studentsCopy, 'endStudyear', EndstudyVal)
  for (const student of studentsCopy) {
    tbody.append(createStudent(student))
  }
}

//Фильтрация
document.getElementById('formFilter').addEventListener('submit', function (event) {
  event.preventDefault() // отключаем отправку формы
  render(students)
})
//При нажатии на кнопку сортировки меняем направление сортировки

theadListThAll.forEach(element => {
  element.addEventListener('click', function () {
    column = this.dataset.column;
    columnDir = !columnDir
    render(students)
  })
})

//Добавление нового студента
document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault() // отключаем отправку формы
  students.push(new Student(
    document.getElementById('input-surname').value,
    document.getElementById('input-firstname').value,
    document.getElementById('input-secondname').value,
    document.getElementById('input-faculty').value,
    new Date(document.getElementById('input-date').value),
    Number(document.getElementById('input-year').value),
  ))
  localStorage.setItem('storageList', JSON.stringify(students));
  render(students)
})
render(students)

// Проверяем наличие данных в LocalStorage
let local = localStorage.getItem('storageList');
if (local) {
    students = JSON.parse(local);
    parseStudentList(students);
}

// Разбираю массив объектов и преобразую объект в массив данных (пригодится для фильтрации)
function parseStudentList(arr) {
  tbody.innerHTML = '';
  arr.forEach((Student) => {
      let abjArr = [];
      abjArr = Object.values(Student);
      const fullName =     abjArr
              .splice(0, 3).toString()
              .split(',').join(' ');
      abjArr.unshift(fullName);
      createStudent(Student);
      return abjArr;
  })
}
