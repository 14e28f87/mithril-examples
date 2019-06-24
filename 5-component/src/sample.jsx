import m from 'mithril';

// コンポーネント名の最初の文字を大文字にします。
// JSX でコンポーネントを <Component_HelloComponent /> のようにコールするためです。
import Component_HelloComponent from "Component/HelloComponent";


// mithril components
class PageComponent {
	

	oninit(vnode){

		this.HelloComponent = new Component_HelloComponent();

	}


	view(){
		return (
			<section id="app-main">
				<h1>Component</h1>

				<div class="container">
					<code>&lt;Component_HelloComponent /&gt;</code>
					<Component_HelloComponent />
				</div>

				<div class="container">
					<code>&lt;Component_HelloComponent defaultCount="100"&gt;&lt;i&gt;pcs&lt;/i&gt;&lt;/Component_HelloComponent&gt;</code>
					<Component_HelloComponent defaultCount="100"><i>pcs</i></Component_HelloComponent>
				</div>


				<div class="container">
					<code>m(this.HelloComponent)</code>
					{ m(this.HelloComponent) }
				</div>

				<div class="container">
					<code>m(this.HelloComponent, &#x7b; defaultCount: 100 &#x7d;, &lt;i&gt;pcs&lt;/i&gt; )</code>
					{ m(this.HelloComponent,  {  defaultCount: 100 }, <i>pcs</i> ) }
				</div>



			</section>
		);
	}

}

// router and entry point.
m.route(document.body, '/', {
	'/': new PageComponent(),
});

