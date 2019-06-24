# Mithril Animate

アニメーションを操作するためのライブラリです。

基本的には animate.css を使用することを想定して作られていますが、純粋な CSS アニメーションであれば対応できます。


## 使用方法


### 動的にアニメーションを実行する

クリックしたらアニメーションを実行するなどの場合です。

1．最初にオブジェクトを作成します。Mithril コンポーネントの コンストラクタ上で作成するのが良いでしょう。
2．アニメーションの対象となる dom をフックします。
	対象 DOM の `oncreate()` ライフサイクルイベントで、 Animate オブジェクトの `create()` をします。
3. 好きなタイミングで Animate オブジェクト `run()` します。


~~~js
class PageComponent {

	constructor(){
		this.animation = new Animate(["animated","bounce"]);		---- (1)
	}
	
	view(){
		
		return (
			<div>
				<p oncreate={ (vnode)=>{ this.animation.create(vnode) } }>target</p>	---- (2)
				<button onclick={ (sender)=>{this.animation.run()} }>Run</button>		---- (3)
			</div>
		);
	}

}
~~~


### DOM が削除されるときにアニメーションを実行する

1．最初にオブジェクトを作成します。Mithril コンポーネントの コンストラクタ上で作成するのが良いでしょう。
2．アニメーションの対象となる dom をフックします。
	対象 DOM の `onbeforeremove()` ライフサイクルイベントで、 Animate オブジェクトの `runbeforeremove()` をします。


~~~js
class PageComponent {

	constructor(){
		this.animation = new Animate(["animated","fadeOut"]);		---- (1)
		this.visible = true;
	}
	
	view(){
		
		return (
			<div>
				{ (()=>{
					if(this.visible){
						return (
							<p oncreate={ (vnode)=>{ return this.animation.runbeforeremove(vnode) } }>target</p>	---- (2)
						);
					}
				})() }
				<button onclick={ (sender)=>{ this.visible = false; } }>Remove</button>
			</div>
		);
	}

}
~~~


### DOM が追加・作成されたときにアニメーションを実行する

1．最初にオブジェクトを作成します。Mithril コンポーネントの コンストラクタ上で作成するのが良いでしょう。
2．アニメーションの対象となる dom をフックします。
	対象 DOM の `oncreate()` ライフサイクルイベントで、 Animate オブジェクトの `run()` をします。


~~~js
class PageComponent {

	constructor(){
		this.animation = new Animate(["animated","fadeIn"]);		---- (1)
		this.visible = false;
	}
	
	view(){
		
		return (
			<div>
				{ (()=>{
					if(this.visible){
						return (
							<p oncreate={ (vnode)=>{ this.animation.run(vnode) } }>target</p>	---- (2)
						);
					}
				})() }
				<button onclick={ (sender)=>{ this.visible = true; } }>Add</button>
			</div>
		);
	}

}
~~~


