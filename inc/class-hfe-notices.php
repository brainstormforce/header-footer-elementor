<?php
/**
 * HFE Sites Notices
 *
 * @package HFE Sites
 * @since 1.0.8
 */

if ( ! class_exists( 'HFE_Notices' ) ) :

	/**
	 * HFE_Notices
	 *
	 * @since 1.0.8
	 */
	class HFE_Notices {

		/**
		 * Notices
		 *
		 * @access private
		 * @var array Notices.
		 * @since 1.0.8
		 */
		private static $notices = array();

		/**
		 * Instance
		 *
		 * @access private
		 * @var object Class object.
		 * @since 1.0.8
		 */
		private static $instance;

		/**
		 * Initiator
		 *
		 * @since 1.0.8
		 * @return object initialized object of class.
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self;
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 *
		 * @since 1.0.8
		 */
		public function __construct() {

			add_action( 'admin_notices', array( $this, 'show_notices' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
			add_action( 'wp_ajax_hfe-notices', array( $this, 'dismiss' ) );

		}

		/**
		 * Add Notice.
		 *
		 * @since 1.0.8
		 * @param array $args Notice arguments.
		 * @return void
		 */
		public static function add_notice( $args = array() ) {
			if ( is_array( $args ) ) {
				self::$notices[] = $args;
			}
		}

		/**
		 * Dismiss Notice.
		 *
		 * @since 1.0.8
		 * @return void
		 */
		function dismiss() {

			$id   = ( isset( $_POST['id'] ) ) ? $_POST['id'] : '';
			$time = ( isset( $_POST['time'] ) ) ? $_POST['time'] : '';
			$meta = ( isset( $_POST['meta'] ) ) ? $_POST['meta'] : '';

			// Valid inputs?
			if ( ! empty( $id ) ) {

				if ( 'user' === $meta ) {
					update_user_meta( get_current_user_id(), $id, true );
				} else {
					set_transient( $id, true, $time );
				}

				wp_send_json_success();
			}

			wp_send_json_error();
		}

		/**
		 * Enqueue Scripts.
		 *
		 * @since 1.0.8
		 * @return void
		 */
		function enqueue_scripts() {
			wp_register_script( 'hfe-sites-notices', HFE_URL . 'assets/js/hfe-sites-notices.js', array( 'jquery' ), HFE_VER, true );
		}

		/**
		 * Notice Types
		 *
		 * @since 1.0.8
		 * @return void
		 */
		function show_notices() {

			$defaults = array(
				'id'               => '',
				'type'             => 'info',
				'show_if'          => true,
				'message'          => '',
				'class'            => 'hfe-active-notice',
				'dismissible'      => false,
				'dismissible-meta' => 'user',
				'dismissible-time' => WEEK_IN_SECONDS,

				'data'             => '',
			);

			foreach ( self::$notices as $key => $notice ) {

				$notice = wp_parse_args( $notice, $defaults );

				$classes = array( 'hfe-notice', 'notice' );

				$classes[] = $notice['class'];
				if ( isset( $notice['type'] ) ) {
					$classes[] = 'notice-' . $notice['type'];
				}

				// Is notice dismissible?
				if ( true === $notice['dismissible'] ) {
					$classes[] = 'is-dismissible';

					// Dismissable time.
					$notice['data'] = ' dismissible-time=' . esc_attr( $notice['dismissible-time'] ) . ' ';
				}

				// Notice ID.
				$notice_id    = 'hfe-sites-notices-id-' . $notice['id'];
				$notice['id'] = $notice_id;
				if ( ! isset( $notice['id'] ) ) {
					$notice_id    = 'hfe-sites-notices-id-' . $notice['id'];
					$notice['id'] = $notice_id;
				} else {
					$notice_id = $notice['id'];
				}

				$notice['classes'] = implode( ' ', $classes );

				// User meta.
				$notice['data'] .= ' dismissible-meta=' . esc_attr( $notice['dismissible-meta'] ) . ' ';
				if ( 'user' === $notice['dismissible-meta'] ) {
					$expired = get_user_meta( get_current_user_id(), $notice_id, true );
				} elseif ( 'transient' === $notice['dismissible-meta'] ) {
					$expired = get_transient( $notice_id );
				}

				// Notices visible after transient expire.
				if ( isset( $notice['show_if'] ) ) {

					if ( true === $notice['show_if'] ) {

						// Is transient expired?
						if ( false === $expired || empty( $expired ) ) {
							self::markup( $notice );
						}
					}
				} else {

					// No transient notices.
					self::markup( $notice );
				}
			}

		}

		/**
		 * Markup Notice.
		 *
		 * @since 1.0.8
		 * @param  array $notice Notice markup.
		 * @return void
		 */
		public static function markup( $notice = array() ) {

			wp_enqueue_script( 'hfe-sites-notices' );

			?>
			<div id="<?php echo esc_attr( $notice['id'] ); ?>" class="<?php echo esc_attr( $notice['classes'] ); ?>" <?php echo $notice['data']; ?>>
				<p>
					<?php echo $notice['message']; ?>
				</p>
			</div>
			<?php
		}

	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	HFE_Notices::get_instance();

endif;
