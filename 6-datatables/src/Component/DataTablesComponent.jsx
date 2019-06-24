import m from 'mithril';
import stream from 'mithril/stream';

export default class SELF {


	constructor (){
		//console.log("DataTables - constructor");

		/**
		 * 検索用文字列 query
		 */
		this.q = "";

		/**
		 * 表示件数の制限 開始レコード
		 * 		SQL の OFFSET に相当
		 * 		MongoDB の skip に相当
		 */
		this.skip = 0;

		/**
		 * 表示件数の制限 最大件数
		 * 		SQL の LIMIT に相当
		 * 		MongoDB の limit に相当
		 */
		this.limit = 25;


		/**
		 * 総レコード数
		 * 		SQL では SELECT COUTN(*) FROM table で取得した件数
		 * 		MongoDB では filter 条件無しで count で取得した件数
		 */
		this.total = 0;

		/**
		 * マッチしたレコード数
		 * 		SQL では SELECT COUTN(*) FROM table WHERE .... で取得した件数
		 * 		MongoDB では filter 条件をつけて count で取得した件数
		 */
		this.filtered = 0;


		/**
		 * データ本体
		 * 		配列
		 */
		this.data = [];

		/**
		 * データを取得するときのためのコールバック関数
		 */
		this.fetch = null;		// 

		/**
		 * メイン テーブル <table> のレンダリング関数
		 */
		this.MainTable = null;		// 

	}

	

	reload(){
		//console.log("DataTables - reload");
		this.callFetch();
	}


	oninit(vnode){
		//console.log("DataTables - oninit");
		this.callFetch();
	}


	callFetch(){
		//console.log("callFetch - oninit");

		if( typeof(this.fetch) == 'function' ) {
			let result = this.fetch(this);
			result.then( (value)=>{

				//console.log(" *** then %o", this);

				if(! ( value.data === undefined || value.data === null) ){
					//console.log("  - data");
					this.data = value.data;
				}
				if(! ( value.total === undefined || value.total === null) ){
					//console.log("  - total");
					this.total = value.total;
				}
				if(! ( value.filtered === undefined || value.filtered === null) ){
					//console.log("  - filtered");
					this.filtered = value.filtered;
				}
				m.redraw();
			} );



		}

	}




	/**
	 *	検索 キー入力がされたとき
	 *
	 *
	 */
	onKeypress(sender){
		//console.log("DataTables - onKeypress");

		if(sender.which == 13){
			/* enter(keyCode 13) が押されたとき */
			sender.preventDefault();
			this.onEnterKeyword(sender);
		}else{

		}

	}

	onEnterKeyword(sender){
		//console.log("DataTables - **** onEnterKeyword");

		this.skip = 0;
		this.callFetch();
	}




	/**
	 * Paginator がクリックされたとき
	 *
	 *	ページ変更の処理をおこなう
	 *
	 */
	onPaginatorClick(sender){
		//console.log("DataTables - **** onPaginatorClick");
		sender.preventDefault();

		let page = sender.currentTarget.getAttribute("data-page");
		//console.log("  - next page :" + page );

		if(page === undefined || page === null){
			//console.log("  - unknown page (bug?)");
		}else{
			this.skip = page * this.limit;
			this.callFetch();
		}

	}

	/**
	 * Paginator のレンダリングを行う
	 *
	 *
	 *
	 */
	pagination(){
		//console.log("DataTables - pagination");

		let page = Math.ceil( this.skip / this.limit );
		let pages = Math.ceil( this.filtered / this.limit );
		let buttons = this._numbers(page, pages);

		//console.log("  - page: " + page);
		//console.log("  - pages: " + pages);
		//console.log("  - buttons: " + buttons.join(", ") );

		// ----

		return (
			<div class="text-right" >
				<ul class="pagination d-flex justify-content-end">

					{
						buttons.map( (value)=>{

							if( value == 'ellipsis' ){

								return(
									<li class="page-item ellipsis disabled">
										<a class="page-link" href="#"  >&#x2026;</a>
									</li>
								);

							}else if( value == 'first' ){

								let buttonClass;
								if( page > 0 ){ 
									buttonClass = '';
								}else{
									buttonClass = ' disabled';
								}

								return(
									<li class={ "page-item first " + buttonClass } >
										<a class="page-link" href="#" data-page={0} onclick={ (sender)=>{this.onPaginatorClick(sender)} } >First</a>
									</li>
								);

							}else if( value == 'previous' ){

								let buttonClass;
								if( page > 0 ){ 
									buttonClass = '';
								}else{
									buttonClass = ' disabled';
								}

								return(
									<li class={ "page-item previous " + buttonClass } >
										<a class="page-link" href="#" data-page={page-1} onclick={ (sender)=>{this.onPaginatorClick(sender)} } >Previous</a>
									</li>
								);

							}else if( value == 'next' ){

								let buttonClass;
								if( page < pages-1 ){ 
									buttonClass = '';
								}else{
									buttonClass = ' disabled';
								}

								return(
									<li class={ "page-item next " + buttonClass } >
										<a class="page-link" href="#" data-page={page+1} onclick={ (sender)=>{this.onPaginatorClick(sender)} } >Next</a>
									</li>
								);

							}else if( value == 'last' ){

								let buttonClass;
								if( page < pages-1 ){ 
									buttonClass = '';
								}else{
									buttonClass = ' disabled';
								}

								return(
									<li class={ "page-item last " + buttonClass } >
										<a class="page-link" href="#" data-page={pages-1} onclick={ (sender)=>{this.onPaginatorClick(sender)} } >Last</a>
									</li>
								);

							}else{

								let buttonClass;
								if( page == value ){ 
									buttonClass = ' active';
								}else{
									buttonClass = '';
								}

								return(
									<li class={ "page-item " + buttonClass } >
										<a class="page-link" href="#" data-page={value} onclick={ (sender)=>{this.onPaginatorClick(sender)} } >{ parseInt(value) + 1 }</a>
									</li>
								);

							}

						})
					}
				</ul>
			</div>

		);



	}



