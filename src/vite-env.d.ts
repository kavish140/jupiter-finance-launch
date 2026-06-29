/// <reference types="vite/client" />

import type { DetailedHTMLProps, HTMLAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ImportMetaEnv {
	readonly VITE_ADMIN_PAGE_PASSWORD?: string;
	readonly VITE_ADMIN_CREDENTIALS?: string;
}


declare global {
	namespace JSX {
		interface IntrinsicElements {
			"lite-youtube": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
				videoid: string;
				playlabel?: string;
				params?: string;
			};
		}
	}
}

export {};
