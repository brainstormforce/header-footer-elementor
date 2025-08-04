const withTW = require("@bsf/force-ui/withTW");
// figma colr
module.exports = withTW({
	content: ["./src/**/*.{js, jsx}"],
	theme: {
		extend: {
			colors: {
				"button-primary": "#2563EB",
				"button-primary-hover": "#1D4ED8",

				"brand-primary-600": "#5C2EDE",
				"brand-800": "#6B21A8",
				"brand-50": "#EFF6FF",

				"border-interactive": "#2563EB",
				"border-subtle": "#E5E7EB",

				focus: "#9333EA",
				"focus-border": "#D8B4FE",

				"toggle-on": "#793BFF",
				"toggle-on-border": "#C084FC",
				"toggle-on-hover": "#793BFF",

				"background-primary": "#FFFFFF",
				"background-secondary": "#F3F4F6",

				"field-border": "#E5E7EB",
				"field-label": "#111827",
				"field-primary-background": "#F9FAFB",
				"field-secondary-background": "#FFFFFF",

				"icon-primary": "#111827",
				"icon-secondary": "#4B5563",

				"background-gray": "#F9FAFB",
			},
			fontSize: {
				xxs: "0.6875rem", // 11px
			},
			lineHeight: {
				2.6: "0.6875rem", // 11px
				9.5: "2.375rem", // 38px
			},
			boxShadow: {
				"content-wrapper":
					"0px 1px 1px 0px #0000000F, 0px 1px 2px 0px #0000001A",
				"container-item": "0px 1.5px 1px 0px rgba(0, 0, 0, 0.05)", // Custom shadow
			},
			spacing: {
				"slide-over-container": "566px",
			},
			fontFamily: {
				figtree: ["Figtree", "sans-serif"],
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
	important: ":is(#hfe-settings-app, [data-floating-ui-portal])",
});
