export type RawProductDetailShortOptions = {
	
	name: string,
	
	segment: number,
	
	displayType: string,
	
	showOnWeb: boolean,
	
	selectedValue: {
		
		name: string,
		
		value: string
	
	},
	
	options: Array<{
		
		FabricFamily: string,
		
		ColorFamily: string,
		
		ValueType: string,
		
		Favorite: boolean,
		
		GroupCodeDescription: string,
		
		Attribute1Value: string,
		
		Attribute2Value: string,
		
		Attribute3Value: string,
		
		Attribute4Value: string,
		
		Attribute5Value: string,
		
		Attribute6Value: string,
		
		Attribute7Value: string,
		
		Attribute8Value: string,
		
		Attribute9Value: string,
		
		Attribute10Value: string,
		
		Attribute11Value: string,
		
		Attribute12Value: string,
		
		Attribute13Value: string,
		
		Attribute14Value: string,
		
		Attribute15Value: string,
		
		Attribute16Value: string,
		
		Attribute17Value: string,
		
		name: string,
		
		value: string,
		
		image: string
		
	}>,
	
	SKUChange: string,
	
	RuleName: string
	
}

export type RawProductDetailsOptions = RawProductDetailShortOptions & {
	
	selectedValue: {
		
		SKU: string,
		
		Construction: string,
		
		Content: string[],
		
		Color: string,
		
		Pattern: string,
		
		UOM: string,
		
		Grade: string,
		
		FabricCode: string,
		
		CleaningCode: string,
		
		Durability: string,
		
		FabricFamily: string,
		
		ColorFamily: string,
		
		Description: string,
		
		OutwardSKU: string,
		
		ValueType: string,
		
		Favorite: boolean,
		
		OutwardFabric: string,
		
		GroupCode: string,
		
		Comments: string,
		
		SwatchAvailable: string,
		
		Details: Array<{
			
			Heading: string,
			
			Content: string
			
		}>,
		
		GroupCodeDescription: string,
		
		name: string,
		
		value: string,
		
		image: string,
		
		skuSetType: string
		
	},
	
	Attribute1: string,
	
	Attribute2: string,
	
	Attribute3: string,
	
	Attribute4: string,
	
	Attribute5: string,
	
	Attribute6: string,
	
	Attribute7: string,
	
	Attribute8: string,
	
	Attribute9: string,
	
	Attribute10: string,
	
	Attribute11: string,
	
	Attribute12: string,
	
	Attribute13: string,
	
	Attribute14: string,
	
	Attribute15: string,
	
	Attribute16: string,
	
	Attribute17: string
	
}

/**
 * A class representing the schema of data returned by the Bassett Furniture API when product details are requested.
 *
 * All mis-spellings, grammatical mistakes, and otherwise errors are intentional - the schema below represents the exact
 * format in which data is returned from the Bassett Furniture API.
 */
export interface RawBassettFurnitureProductDetails {
	
	basicOptions: RawProductDetailsOptions[],
	
	// Unsure of the type of this object - have not found data for this yet.
	inlineOptions: RawProductDetailsOptions[],
	
	personalizeOptions: RawProductDetailsOptions[],
	
	// The first element is a full ProductDetailsOptions object, but subsequent elements are shortened
	// ProductDetailShortOptions objects.
	selectedOptions: [
		RawProductDetailsOptions,
		...RawProductDetailShortOptions[]
	],
	
	addToCart: boolean,
	
	addToWishList: boolean,
	
	SEODescr: string,
	
	description: string[],
	
	curatedImage: string,
	
	ctaImage: string,
	
	CareWidgetName: string,
	
	DeliveryWidgetName: string,
	
	heroImages: Array<{
		
		filename: string,
		
		alt: string,
		
		curatedTarget: boolean
		
	}>,
	
	promoMessages: string[],
	
	id: number,
	
	name: string,
	
	facebooktitle: string,
	
	sdesc: string,
	
	collection: string,
	
	sku: string,
	
	cartSku: string,
	
	"seo-title": string,
	
	price: number,
	
	MSRP: number,
	
	Savings: number,
	
	dispPrice: string,
	
	dispMSRP: string,
	
	dispSavings: string,
	
	savingsLabel: string,
	
	pricingMessage: string,
	
	deliveryMessageCd: string,
	
	inventoryMessageShort: string,
	
	inventoryMesageColor: string,
	
	inventoryMessageId: number,
	
	InventoryMessageTblId: number,
	
	Specifications: Array<{
		
		header: string,
		
		attributes: Array<{
			
			attribute: string,
			
			value: string,
			
			additionalInfo: string
			
		}>
		
	}>,
	
	FAQs: Array<{
		
		question: string,
		
		answer: string
		
	}>,
	
	qtyOptions: number,
	
	EPreviewLink: string,
	
	CanAddtoCart: boolean,
	
	InStockSw: string,
	
	ClearanceSw: string,
	
	Category: string,
	
	CollectionItems: Array<{
		
		id: number,
		
		sku: string,
		
		imageURL: string,
		
		deliveryMsgCd: string,
		
		url: string,
		
		listingSwatches: Array<{
			
			ImagePath: string,
			
			SortOrder: number
			
		}>,
		
		MSRP: number,
		
		price: number,
		
		dispPrice: string,
		
		pricePreText: string,
		
		showPricing: boolean,
		
		sdesc: string,
		
		collection: string,
		
		name: string
		
	}>,
	
	BrandImagePath: string,
	
	BrandImageAlt: string,
	
	webPageType: string,
	
	PDPURL: string,
	
	listingPageImageURL: string,
	
	OutwardImageName: string,
	
	OutwardImageExists: string,
	
	OutwardInitString: string,
	
	imageTimeStamp: number,
	
	DisplaySKU: string,
	
	BreadCrumbs: Array<{
		
		Text: string,
		
		Link: string
		
	}>,
	
	PerformanceData: {
		
		segs: Array<{
			
			name: string,
			
			renderTime: number
			
		}>,
		
		bPageLoad: boolean,
		
		szMode: string
		
	},
	
	PersonalizeSKU: string
	
}
