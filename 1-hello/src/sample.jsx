import m from 'mithril';

// mithril components
class PageComponent {
	
	view(){
		return (
			<section id="app-main">
				<h1>Hello world  ..... o(^-^o) ...</h1>
				<p>webpack4 + babel-loader + react jsx (mithril msx)</p>
			</section>
		);
	}

}

// router and entry point.
m.route(document.body, '/', {
	'/': new PageComponent(),
});

