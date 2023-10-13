//////////open menu mobile
$(function() {
	$('#menu').mmenu({
		extensions: ['pagedim-black', 'position-right'],
		counters: true,
		language: ['en', 'vi'],
		searchfield: {
			add: true,
			search: false,
		},
		iconbar: {
			add: true,
			top: ["<a href='/'><i class='fa fa-home'></i></a>"],
			bottom: [
				// `<ul class="lang">
				// 	<li><a href="#">vi</a></li>
				// 	<li><a href="#">en</a></li>
				// </ul>`,
			],
		},
		navbars: [
			{
				position: 'top',
				content: ['searchfield'],
			},
			// {
			// 	position: 'bottom',
			// 	content: [
			// 		`                    <div class="social-footer">
			// 		<ul class="nav nav-social-footer">
			// 			<li class="nav-item">
			// 				<a href="#" class="nav-link">
			// 					<i class="fab fa-facebook-square"></i>
			// 				</a>
			// 			</li>
			// 			<li class="nav-item">
			// 				<a href="#" class="nav-link">
			// 					<i class="fab fa-youtube-square"></i>
			// 				</a>
			// 			</li>
			// 			<li class="nav-item">
			// 				<a href="#" class="nav-link">
			// 					<i class="fab fa-instagram"></i>
			// 				</a>
			// 			</li>
			// 		</ul>
			// 	</div>`,
			// 	],
			// },
		],
	});
});
