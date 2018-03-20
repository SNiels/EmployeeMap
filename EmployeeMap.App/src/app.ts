/// <reference path='./app.d.ts' />
import * as models from 'models';
import * as cookies from 'js-cookie';
import EmployeeService from './api/EmployeesService';
import AreasService from './api/AreasService';
import { Employee } from 'models';

async function main() {
    const apiRoot = cookies.get('X-ApiRoot');
    let employeeService = new EmployeeService(apiRoot);
    let areasService = new AreasService(apiRoot);

    await loadEmployees(employeeService);
    await loadAreas(areasService);
    (document.querySelector('.employee-details form') as HTMLFormElement).addEventListener('submit', (e) => onEmployeeUpdateClick(e, employeeService));
    
    //try {
    //    employee.areaId = area.id;
    //    await employeeService.put(employee.id, employee);
    //} catch (e) {
    //    console.log(e);
    //}
}

async function loadEmployees(employeeService: EmployeeService) {
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

async function loadAreas(areasService: AreasService) {
    try {
        let areas = await areasService.getAll();
        let areasSelect = document.querySelector('[name="areaId"]');
        removeChildNodes(areasSelect);

        for (let area of areas) {
            let option = document.createElement('option');
            option.value = area.id.toString();
            option.text = area.name;
            areasSelect.appendChild(option);
        }
    } catch (e) {
        console.log(e);
        return;
    }
}

async function onEmployeeClick(e: Event, employeeService: EmployeeService) {
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

async function onEmployeeUpdateClick(e: Event, employeeService: EmployeeService) {
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

main();


if (DEV) {
    if (module.hot) {  
        module.hot.accept();  
    }  
}