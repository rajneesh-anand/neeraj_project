$(document).ready(function() {
	document.getElementById("test").addEventListener("click", () => {
		$(".sidenav-fixed").toggle();
		$("#test2").toggleClass("testPad");
	});

	$(".sidebar-menu > li > a.collapsible-header").click(function() {
		$(".sidebar-menu > li > a.active:not(.collapsible-header)")
			.parent()
			.removeClass("active");
		$(".sidebar-menu > li > a.active:not(.collapsible-header)").removeClass(
			"active"
		);
	});

	$(".collapsible").collapsible();
	$("select").formSelect();
});
