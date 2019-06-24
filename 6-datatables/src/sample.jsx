import m from 'mithril';

// コンポーネント名の最初の文字を大文字にします。
// JSX でコンポーネントを <Component_HelloComponent /> のようにコールするためです。
import Component_DataTablesComponent from "Component/DataTablesComponent";


import SampleData from 'data.json';



// mithril components
class PageComponent {
	
	
	oninit(){
		console.log("oninit");

		this.DataTables = new Component_DataTablesComponent();

		this.DataTables.fetch = this.fetch;

		this.DataTables.MainTable = new class {

			view(vnode){
				let sender = vnode.attrs.sender;
				return (
					<table class="table table-condensed table-hover">
						<thead>
							<tr>
								<th class="col-xs-1">ID</th>
								<th class="col-xs-3">Name</th>
								<th class="col-xs-2">Position</th>
								<th class="col-xs-2">Start date</th>
								<th class="col-xs-2">Office</th>
							</tr>
						</thead>
						<tbody>
						{ (()=>{

							if( sender.total <= 0 ){

								return ( 
									<tr>
										<td colspan="5" class="col-xs-12 py-3">No data available in table</td>
									</tr>
								);

							}else if( sender.filtered > 0 ){

								return sender.data.map( (row,i)=>{
									let url = "#!/user/" + row.id + "/show";
									return ( 
										<tr data-i={i} >
											<td class="col-xs-3">{row.id}</td>
											<td class="col-xs-3">{row.name}</td>
											<td class="col-xs-2">{row.position}</td>
											<td class="col-xs-2">{row.start_date}</td>
											<td class="col-xs-2">{row.office}</td>
										</tr>
									);

								});

							}else{
								return ( 
									<tr>
										<td colspan="5" class="col-xs-12 py-3">No matching records found</td>
									</tr>
								);
							}

						})() }

						</tbody>
					</table>
				);
			}

		};



	}


	fetch(sender){
		console.log("fetch");

		let q = sender.q.trim();

		let filteredData = [];
		if(q == ""){
			// 検索しない
			filteredData = SampleData.data;
		}else{
			// 検索する
			for(let i in SampleData.data) {
				let row = SampleData.data[i];
				if( (String(row.id)).indexOf(q) != -1
				 || (String(row.name)).indexOf(q) != -1
				 || (String(row.position)).indexOf(q) != -1 
				 || (String(row.start_date)).indexOf(q) != -1
				 || (String(row.office)).indexOf(q) != -1 ){
					filteredData.push(row);
				}
			}
		}

		let slicedData = filteredData.slice( sender.skip, sender.skip + sender.limit );


		// 案①
	//	return {
	//		'data': currentData,
	//		'total': SampleData.data.length,
	//		'filtered': SampleData.data.length,
	//	};

		// 案②
		return new Promise( (resolve, reject)=>{
			setTimeout( ()=>{
				console.log(" *** timeout");
				resolve(
					{
						'data': slicedData,
						'total': SampleData.data.length,
						'filtered': filteredData.length,
					}
				);
			}, 1000);
		});


	}

	view(){
		console.log("view");

		return (
			<section id="app-main">
				<h1>DataTables</h1>

				<div class="container">
					{ m(this.DataTables) }
				</div>
			</section>
		);
	}

}

// router and entry point.
m.route(document.body, '/', {
	'/': new PageComponent(),
});

