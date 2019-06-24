import m from 'mithril';

export default class SELF {

	/**
	 * アニメーションを提供する
	 *
	 *
	 *	例
	 *		animation1 = new Animation(["animated","bounce"]);
	 *		animation2 = new Animation("animated bounce");
	 *
	 *	@param	cssClasses	{array|string}		アニメーション用の CSS クラス 
	 *
	 */
	constructor(cssClasses){
		console.log("constructor %o", cssClasses);

		if( typeof(cssClasses) == 'string' ){
			cssClasses = cssClasses.trim().split(/\s/);
		}

		this.currentCssClasses = cssClasses;
		this.currentDom =  null;
	}

	/**
	 * アニメーションを利用できるようにする
	 *
	 *	mithril の oncreate() メソッドに追加してください。
	 *	アニメーションを使用できるように、DOM にイベント等を追加します。
	 *
	 *	例
	 *		<span oncreate={ (vnode)=>{ animation.create(vnode) } } >target</span>
	 *
	 *	@param	vnode	{object}		vnode
	 *
	 */
	create(vnode){
		console.log("create %o", vnode );
		this.currentDom = vnode.dom;
	}
	
	/**
	 * アニメーションを開始(点火)します
	 *
	 *
	 *	@param	vnode	{object}		vnode
	 *
	 */
	run(vnode = null){
		console.log("run %o", vnode );

		if(vnode){
			this.currentDom = vnode.dom;
		}

		this.currentDom.addEventListener("animationend", ()=>{ this._removeClass() } );

		this._addClass();

	}

	
	/**
	 * アニメーションを作成し、そのまま実行する。実行後 DOMを削除する。
	 *
	 *	mithril の oncreate() メソッドに追加してください。
	 *	アニメーションを使用できるように、DOM にイベント等を追加します。
	 *
	 *	例
	 *		<span oncreate={ (vnode)=>{ animation.create(vnode) } } >target</span>
	 *
	 *	@param	vnode	{object}		vnode
	 *
	 */
	runbeforeremove(vnode = null){
		console.log("runbeforeremove %o", vnode );
		
		if(vnode){
			this.currentDom = vnode.dom;
		}

		this._addClass();
		
		return new Promise( (resolve)=>{
			this.currentDom.addEventListener("animationend", resolve );
		});

	}

	
	_addClass(){
		console.log("_addClass");
		
		// class を追加
		for(let c of this.currentCssClasses ){
			this.currentDom.classList.add(c);
		}

	}

	_removeClass(){
		console.log("_removeClass");

		// class を削除
		for(let c of this.currentCssClasses ){
			this.currentDom.classList.remove(c);
		}

	}


}

