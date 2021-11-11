export type HeroImageObject = {
	
	url: string,
	
	alt: string,
	
	isCuratedTarget: boolean
	
}

export interface BassettFurnitureProductDetails {
	
	id: number,
	
	brand: string,
	
	category: string[],
	
	productPageURL: string,
	
	names: {
		
		standard: string,
		
		facebook: string,
		
		seo: string,
		
	},
	
	descriptions: {
		
		standard: string,
		
		short: string,
		
		seo: string
		
	}
	
	skus: {
		
		standard: string,
		
		display: string,
		
		cart: string,
		
		personalize: string
		
	},
	
	pricing: {
		
		standard: number,
		
		msrp: number
		
	},
	
	quantities: number,
	
	inStock: boolean,
	
	onClearance: boolean,
	
	collection: {
		
		shortName: string,
		
		fullName: string,
		
		itemIDs: number[]
		
	},
	
	images: {
		
		curated: string,
		
		cta: string,
		
		listing: string,
		
		outward: string,
		
		brand: string | null,
		
		hero: HeroImageObject[]
		
	},
	
	specifications: {
		
		[specification: string]: string
		
	},
	
	options: {
		
		[option: string]: Array<{
			
			name: string,
			
			value: string,
			
			image: string | null,
			
			additionalAttributes: {
				
				[additionalAttribute: string]: boolean
				
			}
			
		}>
		
	},
	
	faqs: Array<{
		
		question: string,
		
		answer: string
		
	}>
	
}
