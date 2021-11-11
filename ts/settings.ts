export type ValueOf<T> = T[keyof T];

export type BassettFurnitureAPISettings = {
	
	readonly baseURL: string,
	
	readonly productPageBaseURL: string,
	
	readonly productImagesBaseURL: string,
	
	readonly finishImagesBaseURL: string,
	
	readonly fabricImageBaseURL: string,
	
}

const baseURL: URL = new URL("https://www.bassettfurniture.com/");

const productPagesBaseURL: URL = new URL("/", baseURL);

const productImagesBaseURL: URL = new URL("/_images/catalog/product-images/", baseURL);

const finishImageBaseURL: URL = new URL("/_images/catalog/finish-images/", baseURL);

const fabricImageBaseURL: URL = new URL("/_images/catalog/fabric-images/", baseURL);

export const SETTINGS: BassettFurnitureAPISettings = {
	
	baseURL: baseURL.toString(),
	
	productPageBaseURL: productPagesBaseURL.toString(),
	
	productImagesBaseURL: productImagesBaseURL.toString(),
	
	finishImagesBaseURL: finishImageBaseURL.toString(),
	
	fabricImageBaseURL: fabricImageBaseURL.toString()
	
}
