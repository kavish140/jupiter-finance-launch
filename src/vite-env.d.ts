/// <reference types="vite/client" />

import type { DetailedHTMLProps, HTMLAttributes } from "react";

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
