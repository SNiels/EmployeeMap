
import * as models from "models";


export default class AreasService {
    constructor(private apiRoot: string) {}
	
    public async getAll() : Promise<models.Area[]> {
        let response = await fetch(`${this.apiRoot}Areas`, {
            method: "get", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
        });
        return <models.Area[]> await response.json();
    }
    
    public async get(id: number) : Promise<models.Area> {
        let response = await fetch(`${this.apiRoot}Areas/${id}`, {
            method: "get", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
        });
        return <models.Area> await response.json();
    }
    
    public async post(area: models.Area) : Promise<void> {
        let response = await fetch(`${this.apiRoot}Areas`, {
            method: "post", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(area)
        });
        return <void> await response.json();
    }
    
    public async put(id: number, area: models.Area) : Promise<void> {
        let response = await fetch(`${this.apiRoot}Areas/${id}`, {
            method: "put", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(area)
        });
        return <void> await response.json();
    }
    
    public async delete(id: number) : Promise<void> {
        let response = await fetch(`${this.apiRoot}Areas/${id}`, {
            method: "delete", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
        });
        return <void> await response.json();
    }
    
}
