import { RawBassettFurnitureSimpleProduct } from "./raw-bassett-furniture-simple-product";

export interface RawBassettFurnitureSearchResult {

	RaceToken: null;
		
	DBProducts: RawBassettFurnitureSimpleProduct[];
	
	Suggested_spelling: string;
	
	Custom_synonyms: {
		
		Synonym: any[]
		
	};
	
	Pagination: {
		
		Total_products: string,
		
		Product_min: string,
		
		Product_max: string,
		
		Current_page: string,
		
		Total_pages: string,
		
		Prev_page: string,
		
		Next_page: string
		
	};
	
	AppliedFacets: any[];
	
	Currently_sorted_by: string;
	
	Sort_bys: string;
	
	Notices: {
		
		Related_added: string,
		
		Sku_match: string,
		
		Or_switch: null,
		
		Added_metaphones: null
		
	};
	
	Merchandizing: {
		
		Html_code: string
		
	};
	
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
