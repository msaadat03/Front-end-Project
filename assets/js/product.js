let link = document.querySelectorAll('li a');
		let imgBox = document.querySelector('.imgBox>img');

		link.forEach(el => {
			el.addEventListener('mouseover', (e) => imgBox.src = el.href);
		});