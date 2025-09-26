<?php
/**
 * Basic Posts Widget Template
 *
 * @package header-footer-elementor
 */

use HFE\WidgetsManager\Widgets_Loader;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Security check - ensure we have a valid query object
if ( ! isset( $this->query ) || ! $this->query instanceof WP_Query ) {
	return;
}

// Sanitize title tag using the standard validation method
$title_tag = Widgets_Loader::validate_html_tag( $settings['title_tag'] ?? 'h3' );
?>

<div class="hfe-posts-grid">
	<?php
	while ( $this->query->have_posts() ) :
		$this->query->the_post();
		
		?>
		<article class="hfe-post-card">
			<?php if ( 'yes' === $settings['show_image'] && has_post_thumbnail() ) : ?>
				<div class="hfe-post-image">
					<a href="<?php echo esc_url( get_permalink() ); ?>" rel="bookmark">
						<?php 
						// Sanitize image size
						$image_size = sanitize_key( $settings['image_size'] ?? 'medium' );
						the_post_thumbnail( $image_size, [
							'alt' => esc_attr( get_the_title() ),
							'loading' => 'lazy'
						] ); 
						?>
					</a>
				</div>
			<?php endif; ?>

			<div class="hfe-post-content">
				<?php if ( 'yes' === $settings['show_title'] ) : ?>
					<<?php echo esc_attr( $title_tag ); ?> class="hfe-post-title">
						<a href="<?php echo esc_url( get_permalink() ); ?>" rel="bookmark">
							<?php echo esc_html( get_the_title() ); ?>
						</a>
					</<?php echo esc_attr( $title_tag ); ?>>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_meta'] ) : ?>
					<div class="hfe-post-meta">
						<?php
						$meta_items = [];
						
						// Add date if enabled
						if ( 'yes' === $settings['show_date'] ) {
							$meta_items[] = '<span class="hfe-post-date">' . esc_html( get_the_date() ) . '</span>';
						}
						
						// Add author if enabled
						if ( 'yes' === $settings['show_author'] ) {
							$author_name = get_the_author();
							if ( $author_name ) {
								$meta_items[] = '<span class="hfe-post-author">' . esc_html__( 'by', 'header-footer-elementor' ) . ' ' . esc_html( $author_name ) . '</span>';
							}
						}
						
						// Add comments count if enabled
						if ( 'yes' === $settings['show_comments'] ) {
							$comments_count = get_comments_number();
							if ( $comments_count == 0 ) {
								$comments_text = __( 'No Comments', 'header-footer-elementor' );
							} elseif ( $comments_count == 1 ) {
								$comments_text = __( '1 Comment', 'header-footer-elementor' );
							} else {
								$comments_text = sprintf( __( '%s Comments', 'header-footer-elementor' ), number_format_i18n( $comments_count ) );
							}
							$meta_items[] = '<span class="hfe-post-comments">' . esc_html( $comments_text ) . '</span>';
						}
						
						// Output meta items with separator
						if ( ! empty( $meta_items ) ) {
							$separator = wp_kses_post( $settings['meta_separator'] ?? ' | ' );
							echo implode( '<span class="hfe-meta-separator">' . $separator . '</span>', $meta_items );
						}
						?>
					</div>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_excerpt'] ) : ?>
					<div class="hfe-post-excerpt">
						<?php 
						$excerpt_length = absint( $settings['excerpt_length'] ?? 20 );
						$excerpt_length = max( 0, min( 100, $excerpt_length ) ); // Ensure within bounds
						echo wp_kses_post( wp_trim_words( get_the_excerpt(), $excerpt_length, '...' ) ); 
						?>
					</div>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_read_more'] ) : ?>
					<a href="<?php echo esc_url( get_permalink() ); ?>" class="hfe-read-more" rel="bookmark">
						<?php 
						$read_more_text = sanitize_text_field( $settings['read_more_text'] ?? __( 'Read More →', 'header-footer-elementor' ) );
						echo esc_html( $read_more_text ); 
						?>
					</a>
				<?php endif; ?>
			</div>
		</article>
		<?php
	endwhile;
	wp_reset_postdata();
	?>
</div>
