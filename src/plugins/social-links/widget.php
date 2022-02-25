<?php
namespace From_Social_Links;

use Elementor\Plugin;
use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Group_Control_Background;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class From_Social_Links_Widget extends Widget_Base {

  public static $slug = 'from-social-links';

  public function __construct($data = [], $args = null) {

    parent::__construct($data, $args);

    wp_register_style( 'from-social-links-style', 
      plugins_url( 'assets/css/social-links.css', __FILE__ ), 
      array(), 
      '1.0'
    );
    wp_enqueue_style('from-social-links-style');

  }

  public function get_name() { return self::$slug; }

  public function get_title() { return __('Social Links', self::$slug); }

  public function get_icon() { return 'eicon-slider-push'; }

  public function get_categories() { return [ 'general' ]; }

  protected function _register_controls() {
  }

  protected function render() {

    if (Plugin::$instance->editor->is_edit_mode()) {
      // If the Elementor editor is opened.

    } ?>

    <div class="from-social-links from-social-links-wrapper">
      <div class="from-social-links--inner">
        <ul>
          <li>
            <a href="<?php echo get_option('facebook');?>" target="_blank">
              <i 
                class="icon icon-facebook" 
                style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-facebook.svg';?>');">
              </i>
            </a>
          </li>
          <li>
            <a href="<?php echo get_option('twitter');?>" target="_blank">
              <i 
                class="icon icon-twitter" 
                style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-twitter.svg';?>');">
              </i>
            </a>
          </li>
          <li>
            <a href="<?php echo get_option('instagram');?>" target="_blank">
              <i 
                class="icon icon-instagram" 
                style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-instagram.svg';?>');">
              </i>
            </a>
          </li>
          <li>
            <a href="<?php echo get_option('linkedin');?>" target="_blank">
              <i 
                class="icon icon-linkedin" 
                style="background-image:url('<?php echo plugin_dir_url( __FILE__ ).'assets/images/icon-linkedin.svg';?>');">
              </i>
            </a>
          </li>
        </ul>
      </div>
    </div>

  <?php }

} 