<?php
namespace Mobile_Menu;

use Elementor\Plugin;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Mobile_Menu_Widget extends Widget_Base {

  public static $slug = 'mobile-menu';


  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    
    wp_register_style( 'from-mobile-menu-style', 
      plugins_url( 'assets/css/from-mobile-menu.css', __FILE__ ), 
      array(), 
      '1.0'
    );
    wp_enqueue_style('from-mobile-menu-style');

    wp_register_script('from-mobile-menu-js', plugins_url('assets/js/from-mobile-menu.js', __FILE__), array( ), '1.0', true);  
    wp_enqueue_script('from-mobile-menu-js');

  }


  protected function _register_controls() {


    $this->start_controls_section(
      'content_section',
      [
        'label' => __( 'Options', self::$slug ),
        'tab' => Controls_Manager::TAB_CONTENT,
      ]
    );

    $this->add_control(
      'font_family',
      [
        'label' => esc_html__( 'Font Family', self::$slug ),
        'type' => \Elementor\Controls_Manager::FONT,
        'default' => "'Open Sans', sans-serif",
        'selectors' => [
          '{{WRAPPER}} .title' => 'font-family: {{VALUE}}',
        ],
      ]
    );

    $this->add_control(
      'menu_id',
      [
        'label' => esc_html__( 'Menu ID', self::$slug ),
        'type' => \Elementor\Controls_Manager::TEXT,
        'default' => esc_html__( '', self::$slug )
      ]
    );

    $this->add_control(
      'logo_light',
      [
        'label' => esc_html__( 'Logo - Light', self::$slug ),
        'type' => \Elementor\Controls_Manager::MEDIA,
        'default' => [
          'url' => \Elementor\Utils::get_placeholder_image_src(),
        ],
      ]
    );

    $this->add_control(
      'cta_contact_us',
      [
        'label' => esc_html__( 'Link - Contact Us', self::$slug ),
        'type' => \Elementor\Controls_Manager::URL,
        'placeholder' => esc_html__( 'https://your-link.com', self::$slug ),
        'default' => [
          'url' => '',
          'is_external' => false,
        ],
        'label_block' => true,
      ]
    );

    $this->add_control(
      'cta_rent_a_car',
      [
        'label' => esc_html__( 'Link - Rent A Car', self::$slug ),
        'type' => \Elementor\Controls_Manager::URL,
        'placeholder' => esc_html__( 'https://your-link.com', self::$slug ),
        'default' => [
          'url' => '',
          'is_external' => false,
        ],
        'label_block' => true,
      ]
    );

    $this->end_controls_section();

  
  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('FROM Mobile Menu', self::$slug); }

  public function get_icon() { return 'eicon-slider-push'; }

  public function get_categories() { return [ 'general' ]; }

  protected function buildTree(array &$flatNav, $parentId = 0) {
    $branch = [];

    foreach ($flatNav as &$navItem) {
      if($navItem->menu_item_parent == $parentId) {
        $children = self::buildTree($flatNav, $navItem->ID);
        if($children) {
          $navItem->children = $children;
        }

        $branch[$navItem->menu_order] = $navItem;
        unset($navItem);
      }
    }

    return $branch;
  }

  protected function render() {

    $settings = $this->get_settings_for_display();
    $font_family = $settings['font_family'];
    $custom_logo_id = get_theme_mod( 'custom_logo' );
    $logo = wp_get_attachment_image_src( $custom_logo_id , 'full' );
    $menu = $settings['menu_id'] ? wp_get_nav_menu_object( $settings['menu_id'] ) : false;
    $menu_items = $menu ? wp_get_nav_menu_items( $menu->term_id ) : [];
    $menu_items_tree = self::buildTree($menu_items);

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>

    <div class="from-mobile-menu from-mobile-menu-container" style="font-family: <?php echo esc_attr( $font_family ); ?>;">
      <div class="from-mobile-menu-inner">
        <div class="header">
          <div class="logo">
           <?php  if ( has_custom_logo() ): ?>
            <a href="<?=get_site_url();?>"><img src="<?=esc_url( $logo[0] );?>" alt="<?=get_bloginfo( 'name' );?>"></a>
           <?php else: ?> 
            <a href="<?=get_site_url();?>"><h1><?=get_bloginfo('name');?></h1></a>  
           <?php endif;?>
          </div>
          <div class="controls">
            <a href="" class="burger" style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-burger.svg';?>');"></a>
            <a href="" class="close" style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-close.svg';?>');"></a>
          </div>
        </div>
        <div class="links-container collapsed">
          <div class="search-box">
            <input type='text' placeholder="Search" class="input-search" data-url="<?=get_site_url();?>"/>
            <a class="btn-search" href="#" style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-search.svg';?>');"></a>
          </div>
          <ul class="links">
            <?php if ($menu_items): ?>
              <?php foreach($menu_items_tree as $menu_item):?>
                <li class="<?=$menu_item->children ? 'collapsed' : '';?>">
                  <a href="<?=$menu_item->url;?>" class="<?=$menu_item->children ? 'has-children' : '';?>">
                    <label for=""><?=$menu_item->title;?></label>
                    <?php if($menu_item->children): ?>
                      <div class="caret">
                        <i style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-caret-down.svg';?>');"></i>
                      </div>
                    <?php endif;?>
                  </a>
                  <?php if($menu_item->children): ?>
                    <ul class="sub-menu">
                      <li><a href="<?=$menu_item->url;?>"><?=$menu_item->title;?> Overview </a></li>  
                      <?php foreach($menu_item->children as $menu_item_child_item): ?>
                        <li><a href="<?=$menu_item_child_item->url;?>"><?=$menu_item_child_item->title;?></a></li>  
                      <?php endforeach;?>
                    </ul>
                  <?php endif;?>
                </li>
              <?php endforeach;?>
            <?php endif;?>
          </ul>
          <div class="cta">
            <a 
              href="<?=$settings['cta_contact_us']['url'];?>" 
              id="btn-contact-us" 
              class="btn-from btn-secondary btn-lg"
              <?=$settings['cta_contact_us']['is_external'] ? 'target="_blank"' : '';?>
              >
              <span> CONTACT US </span>
              <span class="line"></span>
            </a>
            <?php 
            if(is_front_page()): ?>
              <a 
                href="<?=$settings['cta_rent_a_car']['url'];?>"
                id="btn-rent-a-car"
                target="_blank" class="btn-from btn-primary btn-lg opaque"
                <?=$settings['cta_rent_a_car']['is_external'] ? 'target="_blank"' : '';?>
                >
                <span> RENT A CAR </span>
                <span class="line"></span>
              </a>
            <?php endif;?>
          </div>
        </div>
      </div>
    </div>

  <?php }

} 