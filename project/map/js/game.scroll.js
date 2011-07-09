(function( h, $ ) {
	h.object( 'game.scroll', {
		options: {
			id: 'frame',
			idInner: 'world'
		},
		_create: function () {
			h.debug( 'info', '[' + this.options.fullName + '] Create' );
			this._makeCache();
			this._bindActions();
		},
		_bindActions: function () {
			this.$outer.bind( 'mousedown.scroll', $.proxy( this._setScroll, this ) );
			this.$outer.bind( 'mouseup.scroll', $.proxy( this._removeScroll, this ) );
			this.$outer.bind( 'mousemove.scroll', $.proxy( this._move, this ) );
			// update offset cache on coord
			$( window ).resize( $.proxy( function () {
				this.outer.offset = this.$outer.offset();
			} ), this );
		},
		_center: function () {
			var left =  Math.floor( ( this.inner.width - this.outer.width ) / 2 ),
				top = Math.floor( ( this.inner.height - this.outer.height ) / 2 );
			this.$inner.css({
				top: -top,
				left: -left
			})
		},
		init: function () {
			this.$outer.css({
				overflow: 'hidden',
				position: 'relative'
			});
			this.$inner.css({
				position: 'absolute'
			});
			this._center();
		},
		_makeCache: function () {
			var o = this.options;
			this.isScrolling = false;
			this.$outer = $( '#' + o.id );
			this.$inner = $( '#' + o.idInner );
			this.outer = {
				width: this.$outer.width(),
				height: this.$outer.height(),
				offset: this.$outer.offset()
			};
			this.inner = {
				width: this.$inner.width(),
				height: this.$inner.height()
			};
			this.cursor = {};
		},
		_removeScroll: function ( event ) {
			if ( this.isScrolling ) {
				h.game.console( 'log', 'Remove Scroll' );
				this.isScrolling = false;
			}
		},
		_scroll: function ( event ) {
			h.game.console( 'log', 'Scroll' );
		},
		_move: function ( event ) {
			var top,
				left;
			if ( this.isScrolling ) {
				left = event.pageX - this.cursor.x;
				top = event.pageY - this.cursor.y;
				this.$inner.css({
					left: function ( index, value) {
						return parseFloat( value ) + left;
					},
					top: function ( index, value ) {
						h.debug( value, value + top);
						return parseFloat( value ) + top;
					}
				});
				this.cursor.x = event.pageX;
				this.cursor.y = event.pageY;
				h.game.console( 'log', 'Scroll move', top, left );
			}
		},
		_setScroll: function ( event ) {
			if ( !this.isScrolling ) {
				h.game.console( 'log', 'Set Scroll' );
				this.isScrolling = true;
				this.cursor.x = event.pageX;
				this.cursor.y = event.pageY;
			}
		}
	});
}( hiswe, jQuery ) );