import EmployeeService from './api/EmployeesService'
import AreasService from './api/AreasService'
import { Employee, Area } from 'models';

export async function loadEmployees(employeeService: EmployeeService) {
    try {
        let employees = await employeeService.getAll();
        let employeeList = document.getElementsByClassName("employees-list")[0];
        removeChildNodes(employeeList);

        for (let employee of employees) {
            let listItem = document.createElement('li');
            let listItemLink = document.createElement('a');
            listItemLink.text = `${employee.firstName} ${employee.lastName}`;
            listItemLink.setAttribute('data-employee-id', employee.id.toString());
            listItemLink.href = '#';

            listItemLink.addEventListener('click', (e) => onEmployeeClick(e, employeeService));
            listItem.appendChild(listItemLink);
            employeeList.appendChild(listItem);
        }
    } catch (e) {
        console.log(e);
        return;
    }
}

export async function onEmployeeClick(e: Event, employeeService: EmployeeService) {
    e.preventDefault();
    let employeeId = parseInt((e.target as Element).getAttribute('data-employee-id'));
    let employee = await employeeService.get(employeeId);

    let form = document.querySelector('.employee-details form') as HTMLFormElement;
    let idField = form.querySelector('[name="id"]') as HTMLInputElement;
    let firstNameField = form.querySelector('[name="firstName"]') as HTMLInputElement;
    let lastNameField = form.querySelector('[name="lastName"]') as HTMLInputElement;
    let areaField = form.querySelector('[name="areaId"]') as HTMLInputElement;
    let locationField = form.querySelector('[name="location"]') as HTMLInputElement;

    idField.value = employee.id.toString();
    firstNameField.value = employee.firstName;
    lastNameField.value = employee.lastName;
    areaField.value = employee.areaId.toString();
    locationField.value = employee.location;

    form.parentElement.style.display = 'block';
}

export async function onEmployeeUpdateClick(e: Event, employeeService: EmployeeService) {
    e.preventDefault();
    let form = document.querySelector('.employee-details form') as HTMLFormElement;
    let employee = formToObject<Employee>(form);

    try {
        await employeeService.put(employee.id, employee);
        alert('Employee updated!');
    } catch (ex) {
        console.log(ex);
        alert('Employee update failed');
    }
}

export async function onEmployeeCreateClick(e: Event, employeeService: EmployeeService) {
    e.preventDefault();
    let form = document.querySelector('.employee-create form') as HTMLFormElement;
    let employee = formToObject<Employee>(form);

    try {
        await employeeService.post(employee);
        alert('Employee created!');
    } catch (ex) {
        console.log(ex);
        alert('Employee create failed');
    }
}

export async function onAreaCreateClick(e: Event, areasService: AreasService) {
    e.preventDefault();
    let form = document.querySelector('.area-create form') as HTMLFormElement;
    let employee = formToObject<Area>(form);

    try {
        await areasService.post(employee);
        alert('Area created!');
    } catch (ex) {
        console.log(ex);
        alert('Area create failed');
    }
}

export async function loadAreas(areasService: AreasService) {
    try {
        let areas = await areasService.getAll();
        let areasSelects = document.querySelectorAll('[name="areaId"]');
        for(let areaSelect of <Element[]><any>areasSelects){
            removeChildNodes(areaSelect);
            for (let area of areas) {
                let option = document.createElement('option');
                option.value = area.id.toString();
                option.text = area.name;
                areaSelect.appendChild(option);
            }
        } 
    } catch (e) {
        console.log(e);
        return;
    }
}

function removeChildNodes(element: Element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function formToObject<T>(form) {
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if (name) {
            obj[name] = value;
        }
    }
    return obj as T;
}