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
		<?php get_search_form( true ); ?>
	</header>
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
	<hr />
	<div class="page-content search-results-container">
		<?php if ( have_posts() ) : ?>
			<?php
			while ( have_posts() ) :
				printf('<div class="results-row">');
				printf('<div class="thumbnail">');
				if (has_post_thumbnail()) {
					the_post_thumbnail();
				} else {
					printf('<img src="/wp-content/uploads/2022/03/Logo-Image@2x.png" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" loading="lazy" alt="%s" />', esc_html( get_the_title() ));
				}
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

	<hr class="pagination-footer" />

	<div class="results-footer">
		<div class="total-results">
			<p class="small text-uppercase">Showing <?=$first_post ?> - <?=$last_post ?> of <?=$all_posts; ?> results</p>
		</div>
		<?php
	if ( $wp_query->max_num_pages > 1 ) :
		?>
		<?php the_posts_pagination(array(
			'mid-size' => 2, 
			'prev_text' => '<img src="/wp-content/uploads/2022/03/Left-Caret@2x.png"/>',
			'next_text' => '<img src="/wp-content/uploads/2022/03/Right-Caret@2x.png"/>'
		)); ?>

	<?php endif; ?>
	</div>
	<?php //wp_link_pages(); ?>

</main>
