import m from 'mithril';

// mithril components
class PageComponent {
	
	oninit(vnode){
		console.log("oninit()");

		this.eventlogs = [];
	}
	
	createMyCollapse(vnode){
		console.log("createMyCollapse()");

		this.MyCollapse = $(vnode.dom).collapse('hide');

		// this.MyCollapse : Object [ div#MyCollapse.collapsing ]
		console.log("  - this.MyCollapse : %o", this.MyCollapse);


		this.MyCollapse.on('show.bs.collapse', ()=>{
			console.log("Event: show.bs.collapse");
			this.eventlogs.push("show.bs.collapse");
			m.redraw();
		});

		this.MyCollapse.on('shown.bs.collapse', ()=>{
			console.log("Event: shown.bs.collapse");
			this.eventlogs.push("shown.bs.collapse");
			m.redraw();
		});

		this.MyCollapse.on('hide.bs.collapse', ()=>{
			console.log("Event: hide.bs.collapse");
			this.eventlogs.push("hide.bs.collapse");
			m.redraw();
		});

		this.MyCollapse.on('hidden.bs.collapse', ()=>{
			console.log("Event: hidden.bs.collapse");
			this.eventlogs.push("hidden.bs.collapse");
			m.redraw();
		});

	}

	toggleMyCollapse(event){
		console.log("toggleMyCollapse()");
		this.MyCollapse.collapse('toggle');
	}

	showMyCollapse(event){
		console.log("showMyCollapse()");
		this.MyCollapse.collapse('show');
	}

	hideMyCollapse(event){
		console.log("hideMyCollapse()");
		this.MyCollapse.collapse('hide');
	}

	disposeMyCollapse(event){
		console.log("disposeMyCollapse()");
		this.MyCollapse.collapse('dispose');
	}

	clearEventLogs(event){
		this.eventlogs = [];
	}

	view(vnode){
		return (
			<section id="app-main" class="container">
				<h1>Collapse <span class="h2">with Bootstrap <span class="small">4.1</span> + Mithril <span class="small">1.x</span></span></h1>

				<button
					type="button"
					class="btn btn-primary m-2"
					onclick={ (event)=>{this.toggleMyCollapse(event)} }
				>
					Toggle
				</button>

				<button
					type="button"
					class="btn btn-primary m-2"
					onclick={ (event)=>{this.showMyCollapse(event)} }
				>
					Show
				</button>

				<button
					type="button"
					class="btn btn-primary m-2"
					onclick={ (event)=>{this.hideMyCollapse(event)} }
				>
					Hide
				</button>

				<button
					type="button"
					class="btn btn-secondary m-2"
					onclick={ (event)=>{this.disposeMyCollapse(event)} }
				>
					Dispose
				</button>


				<div class="collapse m-2" id="MyCollapse" oncreate={ (vnode)=>{ this.createMyCollapse(vnode) } }>
					<div class="card card-body">
						Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
					</div>
				</div>


				<div class="m-5">
					<div class="d-flex justify-content-between">
						<div>
							<h5>Event log</h5>
						</div>
						<div>
							<button
								type="button"
								class="btn btn-link"
								onclick={ (event)=>{this.clearEventLogs(event)} }
							>
								clear &times;
							</button>
						</div>
					</div>

					<table class="table table-sm table-bordered">
						<thead>
							<tr>
								<th>#</th>
								<th>Event</th>
							</tr>
						</thead>
						<tbody>
							{ (()=>{

								return this.eventlogs.map( (row,i)=>{
									return ( 
										<tr>
											<td>{i}</td>
											<td>{row}</td>
										</tr>
									);
								})

							})() }
						</tbody>
					</table>

				</div>


			</section>
		);
	}

}

// router and entry point.
m.route(document.body, '/', {
	'/': new PageComponent(),
});

