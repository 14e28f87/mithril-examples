import m from 'mithril';
import Animate from 'Animate';

// mithril components
class PageComponent {

	constructor(){
		this.animationClass = "";
	
		this.animationBounce = new Animate(["animated","bounce"]);
		this.animationFadeOutRemove = new Animate(["animated","fadeOut"]);
		this.animationFadeInAdd = new Animate(["animated","fadeIn"]);

		this.visibleFadeOutRemove = true;
		this.visibleFadeInAdd = false;

	}


	
	view(){
		console.log("vnode - %o", this.animationClass);
		
		return (
			<section id="app-main">
				<h1>Animation</h1>
				<p>animate.css</p>

				<div class="container">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title" oncreate={ (vnode)=>{ this.animationBounce.create(vnode) } } >Bounce</h5>
							<button
								type="button"
								class="btn btn-primary"
								onclick={ (sender)=>{this.animationBounce.run()} }
							>
								Bounce
							</button>
						</div>
					</div>


					<div class="card">
						<div class="card-body">

							{ (()=>{

								if(this.visibleFadeOutRemove){

									return (
										<h5 class="card-title" onbeforeremove={ (vnode)=>{ return this.animationFadeOutRemove.runbeforeremove(vnode) } } >FadeOut and Remove</h5>
									);

								}else{
									return (
										<p>*</p>
									);
								}

							})() }

							<button
								type="button"
								class="btn btn-primary"
								onclick={ (sender)=>{ this.visibleFadeOutRemove = false; } }
							>
								FadeOut and Remove
							</button>
						</div>
					</div>



					<div class="card">
						<div class="card-body">

							{ (()=>{

								if(this.visibleFadeInAdd){

									return (
										<h5 class="card-title" oncreate={ (vnode)=>{ return this.animationFadeInAdd.run(vnode) } } >FadeIn and Add</h5>
									);

								}else{
									return (
										<p>*</p>
									);
								}

							})() }

							<button
								type="button"
								class="btn btn-primary"
								onclick={ (sender)=>{ this.visibleFadeInAdd = true; } }
							>
								FadeIn and Add
							</button>
						</div>
					</div>


				</div>
				
			</section>
		);
	}

}

// router and entry point.
m.route(document.body, '/', {
	'/': new PageComponent(),
});

