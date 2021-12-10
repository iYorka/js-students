(function () {
    document.addEventListener('DOMContentLoaded', function () {
        createInputForm = function () {
            inputForm = document.getElementById('input-form');
            form = document.createElement('form');
            form.classList.add('row', 'g-3');

            divFIO = document.createElement('div');
            divFIO.classList.add('input-group');

            span = document.createElement('span');
            span.classList.add('input-group-text');
            span.textContent = 'ФИО:';
            divFIO.append(span);

            inputName = document.createElement('input');
            inputName.type = 'text';
            inputName.setAttribute('aria-label', 'Имя');
            inputName.classList.add('form-control');
            inputName.placeholder = 'Имя';
            inputName.id = 'name';
            divFIO.append(inputName);

            inputSurname = document.createElement('input');
            inputSurname.type = 'text';
            inputSurname.setAttribute('aria-label', 'Фамилия');
            inputSurname.classList.add('form-control');
            inputSurname.placeholder = 'Фамилия';
            inputSurname.id = 'surname';
            divFIO.append(inputSurname);

            inputMidname = document.createElement('input');
            inputMidname.type = 'text';
            inputMidname.setAttribute('aria-label', 'Отчество');
            inputMidname.classList.add('form-control');
            inputMidname.placeholder = 'Отчество';
            inputMidname.id = 'midname';
            divFIO.append(inputMidname);



            divInfo = document.createElement('div');
            divInfo.classList.add('input-group');

            spanDate = document.createElement('span');
            spanDate.classList.add('input-group-text');
            spanDate.textContent = 'Дата рождения:';
            divInfo.append(spanDate);

            inputDate = document.createElement('input');
            inputDate.type = 'date';
            inputDate.classList.add('form-control', 'date-width');
            inputDate.format = 'yyyy';
            inputDate.id = 'date';
            divInfo.append(inputDate);


            span = document.createElement('span');
            span.classList.add('input-group-text');
            span.textContent = 'Год поступления:';
            divInfo.append(span);

            inputEdStart = document.createElement('input');
            inputEdStart.type = 'text';
            inputEdStart.classList.add('form-control', 'date-picker-year', 'date-width');
            inputEdStart.autocomplete = 'off';
            inputEdStart.placeholder = 'ГГГГ';
            inputEdStart.id = 'edstart';
            inputEdStart.size = 4;

            divInfo.append(inputEdStart);

            inputFaculty = document.createElement('input');
            inputFaculty.type = 'text';
            inputFaculty.classList.add('form-control');
            inputFaculty.placeholder = 'Факультет';
            inputFaculty.id = 'faculity';
            divInfo.append(inputFaculty);

            buttonSubmit = document.createElement('button');
            buttonSubmit.classList.add('btn', 'btn-secondary');
            buttonSubmit.textContent = 'Добавить студента';
            buttonSubmit.setAttribute('data-bs-container', "body");
            buttonSubmit.setAttribute('data-bs-toggle', "popover");
            buttonSubmit.setAttribute('data-bs-placement', "bottom");
            buttonSubmit.title = "Popover title";
            buttonSubmit.setAttribute('data-bs-trigger', "hover");
            buttonSubmit.classList.add('popover-dismiss');


            divInfo.append(buttonSubmit);

            form.append(divFIO);
            form.append(divInfo);
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                let allRight = true;
                let msgList = [];
                if (inputName.value.trim().length === 0) {
                    msgList.push('Необходимо указать имя!');
                    allRight = false;
                };
                if (inputSurname.value.trim().length === 0) {
                    msgList.push('Необходимо указать фамилию!');
                    allRight = false;
                };
                if (inputMidname.value.trim().length === 0) {
                    msgList.push('Необходимо указать Отчетсво!');
                    allRight = false;
                };
                if (inputDate.value.trim().length === 0) {
                    msgList.push('Необходимо указать дату рождения!');
                    allRight = false;
                };
                if (inputEdStart.value.trim().length === 0) {
                    msgList.push('Необходимо указать год поступления!');
                    allRight = false;
                };
                if (inputFaculty.value.trim().length === 0) {
                    msgList.push('Необходимо указать факультет!');
                    allRight = false;
                };
                buttonSubmitPopover = bootstrap.Popover.getInstance(buttonSubmit);
                if (buttonSubmitPopover) {
                    buttonSubmitPopover.dispose();
                }
                if (!allRight) {
                    buttonSubmit.title = "Не заполнены обязательные поля";
                    msg = msgList.join('\n');
                    // buttonSubmitPopover.content = ;
                    buttonSubmit.setAttribute('data-bs-content', msg);

                    let buttonSubmitPopover = new bootstrap.Popover(buttonSubmit);
                    // buttonSubmitPopover.disable();
                    // buttonSubmitPopover.enable();
                    buttonSubmitPopover.show();
                } else {
                    let studentsList = localStorage.getItem('studentsList');
                    studentsListArray = JSON.parse(studentsList);
                    if (!Array.isArray(studentsListArray)) { let studentsListArray = [] };
                    studentsListArray.push({ name: inputName.value, surname: inputSurname.value, midname: inputMidname.value, date: inputDate.value, edstart: inputEdStart.value, faculity: inputFaculty.value });
                    localStorage.setItem('studentsList', JSON.stringify(studentsListArray));
                    createTable(filter, sortField);
                }
            });
            inputForm.append(form);

        }
        let timer;
            let filter = [];
            let sortField = '';
        function createTableHead() {
            
            function addFilter(event){
                clearTimeout(timer);
                // console.log(filterName.value);
                inputDelay = function () {
                    if (event.target.value) {
                        filter = [...filter.filter(el => el.field != event.target.id), { field: event.target.id, value: event.target.value }];
                    }
                    else {
                        filter = [...filter.filter(el => el.field != event.target.id)];
                    }
                    createTable(filter, sortField);
                    event.target.focus();
                };
                timer = setTimeout(inputDelay, 500);
            }
            form = document.createElement('div');
            form.classList.add('input-form', 'table-padding');

            filterForm = document.createElement('div');
            filterForm.classList.add('input-group');

            filterSpan = document.createElement('label');
            filterSpan.classList.add('col-form-label', 'col-1', 'input-group-text');
            filterSpan.textContent = 'Фильтры:';
            filterForm.append(filterSpan);

            filterNameDiv = document.createElement('div');
            filterNameDiv.classList.add('col-2');
            filterName = document.createElement('input');
            filterName.placeholder = 'Фильтр по имени';
            filterName.classList.add('form-control');            
            filterName.id = 'name';
            filterName.addEventListener('input', addFilter);
            filterNameDiv.append(filterName);

            filterSurnameDiv = document.createElement('div');
            filterSurnameDiv.classList.add('col-2');
            filterSurname = document.createElement('input');
            filterSurname.placeholder = 'По фамилии';
            filterSurname.classList.add('form-control');
            filterSurname.id = 'surname';
            filterSurname.addEventListener('input', addFilter);
            filterSurnameDiv.append(filterSurname);

            filterMidnameDiv = document.createElement('div');
            filterMidnameDiv.classList.add('col-2');
            filterMidname = document.createElement('input');
            filterMidname.placeholder = 'По Отчеству';
            filterMidname.classList.add('form-control');
            filterMidname.id = 'midname';
            filterMidname.addEventListener('input', addFilter);
            filterMidnameDiv.append(filterMidname);

            filterDateDiv = document.createElement('div');
            filterDateDiv.classList.add('col-2');
            filterDate = document.createElement('input');
            filterDate.type = 'date';
            filterDate.placeholder = 'По дате';
            filterDate.classList.add('form-control');
            filterDate.id = 'date';
            filterDate.addEventListener('input', addFilter);
            filterDateDiv.append(filterDate);

            filterEdStartDiv = document.createElement('div');
            filterEdStartDiv.classList.add('col-1');
            filterEdStart = document.createElement('input');
            filterEdStart.placeholder = 'По году';
            filterEdStart.classList.add('form-control');
            filterEdStart.id = 'edstart';
            filterEdStart.addEventListener('input', addFilter);
            filterEdStartDiv.append(filterEdStart);

            filterFaculityDiv = document.createElement('div');
            filterFaculityDiv.classList.add('col-2');
            filterFaculity = document.createElement('input');
            filterFaculity.placeholder = 'По факультету';
            filterFaculity.classList.add('form-control');
            filterFaculity.id = 'faculity';
            filterFaculity.addEventListener('input', addFilter);
            filterFaculityDiv.append(filterFaculity);

            filterForm.append(filterNameDiv);
            filterForm.append(filterSurnameDiv);
            filterForm.append(filterMidnameDiv);
            filterForm.append(filterDateDiv);
            filterForm.append(filterEdStartDiv);
            filterForm.append(filterFaculityDiv);

            form.append(filterForm);


            //всегде будем выводить шапку таблицы.
            table = document.createElement('table');
            table.id = 'table';
            table.classList.add('table', 'table-hover');
            thead = document.createElement('thead');
            thead.classList.add('table-dark');
            tr = document.createElement('tr');

            thName = document.createElement('th');
            thName.classList.add('col-2');
            thName.scope = 'col';
            thName.textContent = 'Имя учащегося';
            thName.addEventListener('click', function () {
                sortField = 'name';
                createTable(filter, sortField);
            });

            thSurname = document.createElement('th');
            thSurname.classList.add('col-2');
            thSurname.scope = 'col';
            thSurname.textContent = 'Фамилия';
            thSurname.addEventListener('click', function () {
                sortField = 'surname';
                createTable(filter, sortField);
            });
            thMidname = document.createElement('th');
            thMidname.classList.add('col-2');
            thMidname.scope = 'col';
            thMidname.textContent = 'Отчество';
            thMidname.addEventListener('click', function () {
                sortField = 'midname';
                createTable(filter, sortField);
            });
            thDate = document.createElement('th');
            thDate.classList.add('col-1');
            thDate.scope = 'col';
            thDate.textContent = 'Дата рождения';
            thDate.addEventListener('click', function () {
                sortField = 'date';
                createTable(filter, sortField);
            });
            thEdStart = document.createElement('th');
            thEdStart.classList.add('col-1');
            thEdStart.scope = 'col';
            thEdStart.textContent = 'Год поступления';
            thEdStart.addEventListener('click', function () {
                sortField = 'edstart';
                createTable(filter, sortField);
            });
            thFaculity = document.createElement('th');
            thFaculity.classList.add('col-2');
            thFaculity.scope = 'col';
            thFaculity.textContent = 'Факультет';
            thFaculity.addEventListener('click', function () {
                sortField = 'faculity';
                createTable(filter, sortField);
            });


            tr.append(thName);
            tr.append(thSurname);
            tr.append(thMidname);
            tr.append(thDate);
            tr.append(thEdStart);
            tr.append(thFaculity);

            thead.append(tr);

            table.append(thead);
        }

        function createTable(filters = [], sortField = '') {
            let studentsList = localStorage.getItem('studentsList');
            studentsListArray = JSON.parse(studentsList);

            tableForm = document.getElementById('table-form');
            if (tableForm.querySelector('#table')) {
                tableForm.querySelector('#table').removeChild(tableForm.querySelector('tbody'));
            }
            // форма           

            if (Array.isArray(studentsListArray)) {
                if (sortField) {
                    newStudentsListArray = studentsListArray.slice().sort((a, b) => a[sortField].toLowerCase() > b[sortField].
                        toLowerCase() ? 1 : -1);
                }
                else {
                    newStudentsListArray = studentsListArray.slice();
                };
                if (filters.length) {
                    newStudentsListArray = newStudentsListArray.slice().filter(el => {
                        for (currentFilter of filters) {
                            if (el[currentFilter.field].toLowerCase().indexOf(currentFilter.value.toLowerCase()) != -1) return true;
                        }
                        return false;
                    });
                }
                tbody = document.createElement('tbody');
                let pos = 0;
                for (currentStuden of newStudentsListArray) {
                    tr = document.createElement('tr');

                    tdName = document.createElement('td');
                    tdName.textContent = currentStuden.name;

                    tdSurname = document.createElement('td');
                    tdSurname.textContent = currentStuden.surname;

                    tdMidname = document.createElement('td');
                    tdMidname.textContent = currentStuden.midname;

                    tdDate = document.createElement('td');
                    tdDate.textContent = currentStuden.date;

                    tdEdStart = document.createElement('td');
                    tdEdStart.textContent = currentStuden.edstart;

                    tdFaculity = document.createElement('td');
                    tdFaculity.textContent = currentStuden.faculity;

                    tr.append(tdName);
                    tr.append(tdSurname);
                    tr.append(tdMidname);
                    tr.append(tdDate);
                    tr.append(tdEdStart);
                    tr.append(tdFaculity);
                    tbody.append(tr);
                }
                table.append(tbody);
            }

            form.append(table);
            tableForm.append(form);

        }


        createInputForm();
        createTableHead();
        createTable();

        $('.date-picker-year').datepicker({
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy',
            onClose: function (dateText, inst) {
                let year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).datepicker('setDate', new Date(year, 1));
            }
        });
        $(".date-picker-year").focus(function () {
            $(".ui-datepicker-month").hide();
        });
        $(".date-picker-year").datepicker({
            format: 'yyyy',
            todayHighlight: true,
            autoclose: true,
            minViewMode: 2
        });
    })
}())