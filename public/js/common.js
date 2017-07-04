/**
 * New node file
 */
var link=document.getElementById('nav_link');
$.each(link.children, function(i,item) {
	if(item.children[0].name==document.title){
		console.log(document.title);
		item.className='active';
	}else{
		item.className='';
	}
	
});