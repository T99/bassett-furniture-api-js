import http from "http";
import https from "https";
import { RawBassettFurnitureProductDetails } from "../schema/raw-bassett-furniture-product-details";
import { SETTINGS } from "../settings";
import { RawBassettFurnitureSearchResult } from "../schema/raw-bassett-furniture-search-result";

/**
 * The Bassett Furniture API, for some reason, returns JSON that contains a single key, 'd'. The value of this key is
 * a JSON string that, when parsed, provides the actual pertinent response data.
 */
type MultiLayerAPIObject = {
	
	d: string
	
}

export type ProductSearchOptions = {
	
	page: number,
	
	limit: number | "All",
	
	sortOn: "Sort" | "Depth" | "Height" | "Width" | "Price",
	
	sortDirection: "ASC" | "DESC"
	
}

export class RawBassettFurnitureAPI {
	
	public static getProducts(options: Partial<ProductSearchOptions>): Promise<RawBassettFurnitureSearchResult> {
		
		// Set defaults for the options object.
		options = {
			page: 1,
			limit: 100,
			sortOn: "Sort",
			sortDirection: "ASC",
			...options
		};
		
		// The API limits the number of products returned per-request if 'All' is not used.
		if (typeof options.limit === "number" && options.limit > 100) options.limit = 100;
		
		return new Promise<RawBassettFurnitureSearchResult>((resolve: (value: RawBassettFurnitureSearchResult) => void,
															   reject: (reason?: Error) => void): void => {
			
			let request: http.ClientRequest = https.request(
				new URL("NextopiaListing.asmx/Search", SETTINGS.baseURL),
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					}
				},
				(response: http.IncomingMessage): void => {
					
					let rawBody: string = "";
					
					response.on("data", (data: any): void => {
						
						rawBody += data;
						
					});
					
					response.on("end", (): void => {
						
						// Parse the outer JSON.
						let outerObject: MultiLayerAPIObject = JSON.parse(rawBody);
						
						// Parse and return the inner object.
						resolve(JSON.parse(outerObject.d) as RawBassettFurnitureSearchResult);
						
					});
					
					response.on("error", (): void => reject(new Error("Failed to build/receive response.")));
					
				}
			);
			
			request.write(JSON.stringify(options));
			
			request.end();
			
		});
	
	}

	public static getProductDetailsByID(productID: string): Promise<RawBassettFurnitureProductDetails> {
		
		return new Promise<RawBassettFurnitureProductDetails>((resolve: (value: RawBassettFurnitureProductDetails) => void,
															   reject: (reason?: Error) => void): void => {
			
			let request: http.ClientRequest = https.request(
				new URL(productID, SETTINGS.baseURL),
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-pdp-action": "init"
					}
				},
				(response: http.IncomingMessage): void => {
					
					let rawBody: string = "";
					
					response.on("data", (data: any): void => {
						
						rawBody += data;
						
					});
					
					response.on("end", (): void => {
						
						// Parse the outer JSON.
						let outerObject: MultiLayerAPIObject = JSON.parse(rawBody);
						
						// Parse and return the inner object.
						resolve(JSON.parse(outerObject.d).data.product as RawBassettFurnitureProductDetails);
						
						
					});
					
					response.on("error", (): void => reject(new Error("Failed to build/receive response.")));
					
				}
			);
			
			request.write("{}");
			
			request.end();
			
		});
	
	}
	
}
