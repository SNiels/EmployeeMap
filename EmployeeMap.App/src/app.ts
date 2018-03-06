/// <reference path='./app.d.ts' />
import * as models from 'models';
import * as cookies from 'js-cookie';
import EmployeeService from './api/EmployeesService';
import AreasService from './api/AreasService';

async function main() {
    const apiRoot = cookies.get('X-ApiRoot');
    let employeeService = new EmployeeService(apiRoot);
    let areasService = new AreasService(apiRoot);
    let employee, area;

    try {
        let employees = await employeeService.getAll()
        employee = employees.filter(e => e.firstName === 'Niels')[0];
    } catch (e) {
        console.log(e);
        return;
    }

    try {
        let areas = await areasService.getAll()
        area = areas[0];
    } catch (e) {
        console.log(e);
        return;
    }

    try {
        employee.areaId = area.id;
        await employeeService.put(employee.id, employee);
    } catch (e) {
        console.log(e);
    }
}

main();


if (DEV) {
    if (module.hot) {  
        module.hot.accept();  
    }  
}