=== Header, Footer & Blocks for Elementor ===
Contributors: brainstormforce, Nikschavan
Tags: elementor, header footer builder, header, footer, page builder, template builder, landing page builder, front-end editor
Donate link: https://www.paypal.me/BrainstormForce
Requires at least: 4.4
Requires PHP: 5.4
Tested up to: 5.0
Stable tag: 1.1.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Create Header and Footer for your site using Elementor Page Builder.

== Description ==

Create header and footer of your site easily using [Elementor](https://goo.gl/qhDrbf "Elementor").

All you need to do is -

1. Design a layout using Elementor.
2. Select whether it should be applied as the header or footer.
3. The template will be automatically applied as the header/footer. Easy peasy!

[Here is the step by step article](https://uaelementor.com/header-footer-with-elementor/?utm_source=wp-repo&utm_campaign=header-footer-elementor&utm_medium=description "UAElementor") with screenshots.

= Features of Header Footer Elementor =

- Create attractive pages and templates that can be displayed as a Header or Footer.
- Lets you use a fully customized header or footer across the website.

The plugin works best with these themes â€“ 

1. <a href="https://wpastra.com/?utm_source=wp-repo&utm_campaign=header-footer-elementor&utm_medium=description&bsf=162">Astra</a> - The Fastest, Most Lightweight &amp; Customizable WordPress Theme.
2. GeneratePress.
3. OceanWP.
4. Genesis.
5. Phlox Theme.

If you are a theme developer you can add support for the Header Footer Elementor from your theme easily. <a href="https://github.com/Nikschavan/header-footer-elementor/wiki/Adding-Header-Footer-Elementor-support-for-your-theme">Read instructions here</a>.

= Looking for premium Elementor Addons and Widgets? =
Check <a href="https://uaelementor.com/?utm_source=wp-repo&utm_campaign=header-footer-elementor&utm_medium=description">Ultimate Addons for Elementor</a>. It is a library of unique Elementor addons and widgets to add more functionality and flexibility to your favorite page builder.

= Supported & Actively Developed =
Need help with something? Have an issue to report? [Get in touch](https://github.com/Nikschavan/header-footer-elementor "Header Footer elementor on GitHub"). with us on GitHub.

Made with love at <a href="https://www.brainstormforce.com/?utm_source=wp-repo&utm_campaign=header-footer-elementor&utm_medium=description">Brainstorm Force</a>!

== Installation ==

1. Go to `Plugins -> Add New` and search for Header Footer Elementor.
1. Activate the plugin through the 'Plugins' screen in WordPress.
1. Go to `Appearance -> Header Footer Builder` to build a header or footer layout using elementor.
1. After the layout is ready assign the layout as header or footer using the option `Select the type of template this is` (<a href="https://cloudup.com/clK2sPg9nXK+">screenshot</a>)

== Frequently Asked Questions ==

= Which themes are supported by this plugin? =

1. <a href="https://wpastra.com/?utm_source=wp-repo&utm_campaign=header-footer-elementor&utm_medium=description&bsf=162">Astra</a> - The Fastest, Most Lightweight &amp; Customizable WordPress Theme.
2. GeneratePress Theme.
3. Genesis Theme (and should work with most of its child themes).
4. OceanWP Theme.
5. Beaver Builder theme.

If you are a theme developer <a href="https://github.com/Nikschavan/header-footer-elementor/wiki/Adding-Header-Footer-Elementor-support-for-your-theme">here</a> is a quick tutorial on how you can add support for the Header Footer Elementor from your theme.

= How does this plugin work =

1. Go to `Appearance -> Header Footer Builder` to build a header or footer layout using elementor.
1. After the layout is ready assign the layout as header or footer using the option `Select the type of template this is` (<a href="https://cloudup.com/clK2sPg9nXK+">screenshot</a>)

= Can you create Mobile Responsive Header/Footer using this plugin? =

Yes, You can create the mobile responsive layout of your header using the plugin.  

The Header-Footer Elementor plugin just gives you a container where you can completely design the header using Elementor Page Builder, So the process of creating the mobile responsive layout is exactly same as you would create a responsive layout of your page.

Here is a documentation by Elementor Page builder which explains how you can create mobile responsive layouts using Elementor - <a href="https://elementor.com/introducing-mobile-editing/">https://elementor.com/introducing-mobile-editing/</a>
This same applies when you are creating your Header/Footer using this plugin.

= How Can I add support for Heade/Footer Plugin from my theme? =

If you are a theme developer <a href="https://github.com/Nikschavan/header-footer-elementor/wiki/Adding-Header-Footer-Elementor-support-for-your-theme">here</a> is a quick tutorial on how you can add support for the Header Footer Elementor from your theme.

If you are using a pre-made theme, The best approach would be to contact yoru theme developer and provide them link to the <a href="https://github.com/Nikschavan/header-footer-elementor/wiki/Adding-Header-Footer-Elementor-support-for-your-theme">Wiki article</a> on how they can add support for the plugin. 
If the above is nnot possible, You can also add support for the plugin from your child theme. Just follow <a href="https://github.com/Nikschavan/header-footer-elementor/wiki/Add-support-to-Header-Footer-Elementor-from-the-Child-Theme">this article</a>

== Screenshots ==

1. Go to Appearance -> Header Footer Builder to create a new template.
2. After the template is ready, assign it to be a header or footer replacement.

== Changelog ==

= 1.1.1 =
- Fix: Blank header being displayed when only footer is translated using WPML.

= 1.1.0 =
- New: Rename plugin to be Header Footer & Blocks builder as now thee blocks templates can be used as shortcodes.
- New: Add templates before the footer for Astra Theme. Options for other themes will be cominng soon.
- New: Use templates (Blocks) anywhere in your content with the help of shortcodes.
- Improvement: Improved the UI of the metabox for Header Footer post type.

= 1.0.16 =
- Fix: Make the theme not supported notice dismissable.
- Fix: Use specific selector when adding z-index for the header.

= 1.0.15 =
- Fix: Default Header being displayed for Generatepress and Gensis theme after v1.0.14.

= 1.0.14 =
- Fix: Fixes possible PHP notices/Errors due to WP_Query being called early for all the supported themes.

= 1.0.13 =
- Fix: PHP Notices and errors due to WP_Query being called early when some plugins use filters inside WP_Query.

= 1.0.12 = 
- Fix: Compatibility with Elementor 2.0 changed canvas template path.

= 1.0.11 = 
- Load the CSS footer early in the page to avoid slow rendering of CSS.
- Change the schema.org links to be https.
- Fix: Added correct schema markup for the footer.

= 1.0.10 = 
- Load the header layout correctly in the <body> in Elementor canvas template.
- Load the Elementor Pro CSS/JS files in <head>.
- Provide more filters for the helper functions.

= 1.0.9 = 
- Add Support for WPML.
- Updated the missing strings from the translations template.

= 1.0.8 = 
- Allow filters to override the WP_Query parameters when retreiving the Header / Footer template id.

= 1.0.7 =
- Fix: Dismissable notice not actually dismissing.

= 1.0.6 =
- New: Option to display the header/footer on the pages using Elementor Canvas Template.

= 1.0.5 =
- Fix: Correctly check if Elementor actually is active before using its methods. This fixes errors for sites using older versions of PHP where Elementor does not actually get activated.

= 1.0.4 =
- Improvement: Use Elementor's created instance when rendering the markup for header/footer - Credits <a href="https://github.com/itay9001">itay9001</a>

= 1.0.3 =
- Fix: Adding theme support for the plugin does not remove the "no supported" notice.

= 1.0.2 =
- New: Added support for the OceanWP Theme.
- Fix: Load the elementor header assets corectly in header. This fixes header looking different just when loading the page as previously Elementor would load it's CSS in the footer.
- Introduced helper functions for rendering and checking the headers to make it simpler to integrate HFE with more themes.

= 1.0.1 =
- New: Added support for the <a href="https://wpastra.com/?utm_source=wp-repo&utm_campaign=bb-header-footer&utm_medium=description-changelog">Astra</a> WordPress theme - The Fastest, Most Lightweight &amp; Customizable WordPress Theme.
* Moved the menu under Appearance -> Header Footer Builder.
* Fix: Header content getting hidden behind tha page content.
* Use Elemenntor's canvas template when designing header and footer layout to have full width experience.

= 1.0.0 =
* Initial Release.
