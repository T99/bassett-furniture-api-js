export type RawSwatchImageObject = {
	ImagePath: string,
	SortOrder: number
}

export interface RawBassettFurnitureSimpleProduct {
	
	id: number,
	
	sku: string,
	
	imageURL: string,
	
	deliveryMsgCd: string,
	
	url: string,
	
	listingSwatches: RawSwatchImageObject[],
	
	deliveryMessage: null,
	
	MSRP: 979,
	
	price: 779,
	
	dispPrice: string,
	
	dispMSRP: string,
	
	teaser: string,
	
	couponMessages: null,
	
	pricePreText: string,
	
	saleLabel: null,
	
	saleLabelClass: null,
	
	priceClass: null,
	
	showPricing: true,
	
	sdesc: string,
	
	collection: string,
	
	name: string,
	
	salesCodes: null,
	
	percentDiscount: null,
	
	ListingPagePriceClass: null
	
}
