<?php
/**
 * HFE Module Base.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Base;

use HFE\WidgetsManager\Base\HFE_Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Module Base
 *
 * @since 2.2.1
 */
abstract class Module_Base {

	/**
	 * Reflection
	 *
	 * @var reflection
	 */
	private $reflection;

	/**
	 * Reflection
	 *
	 * @var instances
	 */
	protected static $instances = [];

	/**
	 * Get Name
	 *
	 * @since 2.2.1
	 */
	abstract public function get_name();

	/**
	 * Class name to Call
	 *
	 * @since 2.2.1
	 */
	public static function class_name() {
		return get_called_class();
	}

	/**
	 * Check if this is a widget.
	 *
	 * @since 1.12.0
	 * @access public
	 *
	 * @return bool true|false.
	 */
	public function is_widget() {
		return true;
	}

	/**
	 * Class instance
	 *
	 * @since 2.2.1
	 *
	 * @return static
	 */
	public static function instance() {
		$class_name = static::class_name();
		if ( empty( static::$instances[ $class_name ] ) ) {
			static::$instances[ $class_name ] = new static();
		}

		return static::$instances[ $class_name ];
	}

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->reflection = new \ReflectionClass( $this );

		add_action( 'elementor/widgets/register', [ $this, 'init_widgets' ] );
	}

	/**
	 * Init Widgets
	 *
	 * @since 2.2.1
	 */
	public function init_widgets() {

		$widget_manager = \Elementor\Plugin::instance()->widgets_manager;

		foreach ( $this->get_widgets() as $widget ) {
			if ( HFE_Helper::is_widget_active( $widget ) ) {
				$class_name = $this->reflection->getNamespaceName() . '\\' . ucfirst( $widget );

				if ( $this->is_widget() ) {
					$widget_manager->register( new $class_name() );
				}
			}
		}
	}

	/**
	 * Get Widgets
	 *
	 * @since 2.2.1
	 *
	 * @return array
	 */
	public function get_widgets() {
		return [];
	}
}
