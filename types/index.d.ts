import 'types-package-json';

declare module 'types-package-json' {
	export interface PackageJson {
		private?: boolean;
		pages?: {
			url?: string;
		};
	}
}
