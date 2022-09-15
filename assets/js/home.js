let swiper = new Swiper(".mySwiper", {
    loop: true,
  });



  $(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})



{

    const MathUtil = {
        lerp: (a, b, n) => (1 - n) * a + n * b
    };

    let winsize;
    const calcWinsize = () => winsize = { width: window.innerWidth, height: window.innerHeight };
    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    class GalleriaItem {
        constructor(el, parent) {
            this.el = el;
        }
    }

    class Galleria {
        constructor(el) {
            this.el = el;
            this.inner = this.el.querySelector('.galleria__inner');
            this.innerWidth = 0;
            this.items = [];
            [...this.el.querySelectorAll('.galleria__item')].forEach(item => {
                this.items.push(new GalleriaItem(item))
                this.innerWidth += item.getBoundingClientRect().width;
            });
            this.isDragged = false;
            this.currentX = 0;
            this.initialX = 0;
            this.xOffset = 0;
            this.pervPosition = 0;
            this.maxDrag = this.innerWidth - winsize.width;
            this.intervalId = undefined;
            this.init();
            this.initEvents();
        }

        init() {
            this.inner.style.width = this.innerWidth + 'px';
            this.render = () => {
                this.intervalId = undefined;

                this.pervPosition = MathUtil.lerp(this.pervPosition, this.currentX, 0.1);
                this.inner.style.transform = 'matrix(1, 0, 0, 1, ' + this.pervPosition + ', 0)';

                if (!this.intervalId) {
                    this.intervalId = requestAnimationFrame(() => this.render());
                }
            };
            this.intervalId = requestAnimationFrame(() => this.render());
        }

        onDragStart(e) {
            this.isDragged = true;
            this.initialX = this.unify(e).clientX - this.xOffset;
        }

        onDragMove(e) {
            if (!this.isDragged) return;
            e.preventDefault();
            this.currentX = this.unify(e).clientX - this.initialX;
        }

        onDragEnd() {
            if (this.currentX > 0) {
                this.currentX = 0;
            }
            if (this.currentX < -1 * this.maxDrag) {
                this.currentX = -1 * this.maxDrag;
            }

            this.isDragged = false;
            this.xOffset = this.currentX;
        }

        initEvents() {
            if(window.PointerEvent){
                // Pointer events
                this.inner.addEventListener('pointerdown', (e) => {
                    this.onDragStart(e);
                });
                this.inner.addEventListener('pointermove', (e) => {
                    this.onDragMove(e);
                });
                this.inner.addEventListener('pointerup', (e) => {
                    this.onDragEnd();
                });
            }else{
                // Mouse events
                this.inner.addEventListener('mousedown', (e) => {
                    this.onDragStart(e);
                });
                this.inner.addEventListener('mouseleave', (e) => {
                    this.onDragEnd();
                });
                this.inner.addEventListener('mouseup', (e) => {
                    this.onDragEnd();
                });
                this.inner.addEventListener('mousemove', (e) => {
                    this.onDragMove(e);
                });

                // Touch events
                this.inner.addEventListener('touchstart', (e) => {
                    this.onDragStart(e);
                });
                this.inner.addEventListener('touchmove', (e) => {
                    this.onDragMove(e);
                });
                this.inner.addEventListener('touchend', (e) => {
                    this.onDragEnd();
                });
            }
            // Unifying touch and click
            this.unify = (e) => {
                return e.changedTouches ? e.changedTouches[0] : e
            };
        }
    }

    var galleria = document.querySelectorAll('.galleria');
    if (galleria.length > 0) {
        for (let i = 0; i < galleria.length; i++) {
          new Galleria(galleria[i]);
        }
    }
};