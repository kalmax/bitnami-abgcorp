<?php
/**
 * The template for displaying search results.
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
global $wp_query;
?>
<main class="site-main" role="main">
	<header class="page-header">
		<h1 class="entry-title">
			<?php esc_html_e( 'Search results for ', 'hello-elementor' ); ?>
			<span>&ldquo;<?php echo get_search_query(); ?>&rdquo;</span>
		</h1>
		<div class="total-results">
			<?php
				if ($wp_query->get('paged') == 0) {
					$first_post = 1;
				} else {
					$first_post = absint( $wp_query->get('paged') - 1 ) * $wp_query->get('posts_per_page') + 1;
				}
				$last_post = $first_post + $wp_query->post_count;
				$all_posts = $wp_query->found_posts;
				if ($last_post > $all_posts) $last_post = $all_posts;
			?>
			<p class="small text-uppercase">Showing <?=$first_post ?> - <?=$last_post ?> of <?=$all_posts; ?> results</p>
		</div>
	</header>
	<hr />
	<div class="page-content search-results-container">
		<?php if ( have_posts() ) : ?>
			<?php
			while ( have_posts() ) :
				printf('<div class="results-row">');
				printf('<div class="thumbnail">');
				the_post_thumbnail();
				printf('</div>');
				printf('<div class="result-details">');
				the_post();
				printf( '<h2><a href="%s">%s</a></h2>', esc_url( get_permalink() ), esc_html( get_the_title() ) );
				printf('<p class="date-fragment">%s</p>', get_the_date('F jS, Y'));
				the_excerpt();
				printf('</div>');
				printf('</div>');
			endwhile;
			?>
		<?php else : ?>
			<p><?php esc_html_e( 'Custom:  It seems we can\'t find what you\'re looking for.', 'hello-elementor' ); ?></p>
		<?php endif; ?>
	</div>

	<hr />

	<div class="results-footer">
		<div class="total-results">
			<p class="small text-uppercase">Showing <?=$first_post ?> - <?=$last_post ?> of <?=$all_posts; ?> results</p>
		</div>
		<?php
	if ( $wp_query->max_num_pages > 1 ) :
		?>
		<?php the_posts_pagination(array(
			'mid-size' => 2, 
			'prev_text' => '<span class="meta-nav">&larr;</span>',
			'next_text' => '<span class="meta-nav">&rarr;</span>'
		)); ?>

	<?php endif; ?>
	</div>
	<?php //wp_link_pages(); ?>

</main>
