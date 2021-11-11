import { RawBassettFurnitureSimpleProduct } from "../schema/raw-bassett-furniture-simple-product";
import { RawBassettFurnitureAPI } from "../api/raw-bassett-furniture-api";
import { RawBassettFurnitureSearchResult } from "../schema/raw-bassett-furniture-search-result";
import { BassettFurnitureProductDetails } from "../schema/bassett-furniture-product-details";
import { BassettFurnitureSearchResult } from "../schema/bassett-furniture-search-result";
import { BassettFurnitureAPI } from "../main";
import { SETTINGS } from "../settings";

export class BassettFurnitureAPIScraper {
	
	protected static async fetchAllProducts(): Promise<BassettFurnitureProductDetails[]> {
		
		let rawProducts: RawBassettFurnitureSimpleProduct[] = [];
		let pageCount: number = 1;
		
		for (let i: number = 1; i <= pageCount; i++) {
			
			let prod: RawBassettFurnitureSearchResult = await RawBassettFurnitureAPI.getProducts({
				page: i,
				limit: "All",
				sortOn: "Sort",
				sortDirection: "ASC"
			});
			
			prod;
			
			rawProducts;
			
		}
		
		return 1 as any;
		
	}

	public static async getAllProductPageIDs(): Promise<string[]> {
		
		let productIDs: string[] = [];
		let currentPage: number = 1;
		let totalPages!: number;
		
		let initialResult: BassettFurnitureSearchResult = await BassettFurnitureAPI.getProducts({
			limit: "All",
			page: currentPage++
		});
		
		totalPages = parseInt(initialResult.pagination.totalPages);
		
		for (let product of initialResult.products) {
			
			productIDs.push(product.url.substring(SETTINGS.baseURL.length));
			
		}
		
		let promises: Promise<any>[] = [];
		
		while (currentPage <= totalPages) {
			
			promises.push(new Promise<void>((resolve: () => void, reject: (error?: any) => void): void => {
				
				BassettFurnitureAPI.getProducts({
					limit: "All",
					page: currentPage++
				}).then((results: BassettFurnitureSearchResult): void => {
					
					for (let product of results.products) {
						
						productIDs.push(product.url.substring(SETTINGS.baseURL.length));
						
					}
					
					resolve();
					
				}).catch((error?: any) => reject(error));
				
			}));
			
		}
		
		await Promise.all(promises);
		
		return productIDs;
		
	}
	
	public static async getAllProductSKUs(): Promise<string[]> {
		
		let promises: Promise<RawBassettFurnitureSimpleProduct>[] = [];
		
		await Promise.all(promises);
		
		let skus: string[] = [];
		
		for (let promise of promises) skus.push((await promise).sku);
		
		return skus;
		
	}
	
}
