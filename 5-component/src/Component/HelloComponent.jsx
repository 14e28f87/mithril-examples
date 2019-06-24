import m from 'mithril';

export default class SELF {
	

	oninit(vnode){

		this.counter = 0;

		if( vnode.attrs.defaultCount ){
			this.counter = parseInt(vnode.attrs.defaultCount);
		}

	}

	countUp(event){
		this.counter++;
	}

	view(vnode){

		return (
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">This is hello component</h5>
					<p class="card-text">counter: {this.counter} {vnode.children}</p>
					<button
						type="button"
						class="btn btn-primary"
						onclick={ (event)=>{this.countUp(event)} }
					>
						Count
					</button>
				</div>
			</div>
		);
	}

}

