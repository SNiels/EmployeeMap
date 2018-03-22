/// <reference path='./app.d.ts' />
import EmployeeService from './api/EmployeesService';
import AreasService from './api/AreasService';
import { Employee } from 'models';
import  {loadAreas, loadEmployees, onEmployeeUpdateClick, onEmployeeCreateClick, onAreaCreateClick} from './forms';

async function main() {
    const apiRoot = document.querySelector('meta[name="apiRoot"]').getAttribute('content');
    let employeeService = new EmployeeService(apiRoot);
    let areasService = new AreasService(apiRoot);

    await loadEmployees(employeeService);
    await loadAreas(areasService);
    (document.querySelector('.employee-details form') as HTMLFormElement).addEventListener('submit', (e) => onEmployeeUpdateClick(e, employeeService));
    (document.querySelector('.employee-create form') as HTMLFormElement).addEventListener('submit', (e) => onEmployeeCreateClick(e, employeeService));
    (document.querySelector('.area-create form') as HTMLFormElement).addEventListener('submit', (e) => onAreaCreateClick(e, areasService));
}

main();

if (DEV) {
    if (module.hot) {  
        module.hot.accept();  
    }  
}