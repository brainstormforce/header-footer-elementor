# Astra Notices
Easily Create Admin Notices.

### How to use this library
1. Download the latest release from the tag as shown in the screenshot.
![Download Package](https://user-images.githubusercontent.com/2931091/124632235-c91aa680-dea1-11eb-9213-dbb9c4615d60.jpg)
2. Require the file `class-astra-notices.php` in your project.
3. Register your notices on action `admin_init` by calling method `Astra_Notices::add_notice()`

**Default Parameters**
```PHP
array(
    'id'                         => '',      // Optional, Notice ID. If empty it set `astra-notices-id-<$array-index>`.
    'type'                       => 'info',  // Optional, Notice type. Default `info`. Expected [info, warning, notice, error].
    'message'                    => '',      // Optional, Message.
    'show_if'                    => true,    // Optional, Show notice on custom condition. E.g. 'show_if' => if( is_admin() ) ? true, false, .
    'repeat-notice-after'        => '',      // Optional, Dismiss-able notice time. It'll auto show after given time.
    'display-notice-after'       => false,      // Optional, Dismiss-able notice time. It'll auto show after given time.
    'class'                      => '',      // Optional, Additional notice wrapper class.
    'priority'                   => 10,      // Priority of the notice.
    'display-with-other-notices' => true,    // Should the notice be displayed if other notices  are being displayed from Astra_Notices.
)
```

**Example Usage** 
```PHP
add_action(
	'admin_init',
	function() {
		Astra_Notices::add_notice(
			array(
				'id'                         => 'your-notice-id',
				'type'                       => '',
				'message'                    => sprintf(
					'<div class="notice-image">
						<img src="%1$s" class="custom-logo" alt="Sidebar Manager" itemprop="logo"></div> 
						<div class="notice-content">
							<div class="notice-heading">
								%2$s
							</div>
							%3$s<br />
							<div class="astra-review-notice-container">
								<a href="%4$s" class="astra-notice-close astra-review-notice button-primary" target="_blank">
								%5$s
								</a>
							<span class="dashicons dashicons-calendar"></span>
								<a href="#" data-repeat-notice-after="%6$s" class="astra-notice-close astra-review-notice">
								%7$s
								</a>
							<span class="dashicons dashicons-smiley"></span>
								<a href="#" class="astra-notice-close astra-review-notice">
								%8$s
								</a>
							</div>
						</div>',
					$image_path,
					__( 'Hello! Seems like you have used Header Footer Elementor to build this website — Thanks a ton!', 'header-footer-elementor' ),
					__( 'Could you please do us a BIG favor and give it a 5-star rating on WordPress? This would boost our motivation and help other users make a comfortable decision while choosing the Header Footer Elementor.', 'header-footer-elementor' ),
					'https://wordpress.org/support/plugin/header-footer-elementor/reviews/?filter=5#new-post',
					__( 'Ok, you deserve it', 'header-footer-elementor' ),
					MONTH_IN_SECONDS,
					__( 'Nope, maybe later', 'header-footer-elementor' ),
					__( 'I already did', 'header-footer-elementor' )
				),
				'repeat-notice-after'        => MONTH_IN_SECONDS,
				'display-notice-after'       => 1296000, // Display notice after 15 days.
				'priority'                   => 18,
				'display-with-other-notices' => false,
			)
		);
	}
);
```

Also check the example of [how this is used](https://github.com/brainstormforce/astra/blob/b9038d6ea02ae04b27db23b789b66b60907b4c16/inc/core/class-astra-admin-settings.php#L148-L187) in the Astra Theme. 