
declare module "models"{
	
	export interface Employee {
		
			id: number;
		
			firstName: string;
		
			lastName: string;
		
			areaId: number;
		
			area: Area;
		
			location: string;
		
	}
}