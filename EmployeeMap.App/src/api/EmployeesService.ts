
import * as models from "models";


export default class EmployeesService {
    constructor(private apiRoot: string) {}
	
    public async getAll() : Promise<models.Employee[]> {
        let response = await fetch(`${this.apiRoot}Employees`, {
            method: "get", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
        });
        return <models.Employee[]> await response.json();
    }
    
    public async get(id: number) : Promise<models.Employee> {
        let response = await fetch(`${this.apiRoot}Employees/${id}`, {
            method: "get", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
        });
        return <models.Employee> await response.json();
    }
    
    public async post(employee: models.Employee) : Promise<models.Employee> {
        let response = await fetch(`${this.apiRoot}Employees`, {
            method: "post", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        return <models.Employee> await response.json();
    }
    
    public async put(id: number, employee: models.Employee) : Promise<models.Employee> {
        let response = await fetch(`${this.apiRoot}Employees/${id}`, {
            method: "put", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        return <models.Employee> await response.json();
    }
    
    public async delete(id: number) : Promise<void> {
        let response = await fetch(`${this.apiRoot}Employees/${id}`, {
            method: "delete", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
        });
        return <void> await response.json();
    }
    
}
