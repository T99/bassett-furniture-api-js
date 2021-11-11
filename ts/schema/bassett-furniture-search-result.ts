import { BassettFurnitureSimpleProduct } from "./bassett-furniture-simple-product";

export interface BassettFurnitureSearchResult {
	
	products: BassettFurnitureSimpleProduct[]
	
	pagination: {
		
		totalProducts: string,
		
		productMin: string,
		
		productMax: string,
		
		currentPage: string,
		
		totalPages: string,
		
		previousPage: string,
		
		nextPage: string
		
	};
	
	AppliedFacets: any[];
	
	Currently_sorted_by: string;
	
	Sort_bys: string;
	
	Facets: Array<{
		
		Name: string,
		
		DisplayName: string,
		
		Values: {
			
			Value: Array<{
				
				parent: null,
				
				Name: string,
				
				DisplayName: string,
				
				Checked: string,
				
				Num: string
				
			}>
			
		},
		
		Display: boolean,
		
		SortValue: number
		
	}>;
	
}