	/**
	 * どのボタンを描写するかを決める元となるデータを作成する
	 *
	 *		返すデータは 次のような配列形式でデータを返します。
	 *		["previous", 0, 1, 2, "next"]
	 *
	 *			- first : 最初へボタン
	 *			- previous : 戻るボタン
	 *			- next : 次へボタン
	 *			- last : 最後へボタン
	 *			- ellipsis : 次"..." の省略ボタン
	 *			- 数値 : ページ番号 (0から始まるページ番号)
	 *
	 *	@param		{number}	page	現在のページ番号 (0から始まるページ番号)
	 *	@param		{number}	pages	総ページ数
	 *	@return		{array}		ページボタンのデータ
	 *
	 */
	_numbers(page, pages){
		//console.log("DataTables - _numbers");

		let numbers = [];
		let	buttons = 7;	// 設定: いくつのボタンを作るか (必ず奇数で) 
		let	half = Math.floor( buttons / 2 );
		let	i = 1;
	
		if( pages <= buttons ){
			numbers = this._range( 0, pages );

		}else if ( page <= half ) {
			numbers = this._range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );

		}else if ( page >= pages - 1 - half ) {
			numbers = this._range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );

		}else {
			numbers = this._range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}


	//	numbers.unshift('first');
	//	numbers.unshift('first','previous');
		numbers.unshift('previous');

		numbers.push('next');
	//	numbers.push('next','last');
	//	numbers.push('last');

		//console.log("  - numbers : %o", numbers);
		return numbers;
	}

	/**
	 *	ある範囲の整数を有する配列を作成する
	 *
	 * 	start から end - 1 までの整数の配列を返します
	 *
	 *	例
	 *		_range(2, 4)
	 *			// [ 2, 3 ]
	 *		_range(0, 7)
	 *			// [  0, 1, 2, 3, 4, 5, 6 ]
	 *
	 *	@param		{number}	start		最初の値
	 *	@param		{number}	end			値が end に達するまでシーケンスが続きます (最後の end の値は含まれません)
	 *	@return		{array}		start から end - 1 までの整数の配列を返します
	 *
	 */
	_range(start, end){
		//console.log("DataTables - _range");

		let out = [];
		for(let i=start ; i<end ; i++ ) {
			out.push( i );
		}
		return out;
	};


	view(vnode){

		return (
			<div class="datatables">

				{ /* search box */ }
				<div class="row mb-3">
					<div class="col-xs-7 col-sm-8">
					</div>
					<div class="col-xs-5 col-sm-4">
						<div class="form-horizontal">
							<div class="input-group input-group-sm">
								<input
									value={this.q}
									oninput={ (sender)=>{this.q = sender.currentTarget.value} }
									placeholder="Search"
									class="form-control"
									autocomplete="on"
									type="text"
									onkeypress={ (sender)=>{this.onKeypress(sender)} }
								 />
								<div class="input-group-append">
									<button class="btn btn-default" onclick={ (sender)=>{this.onEnterKeyword(sender)} }><i class="fa fa-search" aria-hidden="true"></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>


				{ /* main table */ }
				<div class="row">
					{ (()=>{

							return (
								<div class="col-sm-12">
									{ m( this.MainTable, {"sender": this }) }
								</div>
							);


					})() }
				</div>

				{ /* pagination */ }
				<div class="row">
					<div class="col-xs-7 col-sm-8">

						{ (()=>{

							if( this.total <= 0 ){
								return (
									<span>{this.total} entries </span>
								);
							}else if( this.filtered == this.total ){
								return (
									<span>Showing {this.skip + 1} to { Math.min( this.skip + this.limit, this.filtered ) } of {this.total} entries </span>
								);
							}else{
								return (
									<span>Showing {this.skip + 1} to { Math.min( this.skip + this.limit, this.filtered ) } of {this.filtered} entries (Filtered from {this.total} total entries)</span>
								);
							}

						})() }

					</div>
					<div class="col-xs-5 col-sm-4">
						{ this.pagination()  }
					</div>
				</div>


			</div>

		);
	}

}

