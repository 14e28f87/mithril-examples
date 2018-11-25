import m from 'mithril';

// mithril components
class PageComponent {
	
	oninit(vnode){
		console.log("oninit()");

		this.eventlogs = [];
	}
	
	createMyDatetimepicker(vnode){
		console.log("createMyDatetimepicker()");

		$(vnode.dom).datetimepicker();
		this.MyDatetimepicker = $(vnode.dom);

		console.log("  - this.MyDatetimepicker : %o", this.MyDatetimepicker);


		this.MyDatetimepicker.on('hide.datetimepicker', ()=>{
			console.log("Event: hide.datetimepicker");
			this.eventlogs.push("hide.datetimepicker");
			m.redraw();
		});

		this.MyDatetimepicker.on('show.datetimepicker', ()=>{
			console.log("Event: show.datetimepicker");
			this.eventlogs.push("show.datetimepicker");
			m.redraw();
		});

		this.MyDatetimepicker.on('change.datetimepicker', ()=>{
			console.log("Event: change.datetimepicker");
			this.eventlogs.push("change.datetimepicker");
			m.redraw();
		});

		this.MyDatetimepicker.on('error.datetimepicker', ()=>{
			console.log("Event: error.datetimepicker");
			this.eventlogs.push("error.datetimepicker");
			m.redraw();
		});

		this.MyDatetimepicker.on('update.datetimepicker', ()=>{
			console.log("Event: update.datetimepicker");
			this.eventlogs.push("update.datetimepicker");
			m.redraw();
		});

	}

	clearEventLogs(event){
		this.eventlogs = [];
	}

	view(vnode){
		return (
			<section id="app-main" class="container">
				<h1>Tempus Dominus Bootstrap 4 Datetime Picker <span class="h2">with Bootstrap <span class="small">4.1</span> + Mithril <span class="small">1.x</span></span></h1>




				<div class="container">
					<div class="row">
						<div class="col-sm-6">
							<div class="form-group">
								<div class="input-group date" id="MyDatetimepicker" data-target-input="nearest" oncreate={ (vnode)=>{ this.createMyDatetimepicker(vnode) } }>
									<input type="text" class="form-control datetimepicker-input" data-target="#MyDatetimepicker"/>
									<div class="input-group-append" data-target="#MyDatetimepicker" data-toggle="datetimepicker">
										<div class="input-group-text"><i class="fas fa-calendar-alt"></i></div>
									</div>
								</div>
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


			</section>
		);
	}

}

// router and entry point.
m.route(document.body, '/', {
	'/': new PageComponent(),
});

