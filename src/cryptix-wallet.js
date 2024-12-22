export * from './flow-ux.js';

import {CryptixWalletDesktop} from './cryptix-wallet-desktop.js';
import {CryptixWalletMobile, isMobile, dontInitiatedComponent} from './cryptix-wallet-mobile.js';

if(isMobile)
	document.body.classList.add('is-mobile');
export {isMobile}

export const CryptixWallet = isMobile ? CryptixWalletMobile : CryptixWalletDesktop;

if(!dontInitiatedComponent)
	CryptixWallet.define("cryptix-wallet");
