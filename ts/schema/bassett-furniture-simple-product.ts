export type SwatchImageObject = {
	
	url: string,
	
	sortOrder: number
	
}

export interface BassettFurnitureSimpleProduct {
	
	id: number,
	
	sku: string,
	
	name: string,
	
	collection: string,
	
	url: string,
	
	pricing: {
		
		standard: number,
		
		msrp: number
		
	},
	
	images: {
		
		listing: string,
		
		swatches: SwatchImageObject[]
		
	}
	
}
