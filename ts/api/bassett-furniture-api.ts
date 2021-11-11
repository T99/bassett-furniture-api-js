import {
	RawBassettFurnitureProductDetails,
	RawProductDetailsOptions
} from "../schema/raw-bassett-furniture-product-details";
import { ProductSearchOptions, RawBassettFurnitureAPI } from "./raw-bassett-furniture-api";
import { BassettFurnitureProductDetails, HeroImageObject } from "../schema/bassett-furniture-product-details";
import { BassettFurnitureSimpleProduct, SwatchImageObject } from "../schema/bassett-furniture-simple-product";
import { SETTINGS, ValueOf } from "../settings";
import { RawSwatchImageObject } from "../schema/raw-bassett-furniture-simple-product";
import { RawBassettFurnitureSearchResult } from "../schema/raw-bassett-furniture-search-result";
import { BassettFurnitureSearchResult } from "../schema/bassett-furniture-search-result";

export class BassettFurnitureAPI {
	
	public static async getProducts(options: Partial<ProductSearchOptions>): Promise<BassettFurnitureSearchResult> {
		
		let refinedProducts: BassettFurnitureSimpleProduct[] = [];
		
		let rawProducts: RawBassettFurnitureSearchResult = await RawBassettFurnitureAPI.getProducts(options);
		
		for (let rawProduct of rawProducts.DBProducts) {
			
			refinedProducts.push({
				id: rawProduct.id,
				
				sku: rawProduct.sku,
				
				name: rawProduct.name,
				
				collection: rawProduct.collection,
				
				url: new URL(rawProduct.url, SETTINGS.baseURL).toString(),
				
				pricing: {
					
					standard: rawProduct.price,
					
					msrp: rawProduct.MSRP
					
				},
				
				images: {
					
					listing: rawProduct.imageURL,
					
					swatches: rawProduct.listingSwatches?.map(
						(obj: RawSwatchImageObject): SwatchImageObject => {
							
							return {
								
								url: new URL(obj.ImagePath, SETTINGS.baseURL).toString(),
								
								sortOrder: obj.SortOrder
								
							};
							
						}
					) ?? []
					
				}
			})
			
		}
		
		return {
			products: refinedProducts,
			pagination: {
				totalProducts: rawProducts.Pagination.Total_products,
				productMin: rawProducts.Pagination.Product_min,
				productMax: rawProducts.Pagination.Product_max,
				currentPage: rawProducts.Pagination.Current_page,
				totalPages: rawProducts.Pagination.Total_pages,
				previousPage: rawProducts.Pagination.Prev_page,
				nextPage: rawProducts.Pagination.Next_page
			},
			AppliedFacets: rawProducts.AppliedFacets,
			Currently_sorted_by: rawProducts.Currently_sorted_by,
			Sort_bys: rawProducts.Sort_bys,
			Facets: rawProducts.Facets
		};
	
	}
	
	public static async getAllProducts(): Promise<BassettFurnitureSearchResult> {
		
		return BassettFurnitureAPI.getProducts({ limit: "All" });
		
	}

