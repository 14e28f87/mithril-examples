import m from 'mithril';

// mithril components
class PageComponent {
	
	oninit(vnode){
		console.log("oninit()");

		this.timeout = null;
		this.eventlogs = [];

	}
	
	createMyModal(vnode){
		console.log("createMyModal()");

		this.MyModal = $(vnode.dom).modal("hide");

		// this.MyModal : Object [ div#MyModal.collapsing ]
		console.log("  - this.MyModal : %o", this.MyModal);


		this.MyModal.on('show.bs.modal', ()=>{
			console.log("Event: show.bs.modal");
			this.eventlogs.push("show.bs.modal");
			m.redraw();
		});

		this.MyModal.on('shown.bs.modal', ()=>{
			console.log("Event: shown.bs.modal");
			this.eventlogs.push("shown.bs.modal");
			m.redraw();
		});

		this.MyModal.on('hide.bs.modal', ()=>{
			console.log("Event: hide.bs.modal");
			this.eventlogs.push("hide.bs.modal");
			m.redraw();
		});

		this.MyModal.on('hidden.bs.modal', ()=>{
			console.log("Event: hidden.bs.modal");
			this.eventlogs.push("hidden.bs.modal");
			m.redraw();
		});

	}

	toggleMyModal(event){
		console.log("toggleMyModal()");
		this.MyModal.modal('toggle');
	}

	showMyModal(event){
		console.log("showMyModal()");
		this.MyModal.modal('show');
	}

	hideMyModal(event){
		console.log("hideMyModal()");
		this.timeout = setTimeout( ()=>{
			this.MyModal.modal('hide');
			this.timeout = null;
			m.redraw();
		}, 5000);
		console.log("  - timeout : %o", this.timeout);

	}

	disposeMyModal(event){
		console.log("disposeMyModal()");
		this.MyModal.modal('dispose');
	}

	clearEventLogs(event){
		this.eventlogs = [];
	}



	view(vnode){
		return (
			<section id="app-main" class="container">
				<h1>Modal <span class="h2">with Bootstrap <span class="small">4.1</span> + Mithril <span class="small">1.x</span></span></h1>

				<button
					type="button"
					class="btn btn-primary m-2"
					onclick={ (event)=>{this.toggleMyModal(event)} }
				>
					Toggle
				</button>

				<button
					type="button"
					class="btn btn-primary m-2"
					onclick={ (event)=>{this.showMyModal(event)} }
				>
					Show
				</button>

				<button
					type="button"
					class="btn btn-primary m-2"
					onclick={ (event)=>{this.hideMyModal(event)} }
				>
					Hide 
					- { this.timeout ? "Please wait 5 seconds." : "after 5 seconds" }
				</button>

				<button
					type="button"
					class="btn btn-secondary m-2"
					onclick={ (event)=>{this.disposeMyModal(event)} }
				>
					Dispose
				</button>


				<div class="modal fade" id="MyModal" tabindex="-1" role="dialog" aria-labelledby="MyModalLabel" aria-hidden="true" oncreate={ (vnode)=>{ this.createMyModal(vnode) } }>
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="MyModalLabel">Modal title</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								...
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary">Save changes</button>
							</div>
						</div>
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

				<div class="alert alert-light alert-dismissible fade show mt-5" role="alert">
					<h5>How to check "Hide" button.</h5>
					<p>
						Click the "Hide" button. Then click the "Show" button within 5 seconds.
					</p>
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>


			</section>
		);
	}

}

// router and entry point.
m.route(document.body, '/', {
	'/': new PageComponent(),
});

