<?php
/**
 * Basic Posts Widget Template
 *
 * @package header-footer-elementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$title_tag = isset( $settings['title_tag'] ) ? $settings['title_tag'] : 'h3';
?>

<div class="hfe-posts-grid">
	<?php
	while ( $this->query->have_posts() ) :
		$this->query->the_post();
		?>
		<article class="hfe-post-card">
			<?php if ( 'yes' === $settings['show_image'] && has_post_thumbnail() ) : ?>
				<div class="hfe-post-image">
					<a href="<?php the_permalink(); ?>">
						<?php the_post_thumbnail( $settings['image_size'] ); ?>
					</a>
				</div>
			<?php endif; ?>

			<div class="hfe-post-content">
				<?php if ( 'yes' === $settings['show_title'] ) : ?>
					<<?php echo esc_attr( $title_tag ); ?> class="hfe-post-title">
						<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					</<?php echo esc_attr( $title_tag ); ?>>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_meta'] ) : ?>
					<div class="hfe-post-meta">
						<?php
						$meta_items = [];
						
						// Add date if enabled
						if ( 'yes' === $settings['show_date'] ) {
							$meta_items[] = '<span class="hfe-post-date">' . get_the_date() . '</span>';
						}
						
						// Add author if enabled
						if ( 'yes' === $settings['show_author'] ) {
							$meta_items[] = '<span class="hfe-post-author">' . __( 'by', 'header-footer-elementor' ) . ' ' . get_the_author() . '</span>';
						}
						
						// Add comments count if enabled
						if ( 'yes' === $settings['show_comments'] ) {
							$comments_count = get_comments_number();
							if ( $comments_count == 0 ) {
								$comments_text = __( 'No Comments', 'header-footer-elementor' );
							} elseif ( $comments_count == 1 ) {
								$comments_text = __( '1 Comment', 'header-footer-elementor' );
							} else {
								$comments_text = sprintf( __( '%s Comments', 'header-footer-elementor' ), $comments_count );
							}
							$meta_items[] = '<span class="hfe-post-comments">' . $comments_text . '</span>';
						}
						
						// Output meta items with separator
						echo implode( '<span class="hfe-meta-separator"> ' . esc_html( $settings['meta_separator'] ) . ' </span>', $meta_items );
						?>
					</div>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_excerpt'] ) : ?>
					<div class="hfe-post-excerpt">
						<?php echo wp_trim_words( get_the_excerpt(), $settings['excerpt_length'], '...' ); ?>
					</div>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_read_more'] ) : ?>
					<a href="<?php the_permalink(); ?>" class="hfe-read-more">
						<?php echo esc_html( $settings['read_more_text'] ); ?>
					</a>
				<?php endif; ?>
			</div>
		</article>
		<?php
	endwhile;
	wp_reset_postdata();
	?>
</div>