	public static async getProductDetailsByID(productID: string): Promise<BassettFurnitureProductDetails> {
		
		let rawProductDetails: RawBassettFurnitureProductDetails = await RawBassettFurnitureAPI.getProductDetailsByID(productID);
		
		let refinedSpecifications: BassettFurnitureProductDetails["specifications"] = {};
		
		for (let specificationGroup of rawProductDetails.Specifications) {
			
			for (let attribute of specificationGroup.attributes) {
				
				let attributeName: string = attribute.attribute.toLowerCase();
				let attributeValue: string = attribute.value;
				
				// If any of these keywords are found in the attribute name of the specification...
				if (["height", "width", "depth", "dimension"].some((keyword: string): boolean => attributeName.includes(keyword))) {
					
					attributeValue = attributeValue.replace(/&quot;/g, " inches");
					
				}
				
				refinedSpecifications[attributeName] = attributeValue;
				
			}
			
		}
		
		let refinedOptions: BassettFurnitureProductDetails["options"] = {};
		
		let allOptions: RawProductDetailsOptions[] = [
			...rawProductDetails.basicOptions,
			...rawProductDetails.inlineOptions,
			...rawProductDetails.personalizeOptions
		];
		
		// This code makes me feel dirty
		for (let option of allOptions) {
			
			let name: string = option.name.toLowerCase();
			
			let attributeFields: string[] = [];
			
			for (
				let attributeIndex: number = 1;
				(option as any)[`Attribute${attributeIndex}`] !== undefined;
				attributeIndex++
			) attributeFields.push((option as any)[`Attribute${attributeIndex}`]);
			
			let options: ValueOf<BassettFurnitureProductDetails["options"]> = [];
			
			// Yep, that's right.
			for (let optionOption of option.options) {
				
				let additionalAttributes: { [attribute: string]: boolean } = {};
				
				for (let attributeIndex: number = 1; attributeIndex < attributeFields.length; attributeIndex++) {
					
					additionalAttributes[attributeFields[attributeIndex]] =
						((optionOption as any)[`Attribute${attributeIndex}Value`] === "Y");
					
				}
				
				if (optionOption.image !== undefined) {
					
					switch (option.displayType) {
						
						case "FINISH":
							optionOption.image = (new URL(optionOption.image, SETTINGS.finishImagesBaseURL)).toString();
							break;
						
						case "FABRIC":
							optionOption.image = (new URL(optionOption.image, SETTINGS.fabricImageBaseURL)).toString();
							break;
						
					}
					
				}
				
				options.push({
					
					name: optionOption.name,
					
					value: optionOption.value.toLowerCase(),
					
					image: optionOption.image ?? null,
					
					additionalAttributes
					
				})
				
			}
			
			refinedOptions[name] = options;
			
		}
		
		return {
		
			id: rawProductDetails.id,
			
			brand: rawProductDetails.BrandImageAlt,
			
			category: [
				...rawProductDetails.BreadCrumbs.map((value: { Text: string, Link: string }): string => value.Text),
				rawProductDetails.Category
			],
			
			productPageURL: (new URL(rawProductDetails.PDPURL, SETTINGS.productPageBaseURL)).toString(),
			
			names: {
				
				standard: rawProductDetails.name,
				
				facebook: rawProductDetails.facebooktitle,
				
				seo: rawProductDetails["seo-title"]
				
			},
			
			descriptions: {
				
				standard: rawProductDetails?.description?.join("\n"),
				
				short: rawProductDetails.sdesc,
				
				seo: rawProductDetails.SEODescr
				
			},
			
			skus: {
				
				standard: rawProductDetails.sku,
				
				display: rawProductDetails.DisplaySKU,
				
				cart: rawProductDetails.cartSku,
				
				personalize: rawProductDetails.PersonalizeSKU
				
			},
			
			pricing: {
				
				standard: rawProductDetails.price,
				
				msrp: rawProductDetails.MSRP
				
			},
			
			quantities: rawProductDetails.qtyOptions,
			
			inStock: rawProductDetails.InStockSw === "Y",
			
			onClearance: rawProductDetails.ClearanceSw === "Y",
			
			collection: {
				
				shortName: rawProductDetails.collection,
				
				fullName: rawProductDetails?.CollectionItems[0]?.collection,
				
				itemIDs: rawProductDetails?.CollectionItems?.map((item: { id: number }): number => item.id)
				
			},
			
			images: {
				
				curated: rawProductDetails.curatedImage,
				
				cta: rawProductDetails.ctaImage,
				
				listing: (new URL(rawProductDetails.listingPageImageURL, SETTINGS.productImagesBaseURL)).toString(),
				
				outward: rawProductDetails.OutwardImageName,
				
				brand: (rawProductDetails.BrandImagePath !== undefined ?
					(new URL(rawProductDetails.BrandImagePath, SETTINGS.productImagesBaseURL)).toString() :
					null
				),
				
				hero: rawProductDetails?.heroImages?.map((item: any): HeroImageObject => {
					
					return {
					
						url: (new URL(item.filename, SETTINGS.productImagesBaseURL)).toString(),
						
						alt: item.alt,
						
						isCuratedTarget: item.curatedTarget
					
					}
					
				})
				
			},
			
			specifications: refinedSpecifications,
			
			options: refinedOptions,
			
			faqs: rawProductDetails.FAQs
			
		};
	
	}
	
}
