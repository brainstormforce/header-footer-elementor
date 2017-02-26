<?php
namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Widget_Menu extends Widget_Base {

	public function get_name() {
		return 'Menu';
	}

	public function get_title() {
		return __( 'Menu', 'header-footer-elementor' );
	}

	public function get_icon() {
		return 'eicon-spacer';
	}

	public function get_categories() {
		return [ 'hfe-eae' ];
	}

	protected function _register_controls() {

		$this->start_controls_section(
			'section_spacer',
			[
				'label' => __( 'Menu', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
            'select_menu',
            [
                'label' => __( 'Select Menu', 'elementor' ),
                'type' => Controls_Manager::SELECT,
                'options' => $this->get_menus(),
                'default' => 'default',
            ]
        );

		$this->add_control(
            'menu_layout',
            [
                'label' => __( 'Select Menu', 'elementor' ),
                'type' => Controls_Manager::SELECT,
                'options' => [
                	'horizontal' => 'Horizontal',
                	'vertical' => 'Vertical',
                ],
                'default' => ['horizontal'],
            ]
        );

		$this->add_control(
			'view',
			[
				'label' => __( 'View', 'header-footer-elementor' ),
				'type' => Controls_Manager::HIDDEN,
				'default' => 'traditional',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings();
		
		?>
		<div class="elementor-spacer">
			<div class="elementor-spacer-inner"></div>
		</div>
		<?php
	}

	protected function _content_template() {
		?>
		<div class="elementor-spacer">
			<div class="elementor-spacer-inner"></div>
		</div>
		<?php
	}

	public static function get_menus() {
		$get_menus =  get_terms( 'nav_menu', array( 'hide_empty' => true ) );

		$menus['default'] = 'Select a menu';

		if( $get_menus ){

			foreach( $get_menus as $key => $menu ){
				$menus[ $menu->slug ] = $menu->name;
			}

			$available_menus = $menus;
			
		} else {
			$available_menus = array( '' => __( 'No Menus Found', 'fl-builder' ) );			
		}

		return $available_menus;
	}

}

Plugin::instance()->widgets_manager->register_widget_type( new Widget_Menu() );
