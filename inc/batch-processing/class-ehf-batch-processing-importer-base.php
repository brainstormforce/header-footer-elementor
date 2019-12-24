<?php
/**
 * Background Process
 *
 * @package header-footer-elementor
 * @since x.x.x
 */

if ( class_exists( 'WP_Background_Process' ) ) :


	/**
	 * Image Background Process
	 *
	 * @since x.x.x
	 */
	class EHF_Batch_Processing_Importer_Base extends WP_Background_Process {

		/**
		 * Image Process
		 *
		 * @var string
		 */
		protected $action = 'ehf_importer';

		/**
		 * Task
		 *
		 * Override this method to perform any actions required on each
		 * queue item. Return the modified item for further processing
		 * in the next pass through. Or, return false to remove the
		 * item from the queue.
		 *
		 * @since x.x.x
		 *
		 * @param object $object Queue item object.
		 * @return mixed
		 */
		protected function task( $object ) {

			$process = $object['instance'];
			$method  = $object['method'];

			switch ( $method ) {
				case 'import_blocks':
					error_log( 'Elementor Header Footer - Importing Blocks.' );
					$page = $object['page'];
					error_log( 'Elementor Header Footer - Importing Block ID - ' . $page );
					update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Importing Block ID - ' . $page );
					$process->import_blocks( $page );
					break;

				case 'import_block_categories':
					error_log( 'Elementor Header Footer - Importing Blocks Categories' );
					update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Importing Blocks Categories' );
					$process->import_block_categories();
					break;

				default:
					break;
			}

			return false;
		}

		/**
		 * Complete
		 *
		 * Override if applicable, but ensure that the below actions are
		 * performed, or, call parent::complete().
		 *
		 * @since x.x.x
		 */
		protected function complete() {
			parent::complete();

			error_log( 'Elementor Header Footer - All processes are complete' );
			update_option( 'ehf-batch-status-string', 'Elementor Header Footer - All processes are complete' );
			delete_option( 'ehf-batch-status' );
			update_option( 'ehf-batch-is-complete', 'yes' );
		}

	}

endif;
