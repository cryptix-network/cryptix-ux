import { i18n } from './flow-ux.js';
import {
	html, css, CryptixDialog, CYTX,
	formatForMachine, formatForHuman
} from './cryptix-dialog.js';

class CryptixT9Dialog extends CryptixDialog{
	static get properties(){
		return {
			value:{type:String},
			heading:{type:String},
			inputLabel:{type:String}
		}
	}
	static get styles(){
		return [CryptixDialog.styles, css`
			.container{
				width:100%;height:100%;padding:0px;
				max-height:var(--cryptix-dialog-container-max-height, 600px);
			}
			flow-t9{width:215px;margin:auto;display:block;}
			.buttons{
				justify-content:center;margin:20px 0px;width:100%;
				box-sizing:border-box;
			}
			.buttons flow-btn {
				margin: 0px 18px;
			}
		`]
	}
	constructor(){
		super();
		window.showT9 = (args, callback)=>{
			this.open(args, callback)
		}
	}
	renderHeading(){
		return html`${this.renderBackBtn()} ${this.heading}`;
	}
	renderBody(){
		let value = this.value || '';
		let {inputLabel='Amount in CYTX'} = this;
		return html`
		<flow-input class="full-width" clear-btn value="${value}"
			label="${inputLabel}" readonly @changed=${this.onInputChange}>
		</flow-input>
		<flow-t9 value="${value}" @changed="${this.onT9Change}"></flow-t9>
		<div class="error">${this.errorMessage}</div>
		<div class="buttons">
			<flow-btn ?hidden=${!this.max} @click="${this.setMaxValue}" i18n>MAX</flow-btn>
			<flow-btn class="primary" @click="${this.sendBack}" i18n>DONE</flow-btn>
		</div>
		`;
	}
	setMaxValue(){
		this.value = this.max;
	}
	sendBack(e){
		this.callback({value:this.value, dialog:this})
	}
	onInputChange(e){
		this.value = e.detail.value;
	}
	onT9Change(e){
		this.value = e.detail.value;
	}
	open(args, callback){
		this.callback = callback;
		this.args = args;
		this.value = args.value||'';
		this.max = args.max||'';
		this.heading = args.title||args.heading||i18n.t('Amount');
		this.inputLabel = args.inputLabel||i18n.t('Amount in CYTX');
		this.show();
	}
    cancel(){
    	this.hide();
    }
}

CryptixT9Dialog.define("cryptix-t9-dialog");
